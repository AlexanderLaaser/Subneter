import { useEffect, useState } from "react";
import {
  getIpaddressesCount,
  getAddressSpace,
  compareVnetRangeWithSubnetRangeUsed,
} from "../../api/calculatorCalls";
import SubnetMaskSelect from "../elements/SubnetMaskSelect";
import { useVnetStore } from "../../store/VnetStore";
import { useSubnetStore } from "../../store/SubnetStore";
import { getAllVnets } from "../../api/persistenceCalls";
import { useUserStore } from "../../store/UserStore";
import { getCurrentUser } from "../../api/userCalls";

function VnetInput() {
  const {
    vnet,
    setVnetSubnetmask,
    setVnetNetworkAddress,
    setVnetSubnetmaskIsValid,
    setVnetName,
    getVnetIndexByName,
    selectedVnet,
    vnetSubnetmaskIsValid,
  } = useVnetStore();

  const { userLoginStatus, setuserLoginStatus } = useUserStore();

  const { subnets } = useSubnetStore();

  const [IpIsValid, setIpIsValid] = useState(true);
  const [error, setError] = useState("");
  const [range, setRange] = useState("");
  const [ips, setIps] = useState("256");

  const usedRanges = subnets.map((entry) => {
    const firstIp = entry.range.split(" - ")[0];
    return `${firstIp}/${entry.subnetmask}`;
  });

  //function that sets the ip and the validState
  const handleNetworkAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newNetworkAddress = (e.target as HTMLInputElement).value;
    setVnetNetworkAddress(newNetworkAddress);
    setIpIsValid(validateIP(newNetworkAddress));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setVnetName(newName);
  };

  //function for validating the entered ip
  const validateIP = (ip: string) => {
    const regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
  };

  const handleSubnetMaskChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const subnetmask = parseInt((e.target as HTMLSelectElement).value);
    setVnetSubnetmask(subnetmask);
    const ipCount = await getIpaddressesCount(subnetmask);
    setIps(ipCount);

    // Debugging the response and update process
    const isValid = await checkIfVnetSubnetMaskIsValid(subnetmask);
    console.log("Subnet mask validation result:", isValid);
    setVnetSubnetmaskIsValid(isValid);
    console.log(vnetSubnetmaskIsValid);
  };

  // Ensure this async function handles all cases properly
  async function checkIfVnetSubnetMaskIsValid(subnetmask: number) {
    try {
      const isValid = await compareVnetRangeWithSubnetRangeUsed(
        vnet.networkAddress + "/" + subnetmask,
        usedRanges
      );
      console.log("Network validation API call result:", isValid);
      return isValid;
    } catch (error) {
      console.error("Error validating subnet mask:", error);
      return false; // Default to false on error
    }
  }

  async function loadVnetConfig() {
    const vnetConfig = await getAllVnets(userLoginStatus);
    const vnetListIndex = getVnetIndexByName(selectedVnet);

    if (vnetConfig) {
      setVnetNetworkAddress(vnetConfig[vnetListIndex].networkaddress);
      setVnetSubnetmask(vnetConfig[vnetListIndex].subnetmask);
      setVnetName(vnetConfig[vnetListIndex].name);
    }
  }

  async function fetchAddressSpace(networkAddress: string) {
    try {
      const addressSpace = await getAddressSpace(
        networkAddress + "/" + vnet.subnetmask,
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
      console.log("User is logged in");
      loadVnetConfig();
    } else {
      console.log("User is logged out");
      setVnetNetworkAddress("10.0.0.0");
      setVnetSubnetmask(24);
      setVnetName("VnetName-1");
      setIps("256");
      setIpIsValid(true);
      setError("");
      setVnetSubnetmaskIsValid(true);
    }
  }, [userLoginStatus, selectedVnet]);

  useEffect(() => {
    if (IpIsValid === true) {
      fetchAddressSpace(vnet.networkAddress);
    }
  }, [vnet.networkAddress]);

  useEffect(() => {
    setUserData();
  }, []);

  return (
    <>
      <div className="flex sm:flex-col pt-12 font-montserrat xl:space-x-10 xl:flex-row">
        <div className="flex flex-1 flex-col space-y-4" id="vnetconfig">
          <div className="flex-1 text-lg text-sky-800 font-bold " id="vnetname">
            Vnet Name
          </div>
          <div className="flex-1 border border-zinc-950 rounded">
            <input
              id="vnetInput"
              placeholder=""
              type="text"
              value={vnet.name}
              className=" text-sm sm:text-base focus:border-orange-600 focus:outline-none pl-4 rounded h-10"
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
          <div className="flex-1 border border-zinc-950 rounded">
            <input
              type="text"
              placeholder=""
              value={vnet.networkAddress}
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
              value={vnet.subnetmask}
              tailWindConfig={
                "${vnet.suffixIsValid === true ? 'border-red-200' : 'border-red-200' } sm:text-base outline-none border border-zinc-950 text-m rounded focus:border-orange-600 pl-4 pr-4 h-10 "
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
            <button className=" w-10 h-10 text-slate-50 transition-colors duration-150 bg-sky-800 rounded-lg focus:shadow-outline hover:bg-orange-600">
              <span className="text-l">+</span>
            </button>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
      <div>
        {vnetSubnetmaskIsValid === false ? (
          <div className="flex justify-center mt-2 h-8 w-full">
            <div className="flex justify-center text-white bg-red-500 font-montserrat w-full rounded-lg pt-1">
              Network Address is too small for given subnets. Pls exchange
              subnet sizes!
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default VnetInput;
