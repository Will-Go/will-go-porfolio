import { create } from "zustand";

interface IPanelStore {
	expandedPanel: string | null;
	setExpandedPanel: (id: string | null) => void;
	openPanel: (id: string) => void;
	closePanel: () => void;
}

export const usePanelStore = create<IPanelStore>((set) => ({
	expandedPanel: null,
	setExpandedPanel: (id) => set({ expandedPanel: id }),
	openPanel: (id) => set({ expandedPanel: id }),
	closePanel: () => set({ expandedPanel: null }),
}));
