import { useEffect, useState } from "react";
import {
  getIpaddressesCount,
  getAddressSpace,
  compareVnetRangeWithSubnetRangeUsed,
} from "../../api/calculatorCalls";
import SizeSelect from "../elements/SizeSelect";
import VnetStore from "../../store/VnetInputStore";
import useTableEntriesStore from "../../store/TabelEntriesStore";

function VnetInput() {
  // store function for VnetIpStartStore
  const { setVnetSuffix, setVnetIpStart, setSuffixIsValid, vnet } = VnetStore(
    (state) => ({
      vnet: state.vnet,
      setVnetSuffix: state.setVnetSuffix,
      setVnetIpStart: state.setVnetIpStart,
      setSuffixIsValid: state.setSuffixIsValid,
    })
  );

  const { tableEntries } = useTableEntriesStore((state) => ({
    updateTableEntryStore: state.updateTableEntry,
    tableEntries: state.tableEntries,
  }));

  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const [addressSpace, setAddressSpace] = useState("10.0.0.0 - 10.0.0.255");
  const [addressCount, setAddressCount] = useState("256");

  const updateIsValid = (newip: string) => {
    setIsValid(validateIP(newip));
    return validateIP(newip);
  };

  const usedRanges = tableEntries.map((entry) => {
    const firstIp = entry.range.split(" - ")[0];
    return `${firstIp}/${entry.size}`;
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
    setVnetIpStart(newIp);
    updateIsValid(newIp);
  };

  //function that sets the suffix
  const handleSuffixChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const suffix = parseInt((e.target as HTMLSelectElement).value);
    setVnetSuffix(suffix);
    setAddressCount(await getIpaddressesCount(suffix));
  };

  const fetchAddressSpace = async () => {
    try {
      const addressSpace = await getAddressSpace(
        vnet.vnetIpStart + "/" + vnet.vnetSuffix,
        isValid
      );
      setError("");
      setAddressSpace(addressSpace);
      setSuffixIsValid(
        await compareVnetRangeWithSubnetRangeUsed(
          vnet.vnetIpStart + "/" + vnet.vnetSuffix,
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
  }, [vnet.vnetIpStart, vnet.vnetSuffix, isValid, tableEntries]);

  return (
    <>
      <div className="flex w-full items-center justify-center font-montserrat">
        <div className="pt-14">
          <div className="text-lg text-sky-800 font-bold mb-4">
            Network Address
          </div>
          <div className="flex items-center justify-center">
            <div className="mr-4">
              <input
                id="ip_adress"
                type="text"
                placeholder="Starting ip address"
                defaultValue="10.0.0.0"
                className="text-sm sm:text-base relative border rounded placeholder-gray-400 focus:border-orange-600 focus:outline-none pl-4 pr-20 border-zinc-950 h-10"
                onChange={handleIpInput}
              ></input>
              {isValid === false ? (
                <div className="text-red-500 font-bold text-m pt-2">
                  Invalid IP Address
                </div>
              ) : error !== "" ? (
                <div className="text-red-500 font-bold text-m pt-2">
                  {error}
                </div>
              ) : (
                <div className="text-sky-800 font-bold text-m pt-2">
                  {addressSpace}
                </div>
              )}
            </div>
            <div className="">
              <SizeSelect
                elementID={"ip_size_input"}
                defaultValue={24}
                tailWindConfig={
                  "${vnet.suffixIsValid === true ? 'border-red-200' : 'border-red-200' } sm:text-base outline-none border border-zinc-950 text-m rounded focus:border-orange-600 pr-16 pl-4 h-10"
                }
                type="vnet"
                onChangeFunction={handleSuffixChange}
              ></SizeSelect>

              <div className="text-sky-800 font-bold text-m pt-2">
                {addressCount}
              </div>
            </div>
            <div className="flex">
              <div className="flex pl-4 mb-8 font-montserrat">
                <button className="inline-flex items-center justify-center w-32 h-10 text-slate-50 transition-colors duration-150 bg-sky-800 rounded-lg focus:shadow-outline hover:bg-orange-600">
                  <span className="text-l">Add Range</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VnetInput;
