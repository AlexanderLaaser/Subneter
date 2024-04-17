import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

interface VnetType {
  // First IP address in vnet range
  vnetIpStart: string;

  // Vnet Suffix
  vnetSuffix: number;

  // Checks if suffix changed afterwards fits to exisiting subnets addresses
  suffixIsValid?: boolean;
}

interface vnetInputStoreInterface {
  vnet: VnetType;
  setVnetIpStart: (vnetIpStart: string) => void;
  setVnetSuffix: (vnetSuffix: number) => void;
  setSuffixIsValid: (suffixIsValid: boolean) => void;
}

const vnetStore = create<vnetInputStoreInterface>()(
  devtools(
    (set) => ({
      vnet: {
        vnetIpStart: "10.0.0.0",
        vnetSuffix: 24,
        suffixIsValid: true,
      },
      setVnetIpStart: (vnetIpStart) =>
        set((state) => ({ vnet: { ...state.vnet, vnetIpStart: vnetIpStart } })),
      setVnetSuffix: (vnetSuffix) =>
        set((state) => ({ vnet: { ...state.vnet, vnetSuffix: vnetSuffix } })),
      setSuffixIsValid: (suffixIsValid) =>
        set((state) => ({
          vnet: { ...state.vnet, suffixIsValid: suffixIsValid },
        })),
    }),
    {
      name: "vnetIpInput",
    }
  )
);

export default vnetStore;
