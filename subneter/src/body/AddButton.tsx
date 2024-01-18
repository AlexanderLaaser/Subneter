import { useState } from "react";
import TableEntry from "./TableEntry";

interface TableEntryType {
  id: number;
}

function AddButton() {
  // Init array for table entries
  const [tableEntries, setTableEntries] = useState<TableEntryType[]>([]);

  // Adding entry for const tableEntries
  const addTableEntry = () => {
    const newEntry = {
      id: tableEntries.length,
    };
    setTableEntries([...tableEntries, newEntry]);
    console.log(tableEntries);
  };

  // Rendering TableEntries depending on amount of value of Table Entries
  const renderTableEntries = () => {
    return tableEntries.map((entry, index) => (
      <TableEntry
        key={entry.id}
        id={entry.id}
        deleteTableEntry={() => deleteTableEntry(index)}
        totalEntries={tableEntries.length}
      />
    ));
  };

  const deleteTableEntry = (index: number) => {
    const newTableEntries = tableEntries.filter((_, i) => i !== index);
    setTableEntries(newTableEntries);
    console.log("Delete:" + tableEntries);
  };

  // Displaying table entries & add button
  return (
    <>
      {
        <TableEntry
          id={0}
          deleteTableEntry={function (): void {}}
          totalEntries={0}
        ></TableEntry>
      }
      {renderTableEntries()}{" "}
      <div className="flex justify-center content-center w-full font-montserrat">
        <div className=" flex pl-2 items-center justify-center mt-4">
          <button
            className="inline-flex items-center justify-center w-32 h-10 mr-2 text-slate-50 transition-colors duration-150 bg-blue-700 rounded-lg focus:shadow-outline hover:bg-orange-600"
            onClick={() => addTableEntry()}
          >
            <span className="text-l">Add Subnet</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default AddButton;
