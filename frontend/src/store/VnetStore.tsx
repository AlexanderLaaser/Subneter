import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension";
import iVnet from "../interfaces/iVnet";

interface iVnetStore {
  vnet: iVnet;
  vnetSizeIsValid: boolean;
  setVnetName: (name: string) => void;
  setVnetNetworkAddress: (networkAddress: string) => void;
  setVnetSubnetmask: (subnetmask: number) => void;
  setVnetSizeIsValid: (vnetSizeIsValid: boolean) => void;
}

const vnetStore = create<iVnetStore>()(
  devtools(
    (set) => ({
      //Placeholder values
      vnet: {
        id: -1,
        name: "",
        networkAddress: "10.0.0.0",
        subnetmask: 24,
      },
      vnetSizeIsValid: true,
      setVnetNetworkAddress: (networkAddress) =>
        set((state) => ({
          vnet: { ...state.vnet, networkAddress: networkAddress },
        })),
      setVnetSubnetmask: (subnetmask) =>
        set((state) => ({ vnet: { ...state.vnet, subnetmask: subnetmask } })),
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
