import React, { useState, useEffect } from "react";
import { useVnetStore } from "../../store/VnetStore";
import SubnetMaskSelect from "../elements/SubnetMaskSelect";
import DeleteButton from "../elements/DeleteButton";
import {
  getIpaddressesCount,
  getAddressSpace,
} from "../../api/calculatorCalls";
import { useUserStore } from "../../store/UserStore";
import WarningPopup from "../elements/modals/NoFocusModal";
import ActionModals from "../elements/modals/NoFocusModal";

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
  const {
    deleteAddressSpace,
    checkIfVnetSubnetMaskIsValid,
    updateAddressSpaceSubnetMask,
    updateAddressSpaceNetworkAddress,
    getAddressSpaceCIDRList,
    deleteSubnetsWithinRange,
  } = useVnetStore();
  const { userLoginStatus, setUnsavedChanges } = useUserStore();
  const [IpIsValid, setIpIsValid] = useState(true);
  const [error, setError] = useState("");
  const [range, setRange] = useState("");
  const [ips, setIps] = useState(256);
  const [showAddressSpaceMaskWarningPop, setAddressSpaceMaskWarningPop] =
    useState(false);

  const validateAndFetchAddressSpace = async (
    networkAddress: string,
    subnetMask: number,
    id: number
  ) => {
    if (validateIP(networkAddress)) {
      setIpIsValid(true);

      try {
        const otherAddressSpaces = getAddressSpaceCIDRList(id);
        console.log(otherAddressSpaces);
        const addressSpace = await getAddressSpace(
          networkAddress + "/" + subnetMask,
          otherAddressSpaces,
          IpIsValid
        );
        setError("");
        setRange(addressSpace);
        const ipCount = await getIpaddressesCount(subnetMask);
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

  const handleNetworkAddressChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newNetworkAddress = e.target.value;
    updateAddressSpaceNetworkAddress(id, newNetworkAddress);
    await validateAndFetchAddressSpace(newNetworkAddress, subnetMask, id);
    setUnsavedChanges(true);
  };

  const handleVnetMaskChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSubnetMask = parseInt(e.target.value);
    console.log("New subnet mask: ", newSubnetMask);

    if (
      (await checkIfVnetSubnetMaskIsValid(networkAddress, newSubnetMask)) ===
      true
    ) {
      updateAddressSpaceSubnetMask(id, newSubnetMask);
      validateAndFetchAddressSpace(networkAddress, newSubnetMask, id);
    } else {
      setAddressSpaceMaskWarningPop(true);
      console.log("Subnet mask is invalid");
    }
    setUnsavedChanges(true);
  };

  const handleDeleteAddressSpace = () => {
    const cidrRange = `${networkAddress}/${subnetMask}`;
    deleteSubnetsWithinRange(cidrRange);
    deleteAddressSpace(id);
    setUnsavedChanges(true);
  };

  const validateIP = (ip: string) => {
    const regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
  };

  useEffect(() => {
    validateAndFetchAddressSpace(networkAddress, subnetMask, id);
  }, [networkAddress, subnetMask]);

  return (
    <div className="flex flex-1 flex-row space-x-4">
      <div className="flex flex-col flex-1">
        <div className="flex-1 rounded ">
          <input
            type="text"
            placeholder=""
            value={networkAddress}
            className="text-sm sm:text-base rounded focus:border-orange-600 focus:outline-none pl-4 h-10 bg-gray-200 w-full"
            onChange={handleNetworkAddressChange}
          />
        </div>
        <div className="flex-1 pt-1">
          {IpIsValid === false ? (
            <div className="text-red-500 text-m">Invalid IP Address</div>
          ) : error !== "" ? (
            <div className="text-red-500 text-m ">{error}</div>
          ) : (
            <div className="text-sky-800 text-m ">{range}</div>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="outline-none rounded focus:border-orange-600 !bg-gray-200">
          <SubnetMaskSelect
            elementID={"ip_size_input"}
            value={subnetMask}
            tailWindConfig={
              "sm:text-base rounded text-m pl-4 h-10 !bg-gray-200"
            }
            type="vnet"
            onChangeFunction={handleVnetMaskChange}
          />
        </div>
        <div className="flex-1 text-sky-800 text-m pt-1">{ips}</div>
      </div>
      {userLoginStatus == true ? (
        index > 0 ? (
          <DeleteButton
            status={"active"}
            onClickFunction={handleDeleteAddressSpace}
            height="h-10 w-10"
          />
        ) : (
          <div className="flex flex-start">
            <div className="flex flex-col content-center " id="addbutton">
              <div className="flex flex-1 items-start">
                <button
                  onClick={handleAddAddressSpace}
                  className="w-10 h-10 text-slate-50 transition-colors duration-150 bg-sky-800 rounded-lg focus:shadow-outline hover:bg-orange-600"
                >
                  <span className="text-l">+</span>
                </button>
              </div>
            </div>
          </div>
        )
      ) : null}
      {showAddressSpaceMaskWarningPop && (
        <ActionModals
          message={
            "Address range cannot be changed if the subnets are filled in!"
          }
          onClose={() => setAddressSpaceMaskWarningPop(false)}
          type={"warning"}
        />
      )}
    </div>
  );
};

export default AddressSpace;
