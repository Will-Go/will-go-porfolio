"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import LogoChoice from "@/components/qr-generator/LogoChoice";
import { useQrGeneratorStore } from "@/stores/useQrGeneratorStore";
import { FaBan, FaUpload } from "react-icons/fa";

export default function LogoTabContent() {
	const t = useTranslations("qrTool");
	const fileRef = useRef<HTMLInputElement>(null);
	const logoPreset = useQrGeneratorStore((state) => state.logoPreset);
	const customLogo = useQrGeneratorStore((state) => state.customLogo);
	const logoError = useQrGeneratorStore((state) => state.logoError);
	const fgColor = useQrGeneratorStore((state) => state.fgColor);
	const setLogoPreset = useQrGeneratorStore((state) => state.setLogoPreset);
	const applyLogoFile = useQrGeneratorStore((state) => state.applyLogoFile);

	const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		event.target.value = "";
		if (!file) return;
		applyLogoFile(file);
	};

	const logoErrorMessage =
		logoError === "logoTypeError"
			? t("logoTypeError")
			: logoError === "logoSizeError"
				? t("logoSizeError")
				: logoError;

	return (
		<div className="space-y-4">
			<div className="flex flex-wrap gap-3">
				<LogoChoice
					selected={logoPreset === "none"}
					onClick={() => setLogoPreset("none")}
					label={t("logoNone")}
					testId="qr-logo-none"
				>
					<FaBan className="text-xl text-slate-400" />
				</LogoChoice>
				<LogoChoice
					selected={logoPreset === "mark"}
					onClick={() => setLogoPreset("mark")}
					label={t("logoMark")}
					testId="qr-logo-mark"
				>
					<span
						className="size-8 rounded-md"
						style={{ backgroundColor: fgColor }}
					/>
				</LogoChoice>
				<LogoChoice
					selected={logoPreset === "scan"}
					onClick={() => setLogoPreset("scan")}
					label={t("scanMe")}
					testId="qr-logo-scan"
				>
					<span className="text-[10px] font-bold tracking-wide text-slate-600 dark:text-primary-300">
						{t("scanMe")}
					</span>
				</LogoChoice>
				{customLogo && (
					<LogoChoice
						selected={logoPreset === "custom"}
						onClick={() => setLogoPreset("custom")}
						label={t("logoCustom")}
						testId="qr-logo-custom"
					>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={customLogo}
							alt=""
							className="size-8 object-contain"
						/>
					</LogoChoice>
				)}
			</div>
			<div>
				<input
					ref={fileRef}
					type="file"
					data-testid="qr-logo-file"
					accept=".png,.jpg,.jpeg,.gif,.svg,image/png,image/jpeg,image/gif,image/svg+xml"
					className="sr-only"
					onChange={handleLogoUpload}
				/>
				<button
					type="button"
					data-testid="qr-logo-upload"
					onClick={() => fileRef.current?.click()}
					className="inline-flex items-center gap-2 text-sm font-semibold text-accent-600 dark:text-accent-400 hover:underline"
				>
					<FaUpload />
					{t("uploadLogo")}
				</button>
				<p className="mt-2 text-sm text-gray-500 dark:text-primary-500">
					{t("uploadHint")}
				</p>
				{logoErrorMessage && (
					<p className="mt-2 text-sm text-red-500">{logoErrorMessage}</p>
				)}
			</div>
		</div>
	);
}
