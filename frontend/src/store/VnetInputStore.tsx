import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

interface VnetType {
  vnetIpStart: string;
  vnetSuffix: number;
}

interface vnetInputStoreInterface {
  vnet: VnetType;
  setVnetIpStart: (vnetIpStart: string) => void;
  setVnetSuffix: (vnetSuffix: number) => void;
}

const vnetStore = create<vnetInputStoreInterface>()(
  devtools(
    (set) => ({
      vnet: {
        vnetIpStart: "10.0.0.0",
        vnetSuffix: 24,
      },
      setVnetIpStart: (vnetIpStart) =>
        set((state) => ({
          vnet: { ...state.vnet, vnetIpStart: vnetIpStart },
        })),
      setVnetSuffix: (vnetSuffix) =>
        set((state) => ({ vnet: { ...state.vnet, vnetSuffix: vnetSuffix } })),
    }),
    {
      name: "vnetIpInput",
    }
  )
);

export default vnetStore;
