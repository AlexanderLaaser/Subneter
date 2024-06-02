import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

interface VnetType {
  vnetStartIp: string;
  vnetSize: number;
  vnetName: string;

  // Checks if suffix changed afterwards fits to exisiting subnets addresses
  vnetSizeIsValid?: boolean;
}

interface vnetInputStoreInterface {
  vnet: VnetType;
  setVnetStartIp: (vnetStartIp: string) => void;
  setVnetSize: (vnetSize: number) => void;
  setVnetName: (vnetName: string) => void;
  setVnetSizeIsValid: (vnetSizeIsValid: boolean) => void;
}

const vnetStore = create<vnetInputStoreInterface>()(
  devtools(
    (set) => ({
      vnet: {
        vnetStartIp: "10.0.0.0",
        vnetSize: 24,
        vnetName: "",
        vnetSizeIsValid: true,
      },
      setVnetStartIp: (vnetStartIp) =>
        set((state) => ({ vnet: { ...state.vnet, vnetStartIp: vnetStartIp } })),
      setVnetSize: (vnetSize) =>
        set((state) => ({ vnet: { ...state.vnet, vnetSize: vnetSize } })),
      setVnetName: (vnetName) =>
        set((state) => ({ vnet: { ...state.vnet, vnetName: vnetName } })),
      setVnetSizeIsValid: (vnetSizeIsValid) =>
        set((state) => ({
          vnet: { ...state.vnet, vnetSizeIsValid: vnetSizeIsValid },
        })),
    }),
    {
      name: "vnetIpInput",
    }
  )
);

export default vnetStore;
