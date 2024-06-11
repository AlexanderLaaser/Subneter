import React, { useState, useEffect } from "react";
import { useVnetStore } from "../../store/VnetStore";
import SubnetMaskSelect from "../elements/SubnetMaskSelect";
import DeleteButton from "../elements/DeleteButton";
import {
  getIpaddressesCount,
  getAddressSpace,
} from "../../api/calculatorCalls";

interface AddressSpaceProps {
  networkAddress: string;
  subnetMask: number;
  id: number;
  index: number;
  handleAddAddressSpace: () => void;
}

const AddressSpace: React.FC<AddressSpaceProps> = ({
  networkAddress,
  subnetMask,
  id,
  index,
  handleAddAddressSpace,
}) => {
  const { updateAddressSpace, deleteAddressSpace } = useVnetStore();
  const [IpIsValid, setIpIsValid] = useState(true);
  const [error, setError] = useState("");
  const [range, setRange] = useState("");
  const [ips, setIps] = useState(256);

  const validateAndFetchAddressSpace = async (
    networkAddr: string,
    subnetMsk: number
  ) => {
    if (validateIP(networkAddr)) {
      setIpIsValid(true);
      try {
        const addressSpace = await getAddressSpace(
          networkAddr + "/" + subnetMsk,
          IpIsValid
        );
        setError("");
        setRange(addressSpace);
        const ipCount = await getIpaddressesCount(subnetMsk);
        setIps(ipCount);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    } else {
      setIpIsValid(false);
    }
  };

  const handleNetworkAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newNetworkAddress = e.target.value;
    const updatedNetworkAddress = {
      id,
      networkaddress: newNetworkAddress,
      subnetmask: subnetMask,
    };
    updateAddressSpace(updatedNetworkAddress);
    validateAndFetchAddressSpace(newNetworkAddress, subnetMask);
  };

  const handleSubnetMaskChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSubnetMask = parseInt(e.target.value);
    const updatedNetworkAddress = {
      id,
      networkaddress: networkAddress,
      subnetmask: newSubnetMask,
    };
    updateAddressSpace(updatedNetworkAddress);
    validateAndFetchAddressSpace(networkAddress, newSubnetMask);
  };

  const handleDeleteAddressSpace = () => {
    deleteAddressSpace(id);
  };

  const validateIP = (ip: string) => {
    const regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
  };

  useEffect(() => {
    validateAndFetchAddressSpace(networkAddress, subnetMask);
  }, [networkAddress, subnetMask]);

  return (
    <div className="flex flex-1 flex-row space-x-4">
      <div className="flex flex-col flex-1">
        <div className="flex-1 border border-zinc-950 rounded bg-white">
          <input
            type="text"
            placeholder=""
            value={networkAddress}
            className="text-sm sm:text-base rounded focus:border-orange-600 focus:outline-none pl-4 h-10"
            onChange={handleNetworkAddressChange}
          />
        </div>
        <div className="flex-1 pt-1">
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

      <div className="flex flex-col">
        <div className="border outline-none border-zinc-950 rounded focus:border-orange-600">
          <SubnetMaskSelect
            elementID={"ip_size_input"}
            value={subnetMask}
            tailWindConfig={"sm:text-base rounded text-m pl-4 pr-4 h-10"}
            type="vnet"
            onChangeFunction={handleSubnetMaskChange}
          />
        </div>
        <div className="flex-1 text-sky-800 font-bold text-m pt-1">{ips}</div>
      </div>

      <div className="flex flex-start">
        <div>
          {index > 0 ? (
            <DeleteButton
              status={"active"}
              onClickFunction={handleDeleteAddressSpace}
              height="h-10 w-10"
            />
          ) : (
            <div className="flex flex-col content-center " id="addbutton">
              <div className="flex flex-1 items-center">
                <button
                  onClick={handleAddAddressSpace}
                  className="w-10 h-10 text-slate-50 transition-colors duration-150 bg-sky-800 rounded-lg focus:shadow-outline hover:bg-orange-600"
                >
                  <span className="text-l">+</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressSpace;
