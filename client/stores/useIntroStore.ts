import { create } from "zustand";

interface IIntroStore {
	introComplete: boolean;
	setIntroComplete: (complete: boolean) => void;
}

export const useIntroStore = create<IIntroStore>((set) => ({
	introComplete: false,
	setIntroComplete: (complete) => set({ introComplete: complete }),
}));
