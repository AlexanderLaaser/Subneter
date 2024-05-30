import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface TableEntryType {
  id: number;
  subnetName: string;
  size: number;
  ips: number;
  range: string;
  error: string;
}

interface TableEntriesStore {
  tableEntries: TableEntryType[];
  addTableEntry: (newEntry: Omit<TableEntryType, "id">) => void;
  deleteTableEntry: (index: number) => void;
  getTableEntry: (id: number) => TableEntryType;
  getTableEntriesWithoutOwnID: (id: number) => TableEntryType[];
  updateTableEntry: (TableEntry: UpdateTableEntryType) => void;
  setError: (index: number, error: string) => void;
  checkErrorInEntries: () => boolean;
}

interface UpdateTableEntryType extends Partial<TableEntryType> {
  id: number;
}

const useTableEntriesStore = create<TableEntriesStore>()(
  devtools((set, get) => ({
    tableEntries: [
      {
        id: 0,
        subnetName: "",
        size: 27,
        ips: 32,
        range: "10.0.0.0 - 10.0.0.31",
        error: "",
      },
    ],

    addTableEntry: (entryData: Omit<TableEntryType, "id">) =>
      set((state) => {
        const nextId =
          state.tableEntries.reduce(
            (maxId, entry) => Math.max(maxId, entry.id),
            -1
          ) + 1;

        const newEntry: TableEntryType = { id: nextId, ...entryData };

        return {
          tableEntries: [...state.tableEntries, newEntry],
        };
      }),

    deleteTableEntry: (idToRemove: number) =>
      set((state) => ({
        tableEntries: state.tableEntries.filter(
          (entry) => entry.id !== idToRemove
        ),
      })),

    getTableEntry: (id: number) => {
      const tableEntries = get().tableEntries;
      const foundEntry = tableEntries.find((entry) => entry.id === id);
      if (!foundEntry) {
        throw new Error(`Kein Eintrag mit der ID ${id} gefunden.`);
      }
      return foundEntry;
    },

    getTableEntriesWithoutOwnID: (id: number) => {
      const tableEntries = get().tableEntries;
      return tableEntries.filter((entry) => entry.id !== id);
    },

    checkErrorInEntries: () => {
      const entriesWithErrors = get().tableEntries.filter(
        (entry) => entry.error !== ""
      );
      return entriesWithErrors.length > 0;
    },

    updateTableEntry: (updatedEntry: UpdateTableEntryType) =>
      set((state) => ({
        tableEntries: state.tableEntries.map((entry) =>
          entry.id === updatedEntry.id ? { ...entry, ...updatedEntry } : entry
        ),
      })),

    setError: (id: number, errorMessage: string) =>
      set((state) => ({
        tableEntries: state.tableEntries.map((entry) =>
          entry.id === id ? { ...entry, error: errorMessage } : entry
        ),
      })),
  }))
);

export default useTableEntriesStore;
