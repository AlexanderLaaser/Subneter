import { useEffect } from "react";
import {
  generateNextSubnet,
  getIpaddressesCount,
} from "../../../api/calculatorCalls";
import { useVnetStore } from "../../../store/VnetStore";
import TableEntry from "./TableEntry";
import iSubnet from "../../../interfaces/iSubnet";

function SubnetsTab() {
  const {
    getSelectedVnet,
    addSubnet,
    deleteSubnet,
    updateSubnet,
    getSubnetsExcludingID,
    checkErrorInEntries,
    getSubnets,
    getAddressSpaces,
  } = useVnetStore();

  const selectedVnet = getSelectedVnet();
  const subnets = getSubnets();
  const addressSpaces = getAddressSpaces();

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

  const createNewSubnet = async (
    subnetmask: number
  ): Promise<iSubnet | null> => {
    if (!selectedVnet) return null;

    const ips = await getIpaddressesCount(subnetmask);

    for (const addressSpace of selectedVnet.addressspaces) {
      console.log(addressSpace.networkaddress);
      try {
        const range = await generateNextSubnet(
          `${addressSpace.networkaddress}/${addressSpace.subnetmask}`,
          subnetmask,
          usedRanges
        );
        const newSubnet: iSubnet = {
          id: Math.random(), // Generate unique ID for new subnet
          name: "",
          subnetmask,
          ips,
          range,
          error: "",
          isStored: false,
        };
        return newSubnet;
      } catch (error) {
        console.error("Fehler beim Generieren des Subnetzbereichs:", error);
        continue; // Wenn ein Addressbereich fehlschlägt, versuche den nächsten
      }
    }

    // Wenn kein Addressbereich erfolgreich war, gib null zurück
    return null;
  };

  const handleAddClick = async () => {
    if (!selectedVnet) return;

    const subnetmask = 32;
    const newSubnet = await createNewSubnet(subnetmask);
    if (newSubnet) {
      addSubnet(newSubnet);
    } else {
      console.error("No valid address space found to create another.");
    }
  };

  const updateSubnetName = (id: number, name: string) => {
    updateSubnet({
      id,
      name,
      subnetmask: 0,
      ips: 0,
      range: "",
      isStored: false,
    });
  };

  const updateIps = async (id: number, subnetmask: number) => {
    if (!selectedVnet) return;

    try {
      const ips = await getIpaddressesCount(subnetmask);
      let range = "";
      for (const addressSpace of addressSpaces) {
        try {
          range = await generateNextSubnet(
            `${addressSpace.networkaddress}/${addressSpace.subnetmask}`,
            subnetmask,
            usedRangesWithoutOwnID(id)
          );
          if (range) break; // Wenn ein gültiger Bereich gefunden wird, beende die Schleife
        } catch (error) {
          console.error(
            `Fehler beim Generieren des Subnetzbereichs für ${addressSpace.networkaddress}:`,
            error
          );
          continue; // Wenn ein Addressbereich fehlschlägt, versuche den nächsten
        }
      }

      const error = "";
      updateSubnet({
        id,
        subnetmask,
        ips,
        range,
        error,
        name: "",
        isStored: false,
      });
    } catch (error) {
      console.error(`Error while updating IPs for subnet ${id}:`, error);
    }
  };

  const deleteTableEntry = (id: number) => {
    deleteSubnet(id);
  };

  const renderTableEntries = () => {
    return subnets.map((entry) => (
      <TableEntry
        key={entry.id}
        id={entry.id}
        error={entry.error || ""}
        subnetName={entry.name}
        subnetmask={entry.subnetmask}
        ips={entry.ips}
        range={entry.range}
        updateSubnetName={updateSubnetName}
        updateIps={updateIps}
        deleteTableEntry={() => deleteTableEntry(entry.id)}
      />
    ));
  };

  const updateAllIps = async () => {
    for (const entry of subnets) {
      try {
        await updateIps(entry.id, entry.subnetmask);
      } catch (error) {
        console.error(`Error while updating table entry: ${entry.id}:`, error);
      }
    }
  };

  useEffect(() => {
    if (selectedVnet) {
      updateAllIps();
    }
  }, [selectedVnet?.addressspaces]);

  return (
    <>
      <div className="flex justify-center content-center w-full">
        <div className="flex font-montserrat pt-6 w-full font-bold space-x-6 text-black">
          <div className="flex-1 pl-4">Name</div>
          <div className="flex-inital w-12">Mask</div>
          <div className="flex-inital w-12">IPs</div>
          <div className="flex-1 pr-14">Range</div>
        </div>
      </div>
      {renderTableEntries()}
      <div className="flex justify-center">
        {checkErrorInEntries() ? (
          <div className="flex pl-2 content-center items-center mt-4 font-montserrat">
            <button
              className="cursor-not-allowed inline-flex items-center justify-center w-32 h-10 mr-2 text-slate-50 transition-colors duration-150 bg-slate-300 rounded-lg focus:shadow-outline"
              onClick={handleAddClick}
              disabled
            >
              <span className="text-l">Add Subnet</span>
            </button>
          </div>
        ) : (
          <div className="flex pl-2 content-center items-center mt-4 font-montserrat">
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

export default SubnetsTab;
