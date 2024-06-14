import React, { useEffect, useState } from "react";
import { useVnetStore } from "../../store/VnetStore";
import { getAllVnets } from "../../api/persistenceCalls";
import { useUserStore } from "../../store/UserStore";
import { getCurrentUser } from "../../api/userCalls";
import AddressSpace from "../body/AddressSpace";
import iSubnet from "../../interfaces/iSubnet";
import iVnet from "../../interfaces/iVnet";

function VnetInput() {
  const {
    addVnet,
    clearVnets,
    getSelectedVnet,
    setSelectedVnet,
    selectedVnetId,
    updateSelectedVnetName,
    addAddressSpace,
    addSubnet,
    deleteAllSubnets,
    getAddressSpaces,
  } = useVnetStore();

  const { userLoginStatus, setuserLoginStatus } = useUserStore();

  const [IpIsValid, setIpIsValid] = useState(true);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    updateSelectedVnetName(newName);
  };

  // Eventuell loeschen
  const fetchAddressSpace = async () => {
    try {
      const selectedVnet = getSelectedVnet();
      if (!selectedVnet) return;
    } catch (error) {
      if (error instanceof Error) {
      }
    }
  };

  const loadAllStoredVnets = async () => {
    try {
      const vnetConfig = await getAllVnets(userLoginStatus);
      if (vnetConfig.length !== 0 && Array.isArray(vnetConfig)) {
        vnetConfig.forEach((vnet: iVnet) => {
          addVnet(vnet);
        });
      } else {
        initializeVnet();
      }
    } catch (error) {
      console.log("No VNETs found in database");
      initializeVnet();
    }
  };

  const initializeVnet = () => {
    clearVnets();
    addVnet({
      id: 0,
      name: "VnetName-1",
      addressspaces: [
        {
          id: 0,
          networkaddress: "10.0.0.0",
          subnetmask: 24,
        },
      ],
      subnets: [
        {
          id: 0,
          name: "Subnet1",
          subnetmask: 25,
          ips: 16,
          range: "10.0.0.0 - 10.0.0.128",
          error: "",
          isStored: false,
        },
      ],
    });
    setSelectedVnet(0);
    setIpIsValid(true);
  };

  async function loadActiveVnetConfig() {
    try {
      const selectedVnet = getSelectedVnet();
      if (selectedVnet) {
        deleteAllSubnets();
        selectedVnet.subnets.forEach((subnet: iSubnet) => {
          const newSubnet = {
            id: subnet.id,
            name: subnet.name,
            subnetmask: subnet.subnetmask,
            ips: subnet.ips || 32,
            range: subnet.range || "10.0.0.0 - 10.0.0.0",
            isStored: true,
          };
          addSubnet(newSubnet);
        });
      }
    } catch (error) {
      console.error("Failed to load VNETs:", error);
    }
  }

  async function setUserData() {
    try {
      const userData = await getCurrentUser();
      if (userData) {
        setuserLoginStatus(true);
      } else {
        setuserLoginStatus(false);
      }
    } catch (error) {
      console.error("Failed to load user data:", error);
      setuserLoginStatus(false);
    }
  }

  useEffect(() => {
    setUserData();
  }, []);

  useEffect(() => {
    if (userLoginStatus) {
      loadAllStoredVnets();
    } else {
      initializeVnet();
    }
  }, [userLoginStatus]);

  useEffect(() => {
    if (userLoginStatus) {
      loadActiveVnetConfig();
    }
  }, [userLoginStatus, selectedVnetId]);

  useEffect(() => {
    const selectedVnet = getSelectedVnet();
    if (selectedVnet && IpIsValid) {
      fetchAddressSpace();
    }
  }, [selectedVnetId, IpIsValid]);

  const handleAddAddressSpace = () => {
    addAddressSpace({
      id: Math.random(),
      networkaddress: "",
      subnetmask: 24,
    });
  };

  const addressSpaces = getAddressSpaces();

  return (
    <>
      <div className="flex flex-1 sm:flex-col pt-12 font-montserrat xl:space-x-10 xl:flex-row">
        <div className="flex flex-1 flex-col space-y-4" id="vnetconfig">
          <div
            className="flex-start text-lg text-sky-800 font-bold "
            id="vnetname"
          >
            Name
          </div>
          <div className="flex-start border border-zinc-950 rounded bg-white">
            <input
              id="vnetInput"
              placeholder=""
              type="text"
              value={getSelectedVnet()?.name || ""}
              className="text-sm sm:text-base focus:border-orange-600 focus:outline-none pl-4 rounded h-10"
              onChange={handleNameChange}
            ></input>
          </div>
          <div className="flex-1"></div>
        </div>
        <div
          className="flex flex-1 flex-col space-y-4"
          id="addressspaceNetworkAddress"
        >
          <div className="flex-1 text-lg text-sky-800 font-bold " id="vnetname">
            Address Space
          </div>
          {addressSpaces.map((addressSpace, index) => (
            <AddressSpace
              key={addressSpace.id}
              id={addressSpace.id}
              networkAddress={addressSpace.networkaddress}
              subnetMask={addressSpace.subnetmask}
              index={index}
              handleAddAddressSpace={handleAddAddressSpace}
            />
          ))}
          <div className="flex-1"></div>
        </div>
      </div>
      <div>
        {/* {vnetSubnetmaskIsValid === false ? (
          <div className="flex justify-center mt-2 h-8 w-full">
            <div className="flex justify-center text-white bg-red-500 font-montserrat w-full rounded-lg pt-1">
              Network Address is too small for given subnets. Pls exchange
              subnet sizes!
            </div>
          </div>
        ) : null} */}
      </div>
    </>
  );
}

export default VnetInput;
