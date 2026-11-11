import {
  normalizeUuid,
  readU16BE,
  readU32BE,
  uuidToBytes,
} from "./bytes";
import { MAX_UUID, NIL_UUID, type IUuidDecodeResult } from "./types";

const GREGORIAN_OFFSET = BigInt("122192928000000000");
const SHIFT_8 = BigInt(8);
const SHIFT_12 = BigInt(12);
const SHIFT_16 = BigInt(16);
const SHIFT_24 = BigInt(24);
const SHIFT_28 = BigInt(28);
const SHIFT_32 = BigInt(32);
const SHIFT_40 = BigInt(40);
const SHIFT_48 = BigInt(48);

function variantFromByte(byte: number): IUuidDecodeResult["variant"] {
  if ((byte & 0x80) === 0) return "ncs";
  if ((byte & 0xc0) === 0x80) return "rfc";
  if ((byte & 0xe0) === 0xc0) return "microsoft";
  return "unknown";
}

function toIso(ms: number): string | null {
  if (!Number.isFinite(ms)) return null;
  const date = new Date(ms);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

function decodeV1Timestamp(bytes: Uint8Array): string | null {
  const timeLow = BigInt(readU32BE(bytes, 0));
  const timeMid = BigInt(readU16BE(bytes, 4));
  const timeHi = BigInt(readU16BE(bytes, 6) & 0x0fff);
  const timestamp = (timeHi << SHIFT_48) | (timeMid << SHIFT_32) | timeLow;
  return toIso(Number((timestamp - GREGORIAN_OFFSET) / BigInt(10000)));
}

function decodeV6Timestamp(bytes: Uint8Array): string | null {
  const timeHigh = BigInt(readU32BE(bytes, 0));
  const timeMid = BigInt(readU16BE(bytes, 4));
  const timeLow = BigInt(readU16BE(bytes, 6) & 0x0fff);
  const timestamp = (timeHigh << SHIFT_28) | (timeMid << SHIFT_12) | timeLow;
  return toIso(Number((timestamp - GREGORIAN_OFFSET) / BigInt(10000)));
}

function decodeV7Timestamp(bytes: Uint8Array): string | null {
  const ms =
    (BigInt(bytes[0]) << SHIFT_40) |
    (BigInt(bytes[1]) << SHIFT_32) |
    (BigInt(bytes[2]) << SHIFT_24) |
    (BigInt(bytes[3]) << SHIFT_16) |
    (BigInt(bytes[4]) << SHIFT_8) |
    BigInt(bytes[5]);
  return toIso(Number(ms));
}

function formatNode(bytes: Uint8Array): string {
  return Array.from(bytes.slice(10, 16), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join(":");
}

export function decodeUuid(input: string): IUuidDecodeResult {
  const canonical = normalizeUuid(input);
  if (!canonical) {
    return {
      canonical: "",
      isValid: false,
      version: null,
      variant: "unknown",
      timestamp: null,
      clockSequence: null,
      node: null,
      isNil: false,
      isMax: false,
    };
  }

  const bytes = uuidToBytes(canonical);
  if (!bytes) {
    return {
      canonical,
      isValid: false,
      version: null,
      variant: "unknown",
      timestamp: null,
      clockSequence: null,
      node: null,
      isNil: false,
      isMax: false,
    };
  }

  const isNil = canonical === NIL_UUID;
  const isMax = canonical === MAX_UUID;
  const version = isNil || isMax ? null : bytes[6] >> 4;
  const variant = variantFromByte(bytes[8]);
  const clockSequence = ((bytes[8] & 0x3f) << 8) | bytes[9];

  let timestamp: string | null = null;
  let node: string | null = null;

  if (version === 1) {
    timestamp = decodeV1Timestamp(bytes);
    node = formatNode(bytes);
  } else if (version === 6) {
    timestamp = decodeV6Timestamp(bytes);
    node = formatNode(bytes);
  } else if (version === 7) {
    timestamp = decodeV7Timestamp(bytes);
  }

  return {
    canonical,
    isValid: true,
    version,
    variant,
    timestamp,
    clockSequence: version === 1 || version === 6 ? clockSequence : null,
    node,
    isNil,
    isMax,
  };
}
