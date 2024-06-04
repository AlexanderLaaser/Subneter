import TableEntry from "./TableEntry";
import {
  generateNextSubnet,
  getIpaddressesCount,
} from "../../../api/calculatorCalls";
import VnetStore from "../../../store/VnetStore";
import { useSubnetStore } from "../../../store/SubnetStore";
import { useEffect } from "react";

function TableEntries() {
  // Store functions
  const { vnet, vnetSizeIsValid } = VnetStore();

  const {
    addSubnet,
    deleteSubnet,
    updateSubnet,
    getSubnetsExcludingID,
    checkErrorInEntries,
    subnets,
  } = useSubnetStore();

  const usedRanges = subnets.map((entry) => {
    const firstIp = entry.range.split(" - ")[0];
    return `${firstIp}/${entry.subnetmask}`;
  });

  const usedRangesWithoutOwnID = (id: number) => {
    const tableEntriesWithoutOwnID = getSubnetsExcludingID(id).map((entry) => {
      const firstIp = entry.range.split(" - ")[0];
      return `${firstIp}/${entry.subnetmask}`;
    });
    return tableEntriesWithoutOwnID;
  };

  const handleAddClick = async () => {
    const size = 32;
    const newSubnet = await createNewSubnet(size);

    addSubnet(newSubnet);
  };

  const createNewSubnet = async (subnetmask: number) => {
    const ips = await getIpaddressesCount(subnetmask);
    const range = await generateNextSubnet(
      vnet.networkAddress + "/" + vnet.subnetmask,
      subnetmask,
      usedRanges
    );

    const newSubnet = {
      name: "",
      subnetmask,
      ips,
      range,
      error: "",
    };

    return newSubnet;
  };

  const updateSubnetName = (id: number, name: string) => {
    updateSubnet({ id, name });
  };

  // Adding ips to tableEntry state
  const updateIps = async (id: number, subnetmask: number) => {
    try {
      const ips = await getIpaddressesCount(subnetmask);

      // Calling backend api to receive ip range for given cidr
      const range = await generateNextSubnet(
        vnet.networkAddress + "/" + vnet.subnetmask,
        subnetmask,
        usedRangesWithoutOwnID(id)
      );
      const error = "";
      updateSubnet({ id, subnetmask, ips, range, error });
    } catch (error) {
      throw error;
    }
  };

  const deleteTableEntry = (id: number) => {
    deleteSubnet(id);
  };

  // Rendering TableEntries depending on amount of value of Table Entries
  const renderTableEntries = () => {
    return subnets.map((entry) => (
      <TableEntry
        key={entry.id}
        id={entry.id}
        error={""}
        subnetName={entry.name}
        size={entry.subnetmask}
        ips={entry.ips}
        range={entry.range}
        updateSubnetName={updateSubnetName}
        updateIps={updateIps}
        deleteTableEntry={() => deleteTableEntry(entry.id)}
      />
    ));
  };

  async function updateAllIps() {
    for (const entry of subnets) {
      try {
        await updateIps(entry.id, entry.subnetmask);
      } catch (error) {
        console.error(`Error while updating table entry: ${entry.id}:`, error);
      }
    }
  }

  useEffect(() => {
    updateAllIps();
  }, [vnet.networkAddress]);

  return (
    <>
      <div className="flex justify-center content-center w-full">
        <div className="flex font-montserrat pt-6 w-full font-bold space-x-6 text-black">
          <div className="flex-1 pl-4">Name</div>
          <div className="flex-inital w-12">Mask</div>
          <div className="flex-inital w-12">IPs</div>
          <div className="flex-1 pr-4">Range</div>
        </div>
      </div>
      {renderTableEntries()}{" "}
      {vnetSizeIsValid === false ? (
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
