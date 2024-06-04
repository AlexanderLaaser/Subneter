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
    setVnetSizeIsValid,
    setVnetName,
    getVnetIndexByName,
    selectedVnet,
  } = useVnetStore();

  const { userLoginStatus, setuserLoginStatus } = useUserStore();

  const { subnets } = useSubnetStore();

  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const [range, setRange] = useState("");
  const [ips, setIps] = useState("256");

  const usedRanges = subnets.map((entry) => {
    const firstIp = entry.range.split(" - ")[0];
    return `${firstIp}/${entry.subnetmask}`;
  });

  //function that sets the ip and the validState
  const handleIpInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNetworkAddress = (e.target as HTMLInputElement).value;
    setVnetNetworkAddress(newNetworkAddress);
    setIsValid(validateIP(newNetworkAddress));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setVnetName(newName); // Diese Funktion aktualisiert den Zustand von vnet.name
  };

  //function for validating the entered ip
  const validateIP = (ip: string) => {
    const regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
  };

  //function that sets the subnetmask and the ips
  const handleSubnetMaskChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const subnetmask = parseInt((e.target as HTMLSelectElement).value);
    setVnetSubnetmask(subnetmask);
    setIps(await getIpaddressesCount(subnetmask));
  };

  const checkIfVnetIsValid = async () => {
    try {
      setVnetSizeIsValid(
        await compareVnetRangeWithSubnetRangeUsed(
          vnet.networkAddress + "/" + vnet.subnetmask,
          usedRanges
        )
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

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
    console.log(networkAddress);
    try {
      const addressSpace = await getAddressSpace(
        networkAddress + "/" + vnet.subnetmask,
        isValid
      );
      console.log("Fetch wird ausgeführt");
      console.log(addressSpace);
      setError("");
      setRange(addressSpace);
      //checkIfVnetIsValid();
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
      // Setze alle relevanten Zustände zurück oder initialisiere sie neu
      setVnetNetworkAddress("10.0.0.0");
      setVnetSubnetmask(24); // oder ein anderer Standardwert
      setVnetName("VnetName-1");
      setIps("256");
      setIsValid(true);
      setError("");
    }
  }, [userLoginStatus]);

  useEffect(() => {
    if (isValid === true) {
      fetchAddressSpace(vnet.networkAddress);
    }
  }, [vnet.networkAddress]);

  useEffect(() => {
    setUserData();
  }, []);

  return (
    <>
      <div className="flex  sm:flex-col pt-10 font-montserrat xl:space-x-10 xl:flex-row">
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
              onChange={handleIpInput}
            ></input>
          </div>
          <div className="flex-1">
            {isValid === false ? (
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
          <div className="flex-1"></div>
          <div className="flex-1" id="sizeselect">
            <SubnetMaskSelect
              elementID={"ip_size_input"}
              defaultValue={vnet.subnetmask}
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
    </>
  );
}

export default VnetInput;
