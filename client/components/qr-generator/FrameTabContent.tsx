"use client";

import { useTranslations } from "next-intl";
import FrameThumb from "@/components/qr-generator/FrameThumb";
import { cn } from "@/utils/cn";
import { QR_FRAMES } from "@/lib/qr/frames";
import { useQrGeneratorStore } from "@/stores/useQrGeneratorStore";

export default function FrameTabContent() {
	const t = useTranslations("qrTool");
	const frame = useQrGeneratorStore((state) => state.frame);
	const setFrame = useQrGeneratorStore((state) => state.setFrame);

	return (
		<div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
			{QR_FRAMES.map((item) => (
				<button
					key={item.id}
					type="button"
					data-testid={`qr-frame-${item.id}`}
					aria-label={t(`frames.${item.id}`)}
					aria-pressed={frame === item.id}
					onClick={() => setFrame(item.id)}
					className={cn(
						"aspect-square rounded-xl border-2 p-1.5 bg-white dark:bg-primary-950/40 transition-colors",
						frame === item.id
							? "border-accent-500"
							: "border-sky-100 dark:border-primary-700 hover:border-accent-300",
					)}
				>
					<FrameThumb id={item.id} caption={t("scanMe")} />
				</button>
			))}
		</div>
	);
}
