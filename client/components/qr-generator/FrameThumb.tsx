"use client";

import { cn } from "@/utils/cn";
import type { QrFrameId } from "@/lib/qr/frames";
import MiniQrMark from "@/components/qr-generator/MiniQrMark";
import { FaBan } from "react-icons/fa";

export interface FrameThumbProps {
	id: QrFrameId;
	caption: string;
}

export default function FrameThumb({ id, caption }: FrameThumbProps) {
	if (id === "none") {
		return (
			<div className="h-full flex items-center justify-center text-slate-400">
				<FaBan />
			</div>
		);
	}

	const shell = cn(
		"h-full w-full flex flex-col items-center justify-center bg-white p-1 text-slate-800",
		id === "square" && "border-[1.5px] border-slate-800",
		id === "rounded" && "rounded-md border-[1.5px] border-slate-800",
		id === "dashed" && "rounded-sm border-[1.5px] border-dashed border-slate-800",
		id === "double" && "border-[3px] border-double border-slate-800",
		id === "scan-me" && "border-[1.5px] border-slate-800",
		id === "scan-me-top" && "border-[1.5px] border-slate-800",
		id === "balloon" && "rounded-lg border-[1.5px] border-slate-800",
		id === "polaroid" && "border border-slate-300 pb-2",
		id === "ticket" && "rounded-sm border-[1.5px] border-slate-800",
		id === "badge" && "rounded-xl border-[1.5px] border-slate-800",
		id === "corners" && "relative",
	);

	return (
		<div className={shell}>
			{id === "corners" && (
				<>
					<span className="pointer-events-none absolute top-0.5 left-0.5 size-2 border-t-[1.5px] border-l-[1.5px] border-slate-800" />
					<span className="pointer-events-none absolute top-0.5 right-0.5 size-2 border-t-[1.5px] border-r-[1.5px] border-slate-800" />
					<span className="pointer-events-none absolute bottom-0.5 left-0.5 size-2 border-b-[1.5px] border-l-[1.5px] border-slate-800" />
					<span className="pointer-events-none absolute bottom-0.5 right-0.5 size-2 border-b-[1.5px] border-r-[1.5px] border-slate-800" />
				</>
			)}
			{id === "scan-me-top" && (
				<span className="text-[5px] font-bold leading-none mb-0.5 tracking-wide text-black">
					{caption}
				</span>
			)}
			<MiniQrMark className="w-6 h-6" />
			{(id === "scan-me" || id === "polaroid" || id === "badge") && (
				<span className="text-[5px] font-bold leading-none mt-0.5 tracking-wide text-black">
					{caption}
				</span>
			)}
		</div>
	);
}
