"use client";

import { isValidHexColor } from "@/lib/qr/styling";
import { LABEL_CLASS } from "@/components/qr-generator/styles";

export interface ColorFieldProps {
	label: string;
	testId: string;
	value: string;
	onTextChange: (value: string) => void;
	onCommit: () => void;
	onPicker: (value: string) => void;
}

export default function ColorField({
	label,
	testId,
	value,
	onTextChange,
	onCommit,
	onPicker,
}: ColorFieldProps) {
	return (
		<div>
			<p className={LABEL_CLASS}>{label}</p>
			<div className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-primary-700 bg-white dark:bg-primary-950/40 px-3 py-2">
				<input
					data-testid={`${testId}-hex`}
					value={value}
					onChange={(event) => onTextChange(event.target.value)}
					onBlur={onCommit}
					onKeyDown={(event) => {
						if (event.key === "Enter") onCommit();
					}}
					className="flex-1 bg-transparent font-mono text-sm text-gray-800 dark:text-primary-100 outline-none"
					aria-label={label}
				/>
				<input
					data-testid={`${testId}-picker`}
					type="color"
					value={isValidHexColor(value) ? value : "#000000"}
					onChange={(event) => onPicker(event.target.value)}
					className="size-8 cursor-pointer rounded-md border border-gray-200 dark:border-primary-700 bg-transparent p-0"
				/>
			</div>
		</div>
	);
}
