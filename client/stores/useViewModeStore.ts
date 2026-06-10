import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IViewModeStore {
	is3D: boolean;
	setIs3D: (is3D: boolean) => void;
	toggleView: () => void;
}

export const useViewModeStore = create<IViewModeStore>()(
	persist(
		(set, get) => ({
			is3D: true,
			setIs3D: (is3D) => set({ is3D }),
			toggleView: () => get().setIs3D(!get().is3D),
		}),
		{
			name: "portfolio-view-mode",
			partialize: (state) => ({ is3D: state.is3D }),
		},
	),
);
