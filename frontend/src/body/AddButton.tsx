import { useEffect, useState } from "react";
import TableEntry from "./TableEntry";
import { getIpAddressAmountForSuffix } from "../api/calls";

interface TableEntryType {
  id: number;
  subnetName: string;
  size: string;
  ips: string;
  range: string;
}

function AddButton() {
  // init table entries
  const initialTableEntries: TableEntryType[] = [
    {
      id: 0,
      subnetName: "",
      size: "27",
      ips: "32",
      range: "10.0.0.0-10.0.10",
    },
    {
      id: 1,
      subnetName: "",
      size: "27",
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
      subnetName: "",
      size: "21",
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

  const updateEntryParamSize = (id: number, size: string) => {
    const updatedEntries = tableEntries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, size };
      }
      return entry;
    });
    setTableEntries(updatedEntries);
  };

  // Adding ips to tableEntry state
  const updateIps = async (id: number, size: string) => {
    // Aktualisiere zunächst den Eintrag mit der neuen Größe
    const ips = await getIpAddressAmountForSuffix(size);

    const updatedEntries = tableEntries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, size, ips };
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
        ips={entry.ips} //{ips.description}
        range="255.255.255.255-255.255.255.255"
        updateSubnetName={updateEntryParamSubnetName}
        updateSize={updateEntryParamSize}
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
