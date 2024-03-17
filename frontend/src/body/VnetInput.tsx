import { useEffect, useState } from "react";
import { getIpaddressesCount, getAddressSpace } from "../api/calls";
import SizeSelect from "./SizeSelect";
import VnetIpStartStore from "../store/VnetInputStore";

function IpInput() {
  const [isValid, setIsValid] = useState(true);
  const [addressSpace, setAddressSpace] = useState("10.0.0.0 - 10.0.0.255");
  const [addressCount, setAddressCount] = useState("256");

  const updateIsValid = (newip: string) => {
    setIsValid(validateIP(newip));
    return validateIP(newip);
  };

  // store function
  const { setVnetSuffix, setVnetIpStart, vnet } = VnetIpStartStore((state) => ({
    vnet: state.vnet,
    setVnetSuffix: state.setVnetSuffix,
    setVnetIpStart: state.setVnetIpStart,
  }));

  //function for validating the entered ip
  const validateIP = (ip: string) => {
    const regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
  };

  //function that sets the ip and the validState
  const handleIpInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIp = (e.target as HTMLInputElement).value;
    setVnetIpStart(newIp);
    updateIsValid(newIp);
  };

  //function that sets the suffix
  const handleSuffixChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const suffix = parseInt((e.target as HTMLSelectElement).value);
    setVnetSuffix(suffix);
    const addressCount = await getIpaddressesCount(suffix);
    setAddressCount(addressCount);
  };

  useEffect(() => {
    const fetchAddressSpace = async () => {
      try {
        const addressSpace = await getAddressSpace(
          vnet.vnetIpStart + "/" + vnet.vnetSuffix,
          isValid
        );
        setAddressSpace(addressSpace);
        setVnetIpStart(vnet.vnetIpStart);
        setVnetSuffix(vnet.vnetSuffix);
        // Das funktioniert noch nicht so ganz, da die CIDR Range ausgegeben werden muss, nicht die gesamte Range
        console.log("vnetipaddressCidr");
        console.log(vnet.vnetSuffix);
        console.log(vnet.vnetIpStart);
      } catch (error) {
        console.error("Failed to fetch address space:", error);
      }
    };

    if (isValid) {
      fetchAddressSpace();
    }
  }, [vnet.vnetIpStart, vnet.vnetSuffix, isValid]);

  return (
    <>
      <div className="flex w-full items-center justify-center font-montserrat">
        <div className="pt-14">
          <div className="flex items-center justify-center">
            <div className="mr-2">
              <input
                id="ip_adress"
                type="text"
                placeholder="Starting ip address"
                defaultValue="10.0.0.0"
                className="text-sm sm:text-base relative border rounded placeholder-gray-400 focus:border-orange-600 focus:outline-none pl-4 pr-20 border-zinc-950 h-10"
                onChange={handleIpInput}
              ></input>
              {isValid ? (
                <div className="text-blue-700 font-bold text-sm pt-2">
                  {addressSpace}
                </div>
              ) : (
                <div className="text-red-500 font-bold text-sm pt-2">
                  Invalid IP Address
                </div>
              )}
            </div>
            <div className="">
              <SizeSelect
                elementID={"ip_size_input"}
                defaultValue={24}
                tailWindConfig={
                  "sm:text-base outline-none border border-zinc-950 text-sm rounded focus:border-orange-600 pr-16 pl-4 h-10"
                }
                onChangeFunction={handleSuffixChange}
              ></SizeSelect>

              <div className="text-blue-700 font-bold text-sm pt-2">
                {addressCount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IpInput;
