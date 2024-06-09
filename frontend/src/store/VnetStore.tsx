import { create } from "zustand";
import iVnet from "../interfaces/iVnet";

interface iVnetStore {
  vnets: iVnet[];
  selectedVnetId: number | null;
  addVnet: (vnet: iVnet) => void;
  setSelectedVnet: (id: number) => void;
  getSelectedVnet: () => iVnet | null;
  updateVnet: (index: number, vnet: iVnet) => void;
  updateSelectedVnetName: (newName: string) => void;
  removeVnetByIndex: (index: number) => void;
  removeVnetById: (id: number) => void;
  clearVnets: () => void;
}

const vnetStore = create<iVnetStore>((set, get) => ({
  vnets: [],
  selectedVnetId: null,
  addVnet: (vnet) => set((state) => ({ vnets: [...state.vnets, vnet] })),
  setSelectedVnet: (id) => set(() => ({ selectedVnetId: id })),
  getSelectedVnet: () => {
    const { selectedVnetId, vnets } = get();
    return vnets.find((vnet) => vnet.id === selectedVnetId) || null;
  },
  updateVnet: (index, vnet) =>
    set((state) => ({
      vnets: state.vnets.map((currentVnet, i) =>
        i === index ? vnet : currentVnet
      ),
    })),
  updateSelectedVnetName: (newName: string) => {
    const { selectedVnetId, vnets } = get();
    const updatedVnets = vnets.map((v) =>
      v.id === selectedVnetId ? { ...v, name: newName } : v
    );
    set(() => ({
      vnets: updatedVnets,
    }));
  },
  removeVnetByIndex: (index) =>
    set((state) => ({
      vnets: state.vnets.filter((_, i) => i !== index),
    })),
  removeVnetById: (id) =>
    set((state) => ({
      vnets: state.vnets.filter((vnet) => vnet.id !== id),
    })),
  clearVnets: () => set(() => ({ vnets: [] })),
}));

export const useVnetStore = () => {
  const {
    vnets,
    selectedVnetId,
    addVnet,
    setSelectedVnet,
    getSelectedVnet,
    updateVnet,
    updateSelectedVnetName,
    removeVnetByIndex,
    removeVnetById,
    clearVnets,
  } = vnetStore();

  return {
    vnets,
    selectedVnetId,
    addVnet,
    setSelectedVnet,
    getSelectedVnet,
    updateVnet,
    updateSelectedVnetName,
    removeVnetByIndex,
    removeVnetById,
    clearVnets,
  };
};
