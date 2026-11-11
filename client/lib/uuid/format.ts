import {
  type IUuidFormatOptions,
  type UuidBulkSeparator,
} from "./types";

export function formatUuid(
  canonical: string,
  options: IUuidFormatOptions,
): string {
  let value = options.hyphens ? canonical : canonical.replace(/-/g, "");
  if (options.uppercase) {
    value = value.toUpperCase();
  }
  if (options.braces) {
    value = `{${value}}`;
  }
  if (options.urn) {
    value = `urn:uuid:${value}`;
  }
  return value;
}

export function joinUuids(
  values: string[],
  separator: UuidBulkSeparator,
): string {
  return separator === "comma" ? values.join(", ") : values.join("\n");
}

export function isGuidStyle(options: IUuidFormatOptions): boolean {
  return (
    options.uppercase && options.braces && options.hyphens && !options.urn
  );
}
