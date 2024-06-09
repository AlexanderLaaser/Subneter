import SizeSelect from "../../elements/SubnetMaskSelect";
import { useSubnetStore } from "../../../store/SubnetStore";
import DeleteButton from "../../elements/DeleteButton";

interface InterfaceTableEntryProps {
  id: number;
  subnetName: string;
  subnetmask: number;
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
  subnetmask,
  ips,
  range,
  updateSubnetName,
  updateIps,
  deleteTableEntry,
}: InterfaceTableEntryProps) {
  const { subnets, getSubnet, setError } = useSubnetStore();

  const usedSubnets = subnets.map((entry) => {
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
      await updateIps(id, parseInt(event.target.value));
    } catch (error) {
      if (error instanceof Error) {
        setError(id, error.message);
      }
    }
  };

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
              value={subnetmask}
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
            {usedSubnets.length > 1 ? (
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
