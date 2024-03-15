import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface TableEntryType {
  id: number;
  subnetName: string;
  size: number;
  ips: string;
  range: string;
}

interface TableEntriesStore {
  tableEntries: TableEntryType[];
  addTableEntry: (newEntry: Omit<TableEntryType, "id">) => void; // 'id' wird automatisch zugewiesen
  deleteTableEntry: (index: number) => void;
  getTableEntry: (id: number) => TableEntryType | undefined;
  updateTableEntry: (TableEntry: UpdateTableEntryType) => void;
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
        ips: "32",
        range: "10.0.0.0 - 10.0.0.31",
      },
    ],

    addTableEntry: (entryData: Omit<TableEntryType, "id">) =>
      set((state) => {
        const nextId =
          state.tableEntries.reduce(
            (maxId, entry) => Math.max(maxId, entry.id),
            -1
          ) + 1;

        // Erstellen eines neuen Eintrags mit der nächsten ID und den übergebenen Daten
        const newEntry: TableEntryType = { id: nextId, ...entryData };

        return {
          tableEntries: [...state.tableEntries, newEntry],
        };
      }),

    deleteTableEntry: (index: number) =>
      set((state) => ({
        tableEntries: state.tableEntries.filter((_, i) => i !== index),
      })),

    getTableEntry: (id: number) => {
      const tableEntries = get().tableEntries;
      return tableEntries.find((entry) => entry.id === id);
    },
    updateTableEntry: (updatedEntry: UpdateTableEntryType) =>
      set((state) => ({
        tableEntries: state.tableEntries.map((entry) =>
          entry.id === updatedEntry.id ? { ...entry, ...updatedEntry } : entry
        ),
      })),
  }))
);

export default useTableEntriesStore;
