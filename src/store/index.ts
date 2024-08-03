import { create } from "zustand";

interface AppState {
  secondaryColors: {
    index: string;
    settings: string;
    rules: string;
    share: string;
  };
  setSecondaryColor: (routeName: string) => void;
}

export const useStore = create<AppState>((set) => ({
  secondaryColors: {
    index: "red",
    settings: "purple",
    rules: "coral",
    share: "teal",
  },
  setSecondaryColor: (routeName: string) =>
    set((state) => ({
      secondaryColors: {
        ...state.secondaryColors,
        [routeName]: state.secondaryColors[routeName],
      },
    })),
}));
