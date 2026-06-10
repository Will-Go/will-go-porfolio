import { create } from "zustand";
import { STATIONS } from "@/components/three/constants";

interface IStationStore {
  visited: string[];
  nextStationId: string | null;
  markVisited: (id: string) => void;
  reset: () => void;
}

function computeNext(visited: string[]): string | null {
  const next = STATIONS.find((station) => !visited.includes(station.id));
  return next ? next.id : null;
}

export const useStationStore = create<IStationStore>((set) => ({
  visited: [],
  nextStationId: STATIONS[0]?.id ?? null,
  markVisited: (id) =>
    set((state) => {
      if (state.visited.includes(id)) return state;
      const visited = [...state.visited, id];
      return { visited, nextStationId: computeNext(visited) };
    }),
  reset: () => set({ visited: [], nextStationId: STATIONS[0]?.id ?? null }),
}));
