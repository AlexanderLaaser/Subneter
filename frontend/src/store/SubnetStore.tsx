import { create } from "zustand";
import iSubnet from "../interfaces/iSubnet";

interface iSubnetStore {
  subnets: iSubnet[];
  addSubnet: (newEntry: Omit<iSubnet, "id">) => void;
  deleteSubnet: (id: number) => void;
  getSubnet: (id: number) => iSubnet;
  getSubnetsExcludingID: (id: number) => iSubnet[];
  updateSubnet: (updatedEntry: iUpdateSubnet) => void;
  setError: (id: number, error: string) => void;
  checkErrorInEntries: () => boolean;
}

interface iUpdateSubnet extends Partial<iSubnet> {
  id: number;
}

const subnetStore = create<iSubnetStore>((set, get) => ({
  subnets: [
    {
      id: 0,
      name: "",
      subnetmask: 27,
      ips: 32,
      range: "10.0.0.0 - 10.0.0.31",
      error: "",
    },
  ],

  addSubnet: (entryData: Omit<iSubnet, "id">) =>
    set((state) => ({
      subnets: [
        ...state.subnets,
        { id: state.subnets.length + 1, ...entryData },
      ],
    })),

  deleteSubnet: (idToRemove: number) =>
    set((state) => ({
      subnets: state.subnets.filter((entry) => entry.id !== idToRemove),
    })),

  getSubnet: (id: number) =>
    get().subnets.find((entry) => entry.id === id) || {
      id: -1,
      name: "",
      subnetmask: 0,
      ips: 0,
      range: "",
      error: "Not found",
    },

  getSubnetsExcludingID: (id: number) =>
    get().subnets.filter((entry) => entry.id !== id),

  updateSubnet: (updatedEntry: iUpdateSubnet) =>
    set((state) => ({
      subnets: state.subnets.map((entry) =>
        entry.id === updatedEntry.id ? { ...entry, ...updatedEntry } : entry
      ),
    })),

  setError: (id: number, errorMessage: string) =>
    set((state) => ({
      subnets: state.subnets.map((entry) =>
        entry.id === id ? { ...entry, error: errorMessage } : entry
      ),
    })),

  checkErrorInEntries: () => get().subnets.some((entry) => entry.error !== ""),
}));

export const useSubnetStore = () => {
  const {
    subnets,
    addSubnet,
    deleteSubnet,
    getSubnet,
    getSubnetsExcludingID,
    updateSubnet,
    setError,
    checkErrorInEntries,
  } = subnetStore();

  return {
    subnets,
    addSubnet,
    deleteSubnet,
    getSubnet,
    getSubnetsExcludingID,
    updateSubnet,
    setError,
    checkErrorInEntries,
  };
};
