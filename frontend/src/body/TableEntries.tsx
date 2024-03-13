import { useEffect, useState } from "react";
import TableEntry from "./TableEntry";
import { generate_next_subnet, count_ipaddresses } from "../api/calls";
import UsedSubnetIpAddressCidrStore from "../store/UsedSubnetIpAddressCidrStore";
import IpStartStore from "../store/IpStartStore";
import SuffixStore from "../store/SuffixStore";
import useTableEntriesStore from "../store/TabelEntriesStore";

interface TableEntryType {
  id: number;
  subnetName: string;
  size: number;
  ips: string;
  range: string;
}

function AddButton() {
  useEffect(() => {
    console.log("TableEntries:");
    console.log(tableEntries);
  });

  // init table entries
  const initialTableEntries: TableEntryType[] = [
    {
      id: 0,
      subnetName: "",
      size: 27,
      ips: "32",
      range: "10.0.0.0 - 10.0.0.31",
    },
  ];

  // Store Functions

  const { ipStart } = IpStartStore((state) => ({
    setIpStart: state.setIpStart,
    ipStart: state.ipStart,
  }));

  const { suffix } = SuffixStore((state) => ({
    setSuffix: state.setSuffix,
    suffix: state.suffix,
  }));

  const { addUsedIpAddressCidr, used_ipaddresses_cidr } =
    UsedSubnetIpAddressCidrStore((state) => ({
      addUsedIpAddressCidr: state.addIpAddressCidr,
      used_ipaddresses_cidr: state.used_ipaddresses_cidr,
    }));

  const { addTableEntry, deleteTableEntry, getTableEntry, tableEntries } =
    useTableEntriesStore((state) => ({
      addTableEntry: state.addTableEntry,
      deleteTableEntry: state.deleteTableEntry,
      getTableEntry: state.getTableEntry,
      tableEntries: state.tableEntries,
    }));

  const updateSubnetName = (id: number, subnetName: string) => {
    const updatedEntries = tableEntries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, subnetName };
      }
      return entry;
    });
    addTableEntry(updatedEntries);
  };

  // Adding ips to tableEntry state
  const updateIps = async (id: number, size: number) => {
    const ips = await count_ipaddresses(size);

    // Calling backend api to receive ip range for given cidr
    const range = await generate_next_subnet(
      ipStart + "/" + suffix,
      size,
      used_ipaddresses_cidr
    );

    const updatedEntries = tableEntries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, size, ips, range };
      }
      return entry;
    });
    setTableEntries(updatedEntries);
    setTableEntries(updatedEntries);
    addUsedIpAddressCidr(range.split(" - ")[0] + "/" + size, id);
    console.log(used_ipaddresses_cidr);
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
        updateSubnetName={updateSubnetName}
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
