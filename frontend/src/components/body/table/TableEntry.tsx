import { useEffect, useState } from "react";
import SizeSelect from "../../elements/SizeSelect";
import { compareVnetRangeWithSubnetRangeUsed } from "../../../api/calculatorCalls";
import VnetStore from "../../../store/VnetStore";
import useTableEntriesStore from "../../../store/SubnetStore";
import { MdDelete } from "react-icons/md";
import DeleteButton from "../../elements/DeleteButton";

interface InterfaceTableEntryProps {
  id: number;
  subnetName: string;
  size: number;
  ips: number;
  range: string;
  error: string;
  updateSubnetName: (id: number, description: string) => void;
  updateIps: (id: number, size: number) => void;
  deleteTableEntry: () => void;
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
  //store functions
  const { vnet, setSuffixIsValid } = VnetStore((state) => ({
    vnet: state.vnet,
    setSuffixIsValid: state.setVnetSizeIsValid,
  }));

  const { tableEntries, getSubnet, setError } = useTableEntriesStore(
    (state) => ({
      tableEntries: state.subnets,
      setError: state.setError,
      getSubnet: state.getSubnet,
    })
  );

  const [selectedSize, setSelectedSize] = useState(size);

  const usedRanges = tableEntries.map((entry) => {
    const firstIp = entry.range.split(" - ")[0];
    return `${firstIp}/${entry.subnetmask}`;
  });

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateSubnetName(id, event.target.value);
  };

  const handleSizeChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    try {
      setSelectedSize(parseInt(event.target.value));
      await updateIps(id, parseInt(event.target.value));
    } catch (error) {
      if (error instanceof Error) {
        setError(id, error.message);
      }
    }
  };

  useEffect(() => {
    updateIps(id, selectedSize);
  }, [vnet.subnetmask]);

  useEffect(() => {
    const checkSuffixisValid = async () => {
      try {
        setSuffixIsValid(
          await compareVnetRangeWithSubnetRangeUsed(
            vnet.networkAddress + "/" + vnet.subnetmask,
            usedRanges
          )
        );
      } catch (error) {
        if (error instanceof Error) {
          setError(id, error.message);
        }
      }
    };
    checkSuffixisValid();
  }, [selectedSize]);

  return (
    <>
      <div className="flex font-montserrat">
        <div className="flex items-center  w-full border border-sky-800 mt-3 rounded-lg h-12 bg-white space-x-6">
          <div className="flex-1 pl-4">
            <input
              value={subnetName}
              onChange={handleDescriptionChange}
              className="border-none"
              placeholder="Name"
            ></input>
          </div>
          <div className="flex-inital w-12">
            <SizeSelect
              elementID={"ip_size_input"}
              defaultValue={size}
              tailWindConfig={
                "outline-none border border-grey text-sm rounded-lg focus:border-orange-600"
              }
              type="subnet"
              onChangeFunction={handleSizeChange}
            ></SizeSelect>
          </div>
          <div className="flex-inital w-12 text-sky-800 font-bold">{ips}</div>
          <div className="flex flex-1 flex-row pr-4">
            {getSubnet(id)?.error ? (
              <div className="flex-1 text-red-500 font-bold">
                {getSubnet(id)?.error}
              </div>
            ) : (
              <div className="flex-1 text-sky-800">{range}</div>
            )}
            {usedRanges.length > 1 ? (
              <DeleteButton
                status={"active"}
                onClickFunction={deleteTableEntry}
              />
            ) : (
              <DeleteButton
                status={"inactive"}
                onClickFunction={deleteTableEntry}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TableEntry;
