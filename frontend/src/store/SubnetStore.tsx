import { create } from "zustand";
import iSubnet from "../interfaces/iSubnet";

interface iSubnetStore {
  subnets: iSubnet[];
  addSubnet: (newEntry: Partial<iSubnet>) => void;
  deleteSubnet: (id: number) => void;
  deleteAllSubnets: () => void;
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
  subnets: [],

  addSubnet: (entryData: Partial<iSubnet>) => {
    set((state) => {
      const nextId =
        entryData.id ??
        state.subnets.reduce((maxId, entry) => Math.max(maxId, entry.id), 0) +
          1;
      const newEntry: iSubnet = {
        id: nextId,
        name: entryData.name || "",
        subnetmask: entryData.subnetmask || 0,
        ips: entryData.ips || 0,
        range: entryData.range || "Undefined",
        error: entryData.error || "",
        isStored: entryData.isStored || false,
      };

      return {
        subnets: [...state.subnets, newEntry],
      };
    });
  },

  deleteSubnet: (idToRemove: number) =>
    set((state) => ({
      subnets: state.subnets.filter((entry) => entry.id !== idToRemove),
    })),

  deleteAllSubnets: () =>
    set(() => ({
      subnets: [],
    })),

  getSubnet: (id: number) =>
    get().subnets.find((entry) => entry.id === id) || {
      id: -1,
      name: "",
      subnetmask: 0,
      ips: 0,
      range: "",
      error: "Not found",
      isStored: false,
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
    deleteAllSubnets,
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
    deleteAllSubnets,
    getSubnet,
    getSubnetsExcludingID,
    updateSubnet,
    setError,
    checkErrorInEntries,
  };
};
