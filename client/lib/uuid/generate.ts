import {
  bytesToUuid,
  concatBytes,
  randomBytes,
  setRfcVariant,
  setVersion,
  uuidToBytes,
  writeU16BE,
  writeU32BE,
} from "./bytes";
import { md5 } from "./md5";
import {
  MAX_UUID,
  MAX_UUID_COUNT,
  MIN_UUID_COUNT,
  NIL_UUID,
  type IGenerateUuidOptions,
} from "./types";

const GREGORIAN_OFFSET = BigInt("122192928000000000");
const MASK_32 = BigInt("4294967295");
const MASK_16 = BigInt(0xffff);
const MASK_12 = BigInt(0x0fff);
const SHIFT_8 = BigInt(8);
const SHIFT_12 = BigInt(12);
const SHIFT_16 = BigInt(16);
const SHIFT_24 = BigInt(24);
const SHIFT_28 = BigInt(28);
const SHIFT_32 = BigInt(32);
const SHIFT_40 = BigInt(40);
const SHIFT_48 = BigInt(48);

let v1Node: Uint8Array | null = null;
let v1ClockSeq: number | null = null;
let lastV1Timestamp = BigInt(0);
let lastV7Ms = -1;
let lastV7Seq = 0;

function getV1Node(): Uint8Array {
  if (!v1Node) {
    v1Node = randomBytes(6);
    v1Node[0] |= 0x01;
  }
  return v1Node;
}

function getV1ClockSeq(): number {
  if (v1ClockSeq === null) {
    const bytes = randomBytes(2);
    v1ClockSeq = ((bytes[0] << 8) | bytes[1]) & 0x3fff;
  }
  return v1ClockSeq;
}

function nextGregorianTimestamp(): bigint {
  const now = BigInt(Date.now()) * BigInt(10000) + GREGORIAN_OFFSET;
  const timestamp =
    now <= lastV1Timestamp ? lastV1Timestamp + BigInt(1) : now;
  lastV1Timestamp = timestamp;
  return timestamp;
}

function fromGregorian(timestamp: bigint, version: 1 | 6): string {
  const bytes = new Uint8Array(16);
  const clockSeq = getV1ClockSeq();
  const node = getV1Node();

  if (version === 1) {
    writeU32BE(bytes, 0, Number(timestamp & MASK_32));
    writeU16BE(bytes, 4, Number((timestamp >> SHIFT_32) & MASK_16));
    writeU16BE(bytes, 6, Number((timestamp >> SHIFT_48) & MASK_12));
  } else {
    writeU32BE(bytes, 0, Number((timestamp >> SHIFT_28) & MASK_32));
    writeU16BE(bytes, 4, Number((timestamp >> SHIFT_12) & MASK_16));
    writeU16BE(bytes, 6, Number(timestamp & MASK_12));
  }

  writeU16BE(bytes, 8, clockSeq);
  bytes.set(node, 10);
  setVersion(bytes, version);
  setRfcVariant(bytes);
  return bytesToUuid(bytes);
}

function generateV4(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  const bytes = randomBytes(16);
  setVersion(bytes, 4);
  setRfcVariant(bytes);
  return bytesToUuid(bytes);
}

function generateV7(): string {
  let ms = Date.now();
  if (ms > lastV7Ms) {
    lastV7Ms = ms;
    const seqBytes = randomBytes(2);
    lastV7Seq = ((seqBytes[0] << 8) | seqBytes[1]) & 0x0fff;
  } else {
    lastV7Seq = (lastV7Seq + 1) & 0x0fff;
    if (lastV7Seq === 0) {
      lastV7Ms += 1;
      ms = lastV7Ms;
    } else {
      ms = lastV7Ms;
    }
  }

  const bytes = randomBytes(16);
  const timestamp = BigInt(ms);
  const mask8 = BigInt(0xff);
  bytes[0] = Number((timestamp >> SHIFT_40) & mask8);
  bytes[1] = Number((timestamp >> SHIFT_32) & mask8);
  bytes[2] = Number((timestamp >> SHIFT_24) & mask8);
  bytes[3] = Number((timestamp >> SHIFT_16) & mask8);
  bytes[4] = Number((timestamp >> SHIFT_8) & mask8);
  bytes[5] = Number(timestamp & mask8);
  bytes[6] = (lastV7Seq >> 8) & 0x0f;
  bytes[7] = lastV7Seq & 0xff;
  setVersion(bytes, 7);
  setRfcVariant(bytes);
  return bytesToUuid(bytes);
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return buffer;
}

function generateV8(): string {
  const bytes = randomBytes(16);
  setVersion(bytes, 8);
  setRfcVariant(bytes);
  return bytesToUuid(bytes);
}

async function generateNameBased(
  version: 3 | 5,
  namespace: string,
  name: string,
): Promise<string> {
  const namespaceBytes = uuidToBytes(namespace);
  if (!namespaceBytes) {
    throw new Error("INVALID_NAMESPACE");
  }
  const payload = concatBytes(namespaceBytes, new TextEncoder().encode(name));
  const digest =
    version === 3
      ? md5(payload)
      : new Uint8Array(
          await crypto.subtle.digest("SHA-1", toArrayBuffer(payload)),
        ).slice(0, 16);
  setVersion(digest, version);
  setRfcVariant(digest);
  return bytesToUuid(digest);
}

export async function generateUuid(
  options: IGenerateUuidOptions,
): Promise<string> {
  switch (options.version) {
    case "v1":
      return fromGregorian(nextGregorianTimestamp(), 1);
    case "v3":
      return generateNameBased(3, options.namespace ?? "", options.name ?? "");
    case "v4":
      return generateV4();
    case "v5":
      return generateNameBased(5, options.namespace ?? "", options.name ?? "");
    case "v6":
      return fromGregorian(nextGregorianTimestamp(), 6);
    case "v7":
      return generateV7();
    case "v8":
      return generateV8();
    case "nil":
      return NIL_UUID;
    case "max":
      return MAX_UUID;
    default: {
      const exhaustive: never = options.version;
      throw new Error(`Unsupported UUID version: ${exhaustive}`);
    }
  }
}

export async function generateUuids(
  options: IGenerateUuidOptions,
  count: number,
): Promise<string[]> {
  const safeCount = Math.min(
    MAX_UUID_COUNT,
    Math.max(MIN_UUID_COUNT, Math.floor(count)),
  );
  const values: string[] = [];
  for (let index = 0; index < safeCount; index += 1) {
    values.push(await generateUuid(options));
  }
  return values;
}

export function parseCount(raw: string): number | null {
  if (!/^\d+$/.test(raw.trim())) {
    return null;
  }
  return Number.parseInt(raw, 10);
}

export function clampCount(value: number): number {
  return Math.min(MAX_UUID_COUNT, Math.max(MIN_UUID_COUNT, Math.floor(value)));
}
