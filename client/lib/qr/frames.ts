export type QrFrameId =
  | "none"
  | "square"
  | "rounded"
  | "dashed"
  | "double"
  | "corners"
  | "scan-me"
  | "scan-me-top"
  | "balloon"
  | "polaroid"
  | "ticket"
  | "badge";

export interface IQrFrameDef {
  id: QrFrameId;
  showsCaption: boolean;
}

export const QR_FRAMES: IQrFrameDef[] = [
  { id: "none", showsCaption: false },
  { id: "square", showsCaption: false },
  { id: "rounded", showsCaption: false },
  { id: "dashed", showsCaption: false },
  { id: "double", showsCaption: false },
  { id: "corners", showsCaption: false },
  { id: "scan-me", showsCaption: true },
  { id: "scan-me-top", showsCaption: true },
  { id: "balloon", showsCaption: false },
  { id: "polaroid", showsCaption: true },
  { id: "ticket", showsCaption: false },
  { id: "badge", showsCaption: true },
];

interface IFrameLayout {
  pad: number;
  extraTop: number;
  extraBottom: number;
  radius: number;
  stroke: number;
  dash?: number[];
  double?: boolean;
  cornersOnly?: boolean;
  balloon?: boolean;
  polaroid?: boolean;
  ticket?: boolean;
  caption?: "top" | "bottom";
}

const FRAME_LAYOUTS: Record<QrFrameId, IFrameLayout> = {
  none: { pad: 0, extraTop: 0, extraBottom: 0, radius: 0, stroke: 0 },
  square: { pad: 28, extraTop: 0, extraBottom: 0, radius: 0, stroke: 8 },
  rounded: { pad: 32, extraTop: 0, extraBottom: 0, radius: 28, stroke: 8 },
  dashed: {
    pad: 32,
    extraTop: 0,
    extraBottom: 0,
    radius: 20,
    stroke: 6,
    dash: [16, 12],
  },
  double: {
    pad: 40,
    extraTop: 0,
    extraBottom: 0,
    radius: 8,
    stroke: 5,
    double: true,
  },
  corners: {
    pad: 40,
    extraTop: 0,
    extraBottom: 0,
    radius: 0,
    stroke: 10,
    cornersOnly: true,
  },
  "scan-me": {
    pad: 28,
    extraTop: 0,
    extraBottom: 72,
    radius: 8,
    stroke: 8,
    caption: "bottom",
  },
  "scan-me-top": {
    pad: 28,
    extraTop: 72,
    extraBottom: 0,
    radius: 8,
    stroke: 8,
    caption: "top",
  },
  balloon: {
    pad: 32,
    extraTop: 0,
    extraBottom: 40,
    radius: 32,
    stroke: 8,
    balloon: true,
  },
  polaroid: {
    pad: 28,
    extraTop: 28,
    extraBottom: 96,
    radius: 6,
    stroke: 0,
    polaroid: true,
    caption: "bottom",
  },
  ticket: {
    pad: 36,
    extraTop: 0,
    extraBottom: 0,
    radius: 14,
    stroke: 6,
    ticket: true,
  },
  badge: {
    pad: 36,
    extraTop: 20,
    extraBottom: 64,
    radius: 36,
    stroke: 8,
    caption: "bottom",
  },
};

function blobToImage(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to read QR image"));
    };
    img.src = url;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  mime: string,
  quality: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Could not export image"));
          return;
        }
        resolve(blob);
      },
      mime,
      quality,
    );
  });
}

function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

export async function composeFramedImage(
  qrBlob: Blob,
  frame: QrFrameId,
  format: "png" | "jpeg",
  caption: string,
  ink = "#0f172a",
): Promise<Blob> {
  const img = await blobToImage(qrBlob);
  const layout = FRAME_LAYOUTS[frame];
  const width = img.width + layout.pad * 2;
  const height = img.height + layout.pad * 2 + layout.extraTop + layout.extraBottom;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  const frameX = 10;
  const frameY = 10;
  const frameW = width - 20;
  const frameH = height - 20;

  if (layout.polaroid) {
    ctx.fillStyle = "#f8fafc";
    drawRoundRect(ctx, 0, 0, width, height, 8);
    ctx.fill();
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  if (layout.stroke > 0 && !layout.cornersOnly) {
    ctx.strokeStyle = ink;
    ctx.lineWidth = layout.stroke;
    if (layout.dash) ctx.setLineDash(layout.dash);
    drawRoundRect(ctx, frameX, frameY, frameW, frameH, layout.radius);
    ctx.stroke();
    ctx.setLineDash([]);
    if (layout.double) {
      ctx.lineWidth = Math.max(2, layout.stroke - 2);
      drawRoundRect(
        ctx,
        frameX + 14,
        frameY + 14,
        frameW - 28,
        frameH - 28,
        Math.max(0, layout.radius - 8),
      );
      ctx.stroke();
    }
  }

  if (layout.cornersOnly) {
    const len = 48;
    ctx.strokeStyle = ink;
    ctx.lineWidth = layout.stroke;
    ctx.beginPath();
    ctx.moveTo(frameX, frameY + len);
    ctx.lineTo(frameX, frameY);
    ctx.lineTo(frameX + len, frameY);
    ctx.moveTo(frameX + frameW - len, frameY);
    ctx.lineTo(frameX + frameW, frameY);
    ctx.lineTo(frameX + frameW, frameY + len);
    ctx.moveTo(frameX + frameW, frameY + frameH - len);
    ctx.lineTo(frameX + frameW, frameY + frameH);
    ctx.lineTo(frameX + frameW - len, frameY + frameH);
    ctx.moveTo(frameX + len, frameY + frameH);
    ctx.lineTo(frameX, frameY + frameH);
    ctx.lineTo(frameX, frameY + frameH - len);
    ctx.stroke();
  }

  if (layout.balloon) {
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = ink;
    ctx.lineWidth = layout.stroke;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 22, height - 42);
    ctx.lineTo(width / 2, height - 12);
    ctx.lineTo(width / 2 + 22, height - 42);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  if (layout.ticket) {
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(0, height / 2, 22, 0, Math.PI * 2);
    ctx.arc(width, height / 2, 22, 0, Math.PI * 2);
    ctx.fill();
  }

  const qrX = layout.pad;
  const qrY = layout.pad + layout.extraTop;
  ctx.drawImage(img, qrX, qrY, img.width, img.height);

  if (layout.caption && caption) {
    ctx.fillStyle = "#000000";
    ctx.font = "700 42px Outfit, Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const cx = width / 2;
    const cy =
      layout.caption === "top"
        ? layout.extraTop / 2 + 8
        : height - layout.extraBottom / 2;
    ctx.fillText(caption.toUpperCase(), cx, cy);
  }

  const mime = format === "jpeg" ? "image/jpeg" : "image/png";
  return canvasToBlob(canvas, mime, format === "jpeg" ? 0.92 : 1);
}

export function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
