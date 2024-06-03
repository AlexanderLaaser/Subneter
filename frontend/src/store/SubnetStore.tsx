import { create } from "zustand";
import { devtools } from "zustand/middleware";
import iSubnet from "../interfaces/iSubnet";

interface iSubnetStore {
  subnets: iSubnet[];
  addSubnet: (newEntry: Omit<iSubnet, "id">) => void;
  deleteSubnet: (index: number) => void;
  getSubnet: (id: number) => iSubnet;
  getSubnetWithoutOwnID: (id: number) => iSubnet[];
  updateSubnet: (Subnet: iUpdateSubnet) => void;
  setError: (index: number, error: string) => void;
  checkErrorInEntries: () => boolean;
}

interface iUpdateSubnet extends Partial<iSubnet> {
  id: number;
}

const useTableEntriesStore = create<iSubnetStore>()(
  devtools((set, get) => ({
    subnets: [
      {
        id: -1,
        name: "",
        subnetmask: 27,
        ips: 32,
        range: "10.0.0.0 - 10.0.0.31",
        error: "",
      },
    ],

    addSubnet: (entryData: Omit<iSubnet, "id">) =>
      set((state) => {
        const nextId =
          state.subnets.reduce(
            (maxId, entry) => Math.max(maxId, entry.id),
            -1
          ) + 1;

        const newEntry: iSubnet = { id: nextId, ...entryData };

        return {
          subnets: [...state.subnets, newEntry],
        };
      }),

    updateSubnet: (updatedEntry: iUpdateSubnet) =>
      set((state) => ({
        subnets: state.subnets.map((entry) =>
          entry.id === updatedEntry.id ? { ...entry, ...updatedEntry } : entry
        ),
      })),

    deleteSubnet: (idToRemove: number) =>
      set((state) => ({
        subnets: state.subnets.filter((entry) => entry.id !== idToRemove),
      })),

    getSubnet: (id: number) => {
      const tableEntries = get().subnets;
      const foundEntry = tableEntries.find((entry) => entry.id === id);
      if (!foundEntry) {
        throw new Error(`No Entry with ${id} found.`);
      }
      return foundEntry;
    },

    getSubnetWithoutOwnID: (id: number) => {
      const tableEntries = get().subnets;
      return tableEntries.filter((entry) => entry.id !== id);
    },

    checkErrorInEntries: () => {
      const entriesWithErrors = get().subnets.filter(
        (entry) => entry.error !== ""
      );
      return entriesWithErrors.length > 0;
    },

    setError: (id: number, errorMessage: string) =>
      set((state) => ({
        subnets: state.subnets.map((entry) =>
          entry.id === id ? { ...entry, error: errorMessage } : entry
        ),
      })),
  }))
);

export default useTableEntriesStore;
