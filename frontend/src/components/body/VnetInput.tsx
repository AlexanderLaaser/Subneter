import { useEffect, useState } from "react";
import {
  getIpaddressesCount,
  getAddressSpace,
  compareVnetRangeWithSubnetRangeUsed,
} from "../../api/calculatorCalls";
import SubnetMaskSelect from "../elements/SubnetMaskSelect";
import { useSubnetStore } from "../../store/SubnetStore";
import { useVnetStore } from "../../store/VnetStore";
import { getAllVnets } from "../../api/persistenceCalls";
import { useUserStore } from "../../store/UserStore";
import { getCurrentUser } from "../../api/userCalls";
import iSubnet from "../../interfaces/iSubnet";
import iVnet from "../../interfaces/iVnet";

function VnetInput() {
  const {
    vnets,
    addVnet,
    clearVnets,
    getSelectedVnet,
    setSelectedVnet,
    selectedVnetId,
    updateSelectedVnetName,
    updateVnet,
  } = useVnetStore();

  const { userLoginStatus, setuserLoginStatus } = useUserStore();
  const { subnets, addSubnet, deleteAllSubnets } = useSubnetStore();

  const [IpIsValid, setIpIsValid] = useState(true);
  const [error, setError] = useState("");
  const [range, setRange] = useState("");
  const [ips, setIps] = useState("256");

  const usedRanges = subnets.map((entry) => {
    const firstIp = entry.range.split(" - ")[0];
    return `${firstIp}/${entry.subnetmask}`;
  });

  const handleNetworkAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newNetworkAddress = e.target.value;
    const selectedVnet = getSelectedVnet();
    if (selectedVnet) {
      const updatedVnet = {
        ...selectedVnet,
        networkAddress: newNetworkAddress,
      };
      updateVnet(
        vnets.findIndex((vnet) => vnet.id === selectedVnet.id),
        updatedVnet
      );
    }
    setIpIsValid(validateIP(newNetworkAddress));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    updateSelectedVnetName(newName);
  };

  const validateIP = (ip: string) => {
    const regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
  };

  const handleSubnetMaskChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const subnetmask = parseInt(e.target.value);
    const selectedVnet = getSelectedVnet();
    if (selectedVnet) {
      const updatedVnet = { ...selectedVnet, subnetmask };
      updateVnet(
        vnets.findIndex((vnet) => vnet.id === selectedVnet.id),
        updatedVnet
      );
      await fetchAddressSpace(selectedVnet.networkaddress);
    }
    const ipCount = await getIpaddressesCount(subnetmask);
    setIps(ipCount);

    const isValid = await checkIfVnetSubnetMaskIsValid(subnetmask);
    console.log("Subnet mask validation result:", isValid);
  };

  async function checkIfVnetSubnetMaskIsValid(subnetmask: number) {
    try {
      const selectedVnet = getSelectedVnet();
      if (!selectedVnet) return false;

      const isValid = await compareVnetRangeWithSubnetRangeUsed(
        selectedVnet.networkaddress + "/" + subnetmask,
        usedRanges
      );
      console.log("Network validation API call result:", isValid);
      return isValid;
    } catch (error) {
      console.error("Error validating subnet mask:", error);
      return false;
    }
  }

  const loadAllStoredVnets = async () => {
    try {
      const vnetConfig = await getAllVnets(userLoginStatus);
      if (vnetConfig.length !== 0 && Array.isArray(vnetConfig)) {
        vnetConfig.forEach((vnet: iVnet) => {
          addVnet(vnet);
        });
      } else {
        addVnet({
          id: 0,
          name: "VnetName-1",
          networkaddress: "10.0.0.0",
          subnetmask: 24,
          subnets: [],
        });
      }
    } catch (error) {
      console.error("Failed to load VNETs:", error);
    }
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

  async function fetchAddressSpace(networkAddress: string) {
    try {
      const selectedVnet = getSelectedVnet();
      if (!selectedVnet) return;

      const addressSpace = await getAddressSpace(
        networkAddress + "/" + selectedVnet.subnetmask,
        IpIsValid
      );
      setError("");
      setRange(addressSpace);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  async function setUserData() {
    const userData = await getCurrentUser();
    if (userData) {
      setuserLoginStatus(true);
    }
  }

  useEffect(() => {
    if (userLoginStatus) {
      if (vnets.length > 0 && !selectedVnetId) {
        setSelectedVnet(vnets[0].id);
      }
    }
  }, [vnets]);

  useEffect(() => {
    if (userLoginStatus) {
      clearVnets();
      loadAllStoredVnets();
    }
  }, [userLoginStatus]);

  useEffect(() => {
    if (userLoginStatus) {
      console.log("User is logged in");
      loadActiveVnetConfig();
    } else {
      console.log("User is logged out");
      deleteAllSubnets();
      addSubnet({
        name: "VnetName1",
        subnetmask: 25,
        range: "10.0.0.0 - 10.0.0.128",
        ips: 128,
        error: "",
        isStored: false,
      });
      setIpIsValid(true);
      setError("");
    }
  }, [userLoginStatus, selectedVnetId]);

  useEffect(() => {
    const selectedVnet = getSelectedVnet();
    if (selectedVnet && IpIsValid) {
      fetchAddressSpace(selectedVnet.networkaddress);
    }
  }, [selectedVnetId]);

  useEffect(() => {
    setUserData();
  }, []);

  return (
    <>
      <div className="flex flex-1 sm:flex-col pt-12 font-montserrat xl:space-x-10 xl:flex-row">
        <div className="flex flex-1 flex-col space-y-4" id="vnetconfig">
          <div className="flex-1 text-lg text-sky-800 font-bold " id="vnetname">
            Vnet Name
          </div>
          <div className="flex-1 border border-zinc-950 rounded bg-white">
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

        <div className="flex flex-1 flex-col space-y-4" id="vnetconfig">
          <div
            className="flex-1 text-lg text-sky-800 font-bold "
            id="networkaddress"
          >
            Network Address
          </div>
          <div className="flex-1 border border-zinc-950 rounded bg-white">
            <input
              type="text"
              placeholder=""
              value={getSelectedVnet()?.networkaddress || ""}
              className="text-sm sm:text-base rounded focus:border-orange-600 focus:outline-none pl-4 h-10"
              onChange={handleNetworkAddressChange}
            ></input>
          </div>
          <div className="flex-1">
            {IpIsValid === false ? (
              <div className="text-red-500 font-bold text-m">
                Invalid IP Address
              </div>
            ) : error !== "" ? (
              <div className="text-red-500 font-bold text-m ">{error}</div>
            ) : (
              <div className="text-sky-800 font-bold text-m ">{range}</div>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-4" id="sizeconfig">
          <div className="flex-1 text-lg text-sky-800 font-bold ">Mask</div>
          <div className="flex-1" id="sizeselect">
            <SubnetMaskSelect
              elementID={"ip_size_input"}
              value={getSelectedVnet()?.subnetmask || 24}
              tailWindConfig={
                "${vnet.suffixIsValid === true ? 'border-red-200' : 'border-red-200' } sm:text-base outline-none border border-zinc-950 text-m rounded focus:border-orange-600 pl-4 pr-4 h-10"
              }
              type="vnet"
              onChangeFunction={handleSubnetMaskChange}
            ></SubnetMaskSelect>
          </div>

          <div className="flex-1 text-sky-800 font-bold text-m">{ips}</div>
        </div>

        <div className="flex flex-col space-y-4" id="addbutton">
          <div className="flex-1"></div>
          <div className="flex-1">
            <button className="w-10 h-10 text-slate-50 transition-colors duration-150 bg-sky-800 rounded-lg focus:shadow-outline hover:bg-orange-600">
              <span className="text-l">+</span>
            </button>
          </div>
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
