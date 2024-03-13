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
}

const useTableEntriesStore = create<TableEntriesStore>()(
  devtools((set, get) => ({
    tableEntries: [], // Leeres Array für die Initialisierung

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
  }))
);

export default useTableEntriesStore;
