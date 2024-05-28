import TableEntry from "./TableEntry";
import {
  generateNextSubnet,
  getIpaddressesCount,
} from "../../../api/calculatorCalls";
import VnetStore from "../../../store/VnetInputStore";
import useTableEntriesStore from "../../../store/TabelEntriesStore";
import { useEffect } from "react";

function TableEntries() {
  useEffect(() => {
    console.log("TableEntries:");
    console.log(tableEntries);
  });

  // Store functions
  const { vnet } = VnetStore((state) => ({
    vnet: state.vnet,
  }));

  const { checkErrorInEntries } = useTableEntriesStore((state) => ({
    checkErrorInEntries: state.checkErrorInEntries,
  }));

  const {
    addTableEntryStore,
    deleteTableEntryStore,
    updateTableEntryStore,
    getTableEntriesWithoutOwnID,
    tableEntries,
  } = useTableEntriesStore((state) => ({
    addTableEntryStore: state.addTableEntry,
    deleteTableEntryStore: state.deleteTableEntry,
    getTableEntryStore: state.getTableEntry,
    updateTableEntryStore: state.updateTableEntry,
    getTableEntriesWithoutOwnID: state.getTableEntriesWithoutOwnID,
    tableEntries: state.tableEntries,
  }));

  const usedRanges = tableEntries.map((entry) => {
    const firstIp = entry.range.split(" - ")[0];
    return `${firstIp}/${entry.size}`;
  });

  const usedRangesWithoutOwnID = (id: number) => {
    const tableEntriesWithoutOwnID = getTableEntriesWithoutOwnID(id).map(
      (entry) => {
        const firstIp = entry.range.split(" - ")[0];
        return `${firstIp}/${entry.size}`;
      }
    );
    return tableEntriesWithoutOwnID;
  };

  const handleAddClick = async () => {
    const size = 32;
    const newTableEntry = await createNewTableEntry(size);

    addTableEntryStore(newTableEntry);
  };

  const createNewTableEntry = async (size: number) => {
    const ips = await getIpaddressesCount(size);
    const range = await generateNextSubnet(
      vnet.vnetIpStart + "/" + vnet.vnetSuffix,
      size,
      usedRanges
    );

    const error = "";

    const newTableEntry = {
      subnetName: "",
      size,
      ips,
      range,
      error,
    };

    return newTableEntry;
  };

  const updateSubnetName = (id: number, subnetName: string) => {
    updateTableEntryStore({ id, subnetName });
  };

  // Adding ips to tableEntry state
  const updateIps = async (id: number, size: number) => {
    try {
      const ips = await getIpaddressesCount(size);

      // Calling backend api to receive ip range for given cidr
      const range = await generateNextSubnet(
        vnet.vnetIpStart + "/" + vnet.vnetSuffix,
        size,
        usedRangesWithoutOwnID(id)
      );
      const error = "";
      updateTableEntryStore({ id, size, ips, range, error });
    } catch (error) {
      throw error;
    }
  };

  const deleteTableEntry = (id: number) => {
    deleteTableEntryStore(id);
  };

  // Rendering TableEntries depending on amount of value of Table Entries
  const renderTableEntries = () => {
    return tableEntries.map((entry) => (
      <TableEntry
        key={entry.id}
        id={entry.id}
        error={""}
        subnetName={entry.subnetName}
        size={entry.size}
        ips={entry.ips}
        range={entry.range}
        updateSubnetName={updateSubnetName}
        updateIps={updateIps}
        deleteTableEntry={() => deleteTableEntry(entry.id)}
      />
    ));
  };

  async function updateAllIps() {
    for (const entry of tableEntries) {
      try {
        await updateIps(entry.id, entry.size);
      } catch (error) {
        console.error(`Error while updating table entry: ${entry.id}:`, error);
      }
    }
  }

  useEffect(() => {
    updateAllIps();
  }, [vnet.vnetIpStart]);

  return (
    <>
      {renderTableEntries()}{" "}
      {vnet.suffixIsValid === false ? (
        <div className="flex justify-center mt-2 h-8">
          <div className="flex justify-center text-white bg-red-500 font-montserrat w-full max-w-screen-md rounded-lg pt-1">
            Network Address is too small for given subnets. Pls exchange subnet
            sizes!
          </div>
        </div>
      ) : null}
      <div className="flex justify-center">
        {checkErrorInEntries() ? (
          <div className=" flex pl-2 content-center items-center mt-4 font-montserrat">
            <button
              className="cursor-not-allowed inline-flex items-center justify-center w-32 h-10 mr-2 text-slate-50 transition-colors duration-150 bg-slate-300 rounded-lg focus:shadow-outline"
              onClick={handleAddClick}
              disabled
            >
              <span className="text-l">Add Subnet</span>
            </button>
          </div>
        ) : (
          <div className=" flex pl-2 content-center items-center mt-4 font-montserrat">
            <button
              className="inline-flex items-center justify-center w-32 h-10 mr-2 text-slate-50 transition-colors duration-150 bg-sky-800 rounded-lg focus:shadow-outline hover:bg-orange-600"
              onClick={handleAddClick}
            >
              <span className="text-l">Add Subnet</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default TableEntries;
