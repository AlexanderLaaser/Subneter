import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension";
import iVnet from "../interfaces/iVnet";

interface iVnetStore {
  vnet: iVnet;
  vnets: string[];
  vnetSizeIsValid: boolean;
  selectedVnet: string;
  setVnetName: (name: string) => void;
  setVnetNetworkAddress: (networkAddress: string) => void;
  setVnetSubnetmask: (subnetmask: number) => void;
  setVnetSizeIsValid: (vnetSizeIsValid: boolean) => void;
  addVnet: (vnet: string) => void;
  removeVnetByIndex: (index: number) => void;
  updateVnet: (index: number, vnet: string) => void;
  removeVnetByName: (vnetName: string) => void;
  setSelectedVnet: (name: string) => void;
  getVnetIndexByName: (vnetName: string) => number;
}

const vnetStore = create<iVnetStore>()(
  devtools(
    (set, get) => ({
      //Handling Vnet Store for Vnet Input in main page
      vnet: {
        id: 0,
        name: "VnetName-1",
        networkAddress: "10.0.0.0",
        subnetmask: 24,
      },
      vnetSizeIsValid: true,
      selectedVnet: "VnetName-1",
      setVnetNetworkAddress: (networkAddress) =>
        set((state) => ({
          vnet: { ...state.vnet, networkAddress: networkAddress },
        })),
      setVnetSubnetmask: (subnetmask) =>
        set((state) => ({ vnet: { ...state.vnet, subnetmask: subnetmask } })),
      setVnetName: (name) =>
        set((state) => ({ vnet: { ...state.vnet, name: name } })),
      setVnetSizeIsValid: (vnetSizeIsValid) =>
        set((state) => ({
          vnet: { ...state.vnet, vnetSizeIsValid: vnetSizeIsValid },
        })),

      //Handling Vnet List only containing strings for sidebar
      vnets: ["VnetName-1"],
      addVnet: (vnet) =>
        set((state) => ({
          vnets: [...state.vnets, vnet],
        })),

      removeVnetByIndex: (index) =>
        set((state) => ({
          vnets: state.vnets.filter((_, i) => i !== index),
        })),

      updateVnet: (index, vnet) =>
        set((state) => ({
          vnets: state.vnets.map((currentVnet, i) =>
            i === index ? vnet : currentVnet
          ),
        })),

      removeVnetByName: (vnetName) =>
        set((state) => ({
          vnets: state.vnets.filter((vnet) => vnet !== vnetName),
        })),

      setSelectedVnet: (name) =>
        set(() => ({
          selectedVnet: name,
        })),
      getVnetIndexByName: (vnetName: string) => {
        const index = get().vnets.indexOf(vnetName);
        if (index === -1) {
          throw new Error(`No Vnet found with name: ${vnetName}`);
        }
        return index;
      },
    }),
    {
      name: "vnetIpInput",
    }
  )
);

export const useVnetStore = () => {
  const state = vnetStore();
  return {
    vnet: state.vnet,
    vnets: state.vnets,
    vnetSizeIsValid: state.vnetSizeIsValid,
    selectedVnet: state.selectedVnet,
    setVnetName: state.setVnetName,
    setVnetNetworkAddress: state.setVnetNetworkAddress,
    setVnetSubnetmask: state.setVnetSubnetmask,
    setVnetSizeIsValid: state.setVnetSizeIsValid,
    addVnet: state.addVnet,
    removeVnetByIndex: state.removeVnetByIndex,
    updateVnet: state.updateVnet,
    removeVnetByName: state.removeVnetByName,
    setSelectedVnet: state.setSelectedVnet,
    getVnetIndexByName: state.getVnetIndexByName,
  };
};

export default vnetStore;
