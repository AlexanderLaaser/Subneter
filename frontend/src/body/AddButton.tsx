import { useEffect, useState } from "react";
import TableEntry from "./TableEntry";
import { generate_next_subnet, count_ipaddresses } from "../api/calls";

interface TableEntryType {
  id: number;
  description: string;
  size: number;
  ips: string;
  range: string;
}

function AddButton() {
  // init table entries
  const initialTableEntries: TableEntryType[] = [
    {
      id: 0,
      description: "",
      size: 27,
      ips: "32",
      range: "10.0.0.0-10.0.10",
    },
    {
      id: 1,
      description: "",
      size: 27,
      ips: "32",
      range: "10.0.0.0-10.0.10",
    },
  ];

  // TableEntries State
  const [tableEntries, setTableEntries] =
    useState<TableEntryType[]>(initialTableEntries);

  useEffect(() => {
    console.log(tableEntries);
  });

  // Adding entry for const tableEntries
  const addTableEntry = () => {
    const newEntry = {
      id: tableEntries.length,
      description: "",
      size: 21,
      ips: "228",
      range: "10.0.0.0-10.0.10",
    };
    setTableEntries([...tableEntries, newEntry]);
    console.log(tableEntries);
  };

  const deleteTableEntry = (index: number) => {
    const newTableEntries = tableEntries.filter((_, i) => i !== index);
    setTableEntries(newTableEntries);
    console.log("Delete:" + tableEntries);
  };

  const updateEntryParamSubnetName = (id: number, subnetName: string) => {
    const updatedEntries = tableEntries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, subnetName };
      }
      return entry;
    });
    setTableEntries(updatedEntries);
  };

  // Adding size to tableEntry state
  const updateSize = (id: number, size: number) => {
    // updating size parameter in table
    const updatedEntries = tableEntries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, size };
      }
      return entry;
    });
    setTableEntries(updatedEntries);
  };

  // Adding ips to tableEntry state
  const updateIps = async (id: number, size: number) => {
    // Aktualisiere zunächst den Eintrag mit der neuen Größe
    const ips = await count_ipaddresses(size);

    const range = generate_next_subnet("10.0.0.0/24", 25, []);

    const updatedEntries = tableEntries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, size, ips, range };
      }
      return entry;
    });
    setTableEntries(updatedEntries);
  };

  // Rendering TableEntries depending on amount of value of Table Entries
  const renderTableEntries = () => {
    return tableEntries.map((entry, index) => (
      <TableEntry
        key={entry.id}
        id={entry.id}
        subnetName={entry.subnetName}
        size={entry.size}
        ips={entry.ips}
        range={entry.range}
        updateName={updateName}
        updateSize={updateSize}
        updateIps={updateIps}
        deleteTableEntry={() => deleteTableEntry(index)}
        totalEntries={tableEntries.length}
      />
    ));
  };

  // Displaying table entries & add button
  return (
    <>
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
