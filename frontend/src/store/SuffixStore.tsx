import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

interface SuffixState {
  suffix: number;
  setSuffix: (suffix: number) => void;
}

const useSuffixStore = create<SuffixState>()(
  devtools(
    persist(
      (set) => ({
        suffix: 24,
        setSuffix: (suffix) => set({ suffix }),
      }),
      {
        name: "suffix-store",
      }
    )
  )
);

export default useSuffixStore;
