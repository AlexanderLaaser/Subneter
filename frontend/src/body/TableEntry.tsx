import { useEffect, useState } from "react";
import SizeSelect from "./SizeSelect";
import { MdDelete } from "react-icons/md";
import { compareVnetRangeWithSubnetRangeeUsed } from "../api/calls";
import UsedIpAddressCidrStore from "../store/UsedSubnetIpAddressCidrStore";
import VnetStore from "../store/VnetInputStore";

interface InterfaceTableEntryProps {
  id: number;
  subnetName: string;
  size: number;
  ips: string;
  range: string;
  updateSubnetName: (id: number, description: string) => void;
  updateIps: (id: number, size: number) => void;
  deleteTableEntry: () => void;
  totalEntries: number;
}

function TableEntry({
  id,
  subnetName,
  size,
  ips,
  range,
  updateSubnetName,
  updateIps,
  deleteTableEntry,
}: InterfaceTableEntryProps) {
  const [error, setError] = useState("");
  const [selectedSize, setSelectedSize] = useState(size);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateSubnetName(id, event.target.value);
  };

  //store functions
  const { setSuffixIsValid, vnet } = VnetStore((state) => ({
    vnet: state.vnet,
    setSuffixIsValid: state.setSuffixIsValid,
  }));

  const { usedIpaddressesCidr } = UsedIpAddressCidrStore((state) => ({
    usedIpaddressesCidr: state.usedIpaddressesCidr,
  }));

  const handleSizeChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    try {
      await updateIps(id, parseInt(event.target.value));
      setError("");
      setSelectedSize(parseInt(event.target.value));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    const checkSuffixisValid = async () => {
      try {
        setSuffixIsValid(
          await compareVnetRangeWithSubnetRangeeUsed(
            vnet.vnetIpStart + "/" + vnet.vnetSuffix,
            usedIpaddressesCidr
          )
        );
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };
    checkSuffixisValid();
    console.log("Subnet Änderung");
  }, [selectedSize]);

  return (
    <>
      <div className="flex justify-center w-full">
        <div className="flex items-center font-montserrat w-full max-w-screen-md bg-white border border-sky-800 mt-3 rounded-lg h-12 ml-10">
          <div className="flex pl-4 flex-initial w-5/12">
            <input
              value={subnetName}
              onChange={handleDescriptionChange}
              className="w-60 outline-none"
              placeholder="Name"
            ></input>
          </div>
          <div className="flex pl-6 flex-initial w-28 w-min-28">
            <SizeSelect
              elementID={"ip_size_input"}
              defaultValue={size}
              tailWindConfig={
                "w-18 h-8 outline-none border border-grey text-sm rounded-lg focus:border-orange-600"
              }
              type="subnet"
              onChangeFunction={handleSizeChange}
            ></SizeSelect>
          </div>
          <div className="flex pl-6 flex-initial w-28 text-sky-800 font-bold">
            {ips}
          </div>
          {error ? (
            <div className="flex pl-6 flex-initial w-80 text-red-500 font-bold">
              {error}
            </div>
          ) : (
            <div className="flex pl-6 flex-initial w-80 ">{range}</div>
          )}
        </div>
        {usedIpaddressesCidr.length > 1 ? (
          <div className=" flex pl-2 items-center justify-center mt-3">
            <button
              className="inline-flex items-center justify-center w-6 h-6 mr-2 text-slate-50 transition-colors duration-150 bg-red-500 rounded-lg focus:shadow-outline hover:bg-orange-600"
              onClick={deleteTableEntry}
            >
              <span className="h-4">
                <MdDelete />
              </span>
            </button>
          </div>
        ) : (
          <div className=" flex pl-2 items-center justify-center mt-3">
            <button
              className="cursor-not-allowed bg-slate-300 inline-flex items-center justify-center w-6 h-6 mr-2 text-slate-50 transition-colors duration-150 rounded-lg focus:shadow-outline"
              disabled
              onClick={deleteTableEntry}
            >
              <span className="h-4">
                <MdDelete />
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default TableEntry;
