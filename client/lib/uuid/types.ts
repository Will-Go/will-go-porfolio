export type UuidVersionId =
  | "v1"
  | "v3"
  | "v4"
  | "v5"
  | "v6"
  | "v7"
  | "v8"
  | "nil"
  | "max";

export type UuidNamespacePreset = "dns" | "url" | "oid" | "x500" | "custom";

export type UuidBulkSeparator = "newline" | "comma";

export interface IUuidFormatOptions {
  uppercase: boolean;
  hyphens: boolean;
  braces: boolean;
  urn: boolean;
}

export interface IGenerateUuidOptions {
  version: UuidVersionId;
  namespace?: string;
  name?: string;
}

export interface IUuidDecodeResult {
  canonical: string;
  isValid: boolean;
  version: number | null;
  variant: "rfc" | "ncs" | "microsoft" | "unknown";
  timestamp: string | null;
  clockSequence: number | null;
  node: string | null;
  isNil: boolean;
  isMax: boolean;
}

export interface IUuidVersionMeta {
  id: UuidVersionId;
  rfcVersion: number | null;
  nameBased: boolean;
  constant: boolean;
}

export const UUID_VERSIONS: IUuidVersionMeta[] = [
  { id: "v4", rfcVersion: 4, nameBased: false, constant: false },
  { id: "v7", rfcVersion: 7, nameBased: false, constant: false },
  { id: "v1", rfcVersion: 1, nameBased: false, constant: false },
  { id: "v3", rfcVersion: 3, nameBased: true, constant: false },
  { id: "v5", rfcVersion: 5, nameBased: true, constant: false },
  { id: "v6", rfcVersion: 6, nameBased: false, constant: false },
  { id: "v8", rfcVersion: 8, nameBased: false, constant: false },
  { id: "nil", rfcVersion: null, nameBased: false, constant: true },
  { id: "max", rfcVersion: null, nameBased: false, constant: true },
];

export const UUID_NAMESPACES = {
  dns: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
  url: "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
  oid: "6ba7b812-9dad-11d1-80b4-00c04fd430c8",
  x500: "6ba7b814-9dad-11d1-80b4-00c04fd430c8",
} as const;

export const NIL_UUID = "00000000-0000-0000-0000-000000000000";
export const MAX_UUID = "ffffffff-ffff-ffff-ffff-ffffffffffff";
export const MIN_UUID_COUNT = 1;
export const MAX_UUID_COUNT = 1000;

export const DEFAULT_UUID_FORMAT: IUuidFormatOptions = {
  uppercase: false,
  hyphens: true,
  braces: false,
  urn: false,
};

export function isNameBasedVersion(version: UuidVersionId): boolean {
  return version === "v3" || version === "v5";
}

export function isConstantVersion(version: UuidVersionId): boolean {
  return version === "nil" || version === "max";
}

export function isBulkLockedVersion(version: UuidVersionId): boolean {
  return isNameBasedVersion(version) || isConstantVersion(version);
}
