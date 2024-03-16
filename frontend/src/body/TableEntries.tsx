import { useEffect } from "react";
import TableEntry from "./TableEntry";
import { generate_next_subnet, count_ipaddresses } from "../api/calls";
import UsedSubnetIpAddressCidrStore from "../store/UsedSubnetIpAddressCidrStore";
import VnetIpStartStore from "../store/VnetInputStore";
import useTableEntriesStore from "../store/TabelEntriesStore";

function AddButton() {
  useEffect(() => {
    console.log("TableEntries:");
    console.log(tableEntries);
    console.log("UsedRanges");
    console.log(usedIpaddressesCidr);
  });

  const handleAddClick = async () => {
    const size = 26;
    const newTableEntry = await createNewTableEntry(size);

    addTableEntry(newTableEntry);
    addUsedIpAddressCidr(newTableEntry.range.split(" - ")[0] + "/" + size);
  };

  const createNewTableEntry = async (size: number) => {
    const ips = await count_ipaddresses(size);
    const range = await generate_next_subnet(
      vnet.vnetIpStart + "/" + vnet.vnetSuffix,
      size,
      usedIpaddressesCidr
    );

    const newTableEntry = {
      ips,
      range,
      size,
      subnetName: "",
    };

    return newTableEntry;
  };

  const { vnet } = VnetIpStartStore((state) => ({
    vnet: state.vnet,
  }));

  const { addUsedIpAddressCidr, usedIpaddressesCidr } =
    UsedSubnetIpAddressCidrStore((state) => ({
      addUsedIpAddressCidr: state.addIpAddressCidr,
      usedIpaddressesCidr: state.usedIpaddressesCidr,
    }));

  const { addTableEntry, deleteTableEntry, updateTableEntry, tableEntries } =
    useTableEntriesStore((state) => ({
      addTableEntry: state.addTableEntry,
      deleteTableEntry: state.deleteTableEntry,
      getTableEntry: state.getTableEntry,
      updateTableEntry: state.updateTableEntry,
      tableEntries: state.tableEntries,
    }));

  const updateSubnetName = (id: number, subnetName: string) => {
    updateTableEntry({ id, subnetName });
  };

  // Adding ips to tableEntry state
  const updateIps = async (id: number, size: number) => {
    const ips = await count_ipaddresses(size);

    const usedIpAddressesWithoutOwnRange = usedIpaddressesCidr.filter(
      (ele, ind) => ind !== id
    );

    // Calling backend api to receive ip range for given cidr
    const range = await generate_next_subnet(
      vnet.vnetIpStart + "/" + vnet.vnetSuffix,
      size,
      usedIpAddressesWithoutOwnRange
    );

    updateTableEntry({ id, size, ips, range });
    addUsedIpAddressCidr(range.split(" - ")[0] + "/" + size, id);
    console.log(usedIpaddressesCidr);
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

  return (
    <>
      {renderTableEntries()}{" "}
      <div className="flex justify-center content-center w-full font-montserrat">
        <div className=" flex pl-2 items-center justify-center mt-4">
          <button
            className="inline-flex items-center justify-center w-32 h-10 mr-2 text-slate-50 transition-colors duration-150 bg-blue-700 rounded-lg focus:shadow-outline hover:bg-orange-600"
            onClick={handleAddClick}
          >
            <span className="text-l">Add Subnet</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default AddButton;
