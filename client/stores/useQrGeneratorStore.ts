import { create } from "zustand";
import {
	DEFAULT_QR_FORM,
	type IQrFormState,
	type QrContentType,
} from "@/lib/qr/buildPayload";
import type { QrFrameId } from "@/lib/qr/frames";
import {
	isValidHexColor,
	MAX_LOGO_BYTES,
	type QrLogoPreset,
	type QrShapeId,
} from "@/lib/qr/styling";

export type QrDesignTab = "frame" | "logo" | "style";

interface IQrGeneratorStore {
	contentType: QrContentType;
	form: IQrFormState;
	designTab: QrDesignTab;
	frame: QrFrameId;
	logoPreset: QrLogoPreset;
	customLogo: string | null;
	logoError: string;
	shapeId: QrShapeId;
	fgColor: string;
	bgColor: string;
	fgInput: string;
	bgInput: string;
	setContentType: (type: QrContentType) => void;
	patchForm: <K extends keyof IQrFormState>(
		key: K,
		value: IQrFormState[K],
	) => void;
	setDesignTab: (tab: QrDesignTab) => void;
	setFrame: (frame: QrFrameId) => void;
	setLogoPreset: (preset: QrLogoPreset) => void;
	setCustomLogo: (src: string | null) => void;
	setLogoError: (error: string) => void;
	setShapeId: (id: QrShapeId) => void;
	setFgInput: (value: string) => void;
	setBgInput: (value: string) => void;
	commitHex: (kind: "fg" | "bg", value: string) => void;
	applyLogoFile: (file: File) => void;
}

export const useQrGeneratorStore = create<IQrGeneratorStore>((set) => ({
	contentType: "website",
	form: DEFAULT_QR_FORM,
	designTab: "frame",
	frame: "none",
	logoPreset: "none",
	customLogo: null,
	logoError: "",
	shapeId: "square",
	fgColor: "#000000",
	bgColor: "#FFFFFF",
	fgInput: "#000000",
	bgInput: "#FFFFFF",
	setContentType: (contentType) => set({ contentType }),
	patchForm: (key, value) =>
		set((state) => ({
			form: { ...state.form, [key]: value },
		})),
	setDesignTab: (designTab) => set({ designTab }),
	setFrame: (frame) => set({ frame }),
	setLogoPreset: (logoPreset) => set({ logoPreset }),
	setCustomLogo: (customLogo) => set({ customLogo }),
	setLogoError: (logoError) => set({ logoError }),
	setShapeId: (shapeId) => set({ shapeId }),
	setFgInput: (fgInput) => set({ fgInput }),
	setBgInput: (bgInput) => set({ bgInput }),
	commitHex: (kind, value) => {
		const next = value.startsWith("#") ? value : `#${value}`;
		if (!isValidHexColor(next)) return;
		const normalized = next.toUpperCase();
		if (kind === "fg") {
			set({ fgColor: normalized, fgInput: normalized });
			return;
		}
		set({ bgColor: normalized, bgInput: normalized });
	},
	applyLogoFile: (file) => {
		const allowed = [
			"image/png",
			"image/jpeg",
			"image/gif",
			"image/svg+xml",
			"image/webp",
		];
		if (!allowed.includes(file.type)) {
			set({ logoError: "logoTypeError" });
			return;
		}
		if (file.size > MAX_LOGO_BYTES) {
			set({ logoError: "logoSizeError" });
			return;
		}
		set({ logoError: "" });
		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result === "string") {
				set({ customLogo: reader.result, logoPreset: "custom" });
			}
		};
		reader.readAsDataURL(file);
	},
}));
