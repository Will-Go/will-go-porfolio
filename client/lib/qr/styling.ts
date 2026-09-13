import type {
  CornerDotType,
  CornerSquareType,
  DotType,
  Options,
} from "qr-code-styling";

export type QrLogoPreset = "none" | "mark" | "scan" | "custom";
export type QrShapeId =
  | "square"
  | "rounded"
  | "dots"
  | "extra-rounded"
  | "classy"
  | "classy-rounded";

export interface IQrShapePreset {
  id: QrShapeId;
  dots: DotType;
  cornerSquare: CornerSquareType;
  cornerDot: CornerDotType;
}

export const QR_SHAPE_PRESETS: IQrShapePreset[] = [
  {
    id: "square",
    dots: "square",
    cornerSquare: "square",
    cornerDot: "square",
  },
  {
    id: "rounded",
    dots: "rounded",
    cornerSquare: "extra-rounded",
    cornerDot: "dot",
  },
  {
    id: "dots",
    dots: "dots",
    cornerSquare: "dot",
    cornerDot: "dot",
  },
  {
    id: "extra-rounded",
    dots: "extra-rounded",
    cornerSquare: "extra-rounded",
    cornerDot: "dot",
  },
  {
    id: "classy",
    dots: "classy",
    cornerSquare: "classy",
    cornerDot: "square",
  },
  {
    id: "classy-rounded",
    dots: "classy-rounded",
    cornerSquare: "classy-rounded",
    cornerDot: "dot",
  },
];

export const PREVIEW_QR_SIZE = 240;
export const EXPORT_QR_SIZE = 1024;
export const MAX_LOGO_BYTES = 2 * 1024 * 1024;

export function hexLuminance(hex: string): number {
  const c = hex.replace("#", "");
  if (c.length !== 6) return 0;
  const toLin = (v: number) => {
    const n = v / 255;
    return n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
  };
  const r = toLin(Number.parseInt(c.slice(0, 2), 16));
  const g = toLin(Number.parseInt(c.slice(2, 4), 16));
  const b = toLin(Number.parseInt(c.slice(4, 6), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string): number {
  const l1 = hexLuminance(a);
  const l2 = hexLuminance(b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function isValidHexColor(value: string): boolean {
  return /^#([0-9A-Fa-f]{6})$/.test(value);
}

export function makeMarkLogo(color: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${color}"/><rect x="16" y="16" width="32" height="32" rx="6" fill="#ffffff"/><rect x="24" y="24" width="16" height="16" rx="3" fill="${color}"/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function makeScanLogo(color: string, label: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect width="96" height="96" rx="12" fill="#ffffff"/><rect x="4" y="4" width="88" height="88" rx="10" fill="none" stroke="${color}" stroke-width="4"/><text x="48" y="42" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="${color}">QR</text><text x="48" y="68" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="${color}">${label}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function resolveLogoSrc(options: {
  preset: QrLogoPreset;
  customSrc: string | null;
  color: string;
  scanLabel: string;
}): string | undefined {
  if (options.preset === "none") return undefined;
  if (options.preset === "custom" && options.customSrc) return options.customSrc;
  if (options.preset === "mark") return makeMarkLogo(options.color);
  if (options.preset === "scan") return makeScanLogo(options.color, options.scanLabel);
  return undefined;
}

export function buildQrOptions(options: {
  data: string;
  size: number;
  fgColor: string;
  bgColor: string;
  shape: IQrShapePreset;
  image?: string;
}): Options {
  const hasImage = Boolean(options.image);
  return {
    type: "canvas",
    width: options.size,
    height: options.size,
    margin: 0,
    data: options.data,
    image: options.image,
    qrOptions: {
      errorCorrectionLevel: hasImage ? "H" : "M",
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.32,
      margin: 6,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      type: options.shape.dots,
      color: options.fgColor,
    },
    cornersSquareOptions: {
      type: options.shape.cornerSquare,
      color: options.fgColor,
    },
    cornersDotOptions: {
      type: options.shape.cornerDot,
      color: options.fgColor,
    },
    backgroundOptions: {
      color: options.bgColor,
    },
  };
}
