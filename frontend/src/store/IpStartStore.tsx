// Kann auch umgebaut oder aufgelöst werden
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

interface IpStartStoreInterface {
  ipStart: string;
  setIpStart: (ipStart: string) => void;
}

const ipStartStore = create<IpStartStoreInterface>()(
  devtools(
    persist(
      (set) => ({
        ipStart: "10.0.0.0",
        setIpStart: (ipStartParam) => set({ ipStart: ipStartParam }),
      }),
      {
        name: "ipStart",
      }
    )
  )
);

export default ipStartStore;
