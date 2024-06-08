import { create } from "zustand";
import type {} from "@redux-devtools/extension";
import iVnet from "../interfaces/iVnet";

interface iVnetStore {
  vnet: iVnet;
  vnets: string[];
  selectedVnet: string;
  vnetSubnetmaskIsValid: boolean;
  setVnetId: (id: number) => void;
  setVnetName: (name: string) => void;
  setVnetNetworkAddress: (networkAddress: string) => void;
  setVnetSubnetmask: (subnetmask: number) => void;
  setVnetSubnetmaskIsValid: (vnetSubnetmaskIsValid: boolean) => void;
  addVnet: (vnet: string) => void;
  removeVnetByIndex: (index: number) => void;
  updateVnet: (index: number, vnet: string) => void;
  removeVnetByName: (vnetName: string) => void;
  setSelectedVnet: (name: string) => void;
  getVnetIndexByName: (vnetName: string) => number;
}

const vnetStore = create<iVnetStore>()((set, get) => ({
  //Handling Vnet Store for Vnet Input in main page
  vnet: {
    id: 0,
    name: "VnetName-1",
    networkAddress: "10.0.0.0",
    subnetmask: 24,
  },
  vnetSubnetmaskIsValid: true,
  selectedVnet: "VnetName-1",
  setVnetId: (id) => set((state) => ({ vnet: { ...state.vnet, id: id } })),
  setVnetNetworkAddress: (networkAddress) =>
    set((state) => ({
      vnet: { ...state.vnet, networkAddress: networkAddress },
    })),
  setVnetSubnetmask: (subnetmask) =>
    set((state) => ({ vnet: { ...state.vnet, subnetmask: subnetmask } })),
  setVnetName: (name) =>
    set((state) => ({ vnet: { ...state.vnet, name: name } })),

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
    set((state) => ({
      selectedVnet: name,
    })),
  setVnetSubnetmaskIsValid: (vnetSubnetmaskIsValid) =>
    set((state) => ({
      vnetSubnetmaskIsValid: vnetSubnetmaskIsValid,
    })),
  getVnetIndexByName: (vnetName: string) => {
    const index = get().vnets.indexOf(vnetName);
    if (index === -1) {
      throw new Error(`No Vnet found with name: ${vnetName}`);
    }
    return index;
  },
}));

export const useVnetStore = () => {
  const {
    vnet,
    vnets,
    vnetSubnetmaskIsValid,
    selectedVnet,
    setVnetId,
    setVnetName,
    setVnetNetworkAddress,
    setVnetSubnetmask,
    setVnetSubnetmaskIsValid,
    addVnet,
    removeVnetByIndex,
    updateVnet,
    removeVnetByName,
    setSelectedVnet,
    getVnetIndexByName,
  } = vnetStore();
  return {
    vnet,
    vnets,
    vnetSubnetmaskIsValid,
    selectedVnet,
    setVnetId,
    setVnetName,
    setVnetNetworkAddress,
    setVnetSubnetmask,
    setVnetSubnetmaskIsValid,
    addVnet,
    removeVnetByIndex,
    updateVnet,
    removeVnetByName,
    setSelectedVnet,
    getVnetIndexByName,
  };
};

export default vnetStore;
