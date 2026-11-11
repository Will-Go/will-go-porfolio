const UUID_HEX_RE = /^[0-9a-f]{32}$/;

export function randomBytes(size: number): Uint8Array {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  return bytes;
}

export function setVersion(bytes: Uint8Array, version: number): void {
  bytes[6] = (bytes[6] & 0x0f) | (version << 4);
}

export function setRfcVariant(bytes: Uint8Array): void {
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
}

export function bytesToUuid(bytes: Uint8Array): string {
  const hex = Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

export function normalizeUuid(input: string): string | null {
  let value = input.trim().toLowerCase();
  if (value.startsWith("urn:uuid:")) {
    value = value.slice(9);
  }
  if (
    (value.startsWith("{") && value.endsWith("}")) ||
    (value.startsWith("(") && value.endsWith(")"))
  ) {
    value = value.slice(1, -1);
  }
  value = value.replace(/[^0-9a-f]/g, "");
  if (!UUID_HEX_RE.test(value)) {
    return null;
  }
  return `${value.slice(0, 8)}-${value.slice(8, 12)}-${value.slice(12, 16)}-${value.slice(16, 20)}-${value.slice(20, 32)}`;
}

export function uuidToBytes(uuid: string): Uint8Array | null {
  const canonical = normalizeUuid(uuid);
  if (!canonical) {
    return null;
  }
  const hex = canonical.replace(/-/g, "");
  const bytes = new Uint8Array(16);
  for (let index = 0; index < 16; index += 1) {
    bytes[index] = Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16);
  }
  return bytes;
}

export function concatBytes(left: Uint8Array, right: Uint8Array): Uint8Array {
  const output = new Uint8Array(left.length + right.length);
  output.set(left, 0);
  output.set(right, left.length);
  return output;
}

export function writeU32BE(
  bytes: Uint8Array,
  offset: number,
  value: number,
): void {
  bytes[offset] = (value >>> 24) & 0xff;
  bytes[offset + 1] = (value >>> 16) & 0xff;
  bytes[offset + 2] = (value >>> 8) & 0xff;
  bytes[offset + 3] = value & 0xff;
}

export function writeU16BE(
  bytes: Uint8Array,
  offset: number,
  value: number,
): void {
  bytes[offset] = (value >>> 8) & 0xff;
  bytes[offset + 1] = value & 0xff;
}

export function readU16BE(bytes: Uint8Array, offset: number): number {
  return (bytes[offset] << 8) | bytes[offset + 1];
}

export function readU32BE(bytes: Uint8Array, offset: number): number {
  return (
    ((bytes[offset] << 24) |
      (bytes[offset + 1] << 16) |
      (bytes[offset + 2] << 8) |
      bytes[offset + 3]) >>>
    0
  );
}
