"use client";

export default function EmptyQrMark() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full text-slate-300">
      <rect x="8" y="8" width="28" height="28" fill="currentColor" />
      <rect x="16" y="16" width="12" height="12" fill="white" />
      <rect x="64" y="8" width="28" height="28" fill="currentColor" />
      <rect x="72" y="16" width="12" height="12" fill="white" />
      <rect x="8" y="64" width="28" height="28" fill="currentColor" />
      <rect x="16" y="72" width="12" height="12" fill="white" />
      <rect x="48" y="48" width="10" height="10" fill="currentColor" />
      <rect x="64" y="48" width="10" height="10" fill="currentColor" />
      <rect x="48" y="64" width="10" height="10" fill="currentColor" />
      <rect x="80" y="80" width="10" height="10" fill="currentColor" />
      <rect x="48" y="16" width="8" height="8" fill="currentColor" />
    </svg>
  );
}
