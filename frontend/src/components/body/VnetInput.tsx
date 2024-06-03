import { useEffect, useState } from "react";
import {
  getIpaddressesCount,
  getAddressSpace,
  compareVnetRangeWithSubnetRangeUsed,
} from "../../api/calculatorCalls";
import SizeSelect from "../elements/SizeSelect";
import VnetStore from "../../store/VnetStore";
import useSubnetStore from "../../store/SubnetStore";

function VnetInput() {
  // store function for VnetIpStartStore
  const { vnet, setVnetSubnetmask, setVnetNetworkAddress, setVnetSizeIsValid } =
    VnetStore((state) => ({
      vnet: state.vnet,
      setVnetNetworkAddress: state.setVnetNetworkAddress,
      setVnetSubnetmask: state.setVnetSubnetmask,
      setVnetName: state.setVnetName,
      setVnetSizeIsValid: state.setVnetSizeIsValid,
    }));

  const { subnets } = useSubnetStore((state) => ({
    getSubnet: state.updateSubnet,
    subnets: state.subnets,
  }));

  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const [addressSpace, setAddressSpace] = useState("10.0.0.0 - 10.0.0.255");
  const [addressCount, setAddressCount] = useState("256");

  const updateIsValid = (newip: string) => {
    setIsValid(validateIP(newip));
    return validateIP(newip);
  };

  const usedRanges = subnets.map((entry) => {
    const firstIp = entry.range.split(" - ")[0];
    return `${firstIp}/${entry.subnetmask}`;
  });

  //function for validating the entered ip
  const validateIP = (ip: string) => {
    const regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
  };

  //function that sets the ip and the validState
  const handleIpInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIp = (e.target as HTMLInputElement).value;
    setVnetNetworkAddress(newIp);
    updateIsValid(newIp);
  };

  //function that sets the suffix
  const handleSuffixChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const size = parseInt((e.target as HTMLSelectElement).value);
    setVnetSubnetmask(size);
    setAddressCount(await getIpaddressesCount(size));
  };

  const fetchAddressSpace = async () => {
    try {
      const addressSpace = await getAddressSpace(
        vnet.networkAddress + "/" + vnet.subnetmask,
        isValid
      );
      setError("");
      setAddressSpace(addressSpace);
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
  useEffect(() => {
    if (isValid) {
      fetchAddressSpace();
    }
  }, [vnet.networkAddress, vnet.subnetmask, isValid, subnets]);

  return (
    <>
      <div className="flex  sm:flex-col pt-10 font-montserrat xl:space-x-10 xl:flex-row">
        <div className="flex flex-1 flex-col space-y-4" id="vnetconfig">
          <div className="flex-1 text-lg text-sky-800 font-bold " id="vnetname">
            Vnet Name
          </div>
          <div className="flex-1 border border-zinc-950 rounded">
            <input
              id="vnetName"
              type="text"
              placeholder="VnetName1"
              className=" text-sm sm:text-base focus:border-orange-600 focus:outline-none pl-4 rounded h-10"
            ></input>
          </div>
          <div className="flex-1"></div>
        </div>

        <div className="flex flex-col space-y-4" id="vnetconfig">
          <div className="flex-1 text-lg text-sky-800 font-bold " id="vnetname">
            Network Address
          </div>
          <div className="flex-1 border border-zinc-950 rounded">
            <input
              type="text"
              placeholder="Starting ip address"
              defaultValue="10.0.0.0"
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
              <div className="text-sky-800 font-bold text-m ">
                {addressSpace}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-4" id="sizeconfig">
          <div className="flex-1"></div>
          <div className="flex-1" id="sizeselect">
            <SizeSelect
              elementID={"ip_size_input"}
              defaultValue={24}
              tailWindConfig={
                "${vnet.suffixIsValid === true ? 'border-red-200' : 'border-red-200' } sm:text-base outline-none border border-zinc-950 text-m rounded focus:border-orange-600 pl-4 h-10 "
              }
              type="vnet"
              onChangeFunction={handleSuffixChange}
            ></SizeSelect>
          </div>

          <div className="flex-1 text-sky-800 font-bold text-m">
            {addressCount}
          </div>
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
