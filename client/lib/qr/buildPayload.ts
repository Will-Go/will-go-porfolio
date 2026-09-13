export type QrContentType = "website" | "text";

export interface IQrFormState {
  url: string;
  text: string;
}

export const DEFAULT_QR_FORM: IQrFormState = {
  url: "",
  text: "",
};

export function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function hasQrPayload(type: QrContentType, form: IQrFormState): boolean {
  if (type === "website") return form.url.trim().length > 0;
  return form.text.trim().length > 0;
}

export function buildQrPayload(
  type: QrContentType,
  form: IQrFormState,
): string {
  if (!hasQrPayload(type, form)) return "";
  if (type === "website") return normalizeUrl(form.url);
  return form.text.trim();
}
