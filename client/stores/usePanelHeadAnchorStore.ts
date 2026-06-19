import { create } from "zustand";

interface IPanelHeadAnchorStore {
  anchors: Record<string, HTMLElement | null>;
  registerAnchor: (zone: string, element: HTMLElement | null) => void;
}

export const usePanelHeadAnchorStore = create<IPanelHeadAnchorStore>((set) => ({
  anchors: {},
  registerAnchor: (zone, element) =>
    set((state) => ({
      anchors: {
        ...state.anchors,
        [zone]: element,
      },
    })),
}));
