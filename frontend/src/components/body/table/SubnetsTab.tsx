import { useState, useEffect } from "react";
import {
  generateNextSubnet,
  getIpaddressesCount,
} from "../../../api/calculatorCalls";
import { useVnetStore } from "../../../store/VnetStore";
import TableEntry from "./TableEntry";
import iSubnet from "../../../interfaces/iSubnet";
import WarningPopup from "../../elements/modals/NoFocusModal";
import ActionModals from "../../elements/modals/NoFocusModal";

function SubnetsTab() {
  const {
    vnets,
    getSelectedVnet,
    addSubnet,
    deleteSubnet,
    updateSubnet,
    getSubnetsExcludingID,
    getSubnets,
    getAddressSpaces,
    setError,
  } = useVnetStore();

  const selectedVnet = getSelectedVnet();
  const subnets = getSubnets();
  const addressSpaces = getAddressSpaces();

  const [showSubnetWarningPop, setSubnetWarningPop] = useState(false);
  const [subnetError, setSubnetError] = useState("");

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
          name: "SubnetName",
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

    return null;
  };

  const handleAddClick = async () => {
    if (!selectedVnet) return;

    const subnetmask = 32;
    const newSubnet = await createNewSubnet(subnetmask);
    if (newSubnet) {
      addSubnet(newSubnet);
    } else {
      console.error(
        "No valid address space found to um ein neues Subnetz zu erstellen."
      );
    }
  };

  const updateSubnetName = (id: number, name: string) => {
    const selectedVnet = getSelectedVnet();
    if (selectedVnet) {
      const subnet = selectedVnet.subnets.find((subnet) => subnet.id === id);
      if (subnet) {
        updateSubnet({
          ...subnet,
          name,
        });
      }
    }
  };

  const updateIps = async (id: number, subnetmask: number) => {
    const selectedVnet = getSelectedVnet();
    if (!selectedVnet) return;

    try {
      const ips = await getIpaddressesCount(subnetmask);
      let range = "";
      let localSubnetError = "";

      let addressSpaceCount = addressSpaces.length;

      for (let i = 0; i < addressSpaceCount; i++) {
        const addressSpace = addressSpaces[i];
        try {
          range = await generateNextSubnet(
            `${addressSpace.networkaddress}/${addressSpace.subnetmask}`,
            subnetmask,
            usedRangesWithoutOwnID(id)
          );
          if (range) break; // Wenn ein gültiger Bereich gefunden wird, beende die Schleife
        } catch (error) {
          if (i === addressSpaceCount - 1 && error instanceof Error) {
            localSubnetError = error.message; // Setze den Fehler, wenn es der letzte addressSpace ist
          }
          continue;
        }
      }

      const existingSubnet = selectedVnet.subnets.find(
        (subnet) => subnet.id === id
      );
      if (existingSubnet) {
        if (localSubnetError === "") {
          updateSubnet({
            ...existingSubnet, // Behalte alle bestehenden Eigenschaften bei
            subnetmask, // Überschreibe die gewünschten Eigenschaften
            ips,
            range,
            isStored: false,
            error: "",
          });
        } else {
          updateSubnet({
            ...existingSubnet, // Behalte alle bestehenden Eigenschaften bei
            error: localSubnetError, // Setze den Fehler
          });
          setSubnetError(localSubnetError);
          setSubnetWarningPop(true);
        }
      } else {
        console.error(`Subnet with ID ${id} not found`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          `Error while updating IPs for subnet ${id}:`,
          error.message
        );
        setError(id, error.message); // Setze den Fehler, wenn einer auftritt
      } else {
        console.error(
          `Unexpected error while updating IPs for subnet ${id}:`,
          error
        );
      }
    }
  };

  const updateIpsForAllSubnets = async () => {
    for (const subnet of subnets) {
      if (subnet.id !== undefined) {
        await updateIps(subnet.id, subnet.subnetmask);
      }
    }
  };

  const deleteTableEntry = (id: number) => {
    deleteSubnet(id);
  };

  const renderTableEntries = () => {
    return subnets.map((entry) => (
      <TableEntry
        key={entry.id}
        id={entry.id || 0}
        error={entry.error || ""}
        subnetName={entry.name}
        subnetmask={entry.subnetmask}
        ips={entry.ips}
        range={entry.range}
        updateSubnetName={updateSubnetName}
        updateIps={updateIps}
        deleteTableEntry={() => deleteTableEntry(entry.id || 0)}
      />
    ));
  };

  useEffect(() => {
    updateIpsForAllSubnets();
  }, [addressSpaces]);

  return (
    <>
      <div className="flex justify-center content-center w-full">
        <div className="flex pt-6 w-full font-medium space-x-6 text-black">
          <div className="flex-1 pl-4">Name</div>
          <div className="flex-inital w-12">Mask</div>
          <div className="flex-inital w-12">IPs</div>
          <div className="flex-1 pr-14">Range</div>
        </div>
      </div>
      {renderTableEntries()}
      <div className="flex justify-center pb-10">
        {showSubnetWarningPop && (
          <ActionModals
            message={subnetError}
            onClose={() => setSubnetWarningPop(false)}
            type={"warning"}
          />
        )}

        <div className="flex pl-2 content-center items-center mt-4">
          <button
            className="inline-flex items-center justify-center w-32 h-10 mr-2 text-slate-50 transition-colors duration-150 bg-sky-800 rounded-lg focus:shadow-outline hover:bg-orange-600"
            onClick={handleAddClick}
          >
            <span className="text-l">Add Subnet</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default SubnetsTab;
