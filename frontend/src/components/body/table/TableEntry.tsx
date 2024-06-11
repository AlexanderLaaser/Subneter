import SizeSelect from "../../elements/SubnetMaskSelect";
import DeleteButton from "../../elements/DeleteButton";
import { useVnetStore } from "../../../store/VnetStore";
import iSubnet from "../../../interfaces/iSubnet";

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
  error,
  updateSubnetName,
  updateIps,
  deleteTableEntry,
}: InterfaceTableEntryProps) {
  const { getSubnets, setError } = useVnetStore();

  const subnets = getSubnets();

  const CreateUsedSubnetsArrayinCIDRNotation = subnets.map((entry: iSubnet) => {
    const firstIp = entry.range.split(" - ")[0];
    return `${firstIp}/${entry.subnetmask}`;
  });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSubnetName(id, event.target.value);
  };

  const handleSubnetMaskChange = async (
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
      <div className="flex font-montserrat space-x-2 mt-3 items-center">
        <div className="flex items-center w-full border border-sky-800 rounded-lg h-12 bg-white space-x-6">
          <div className="flex-1 pl-4">
            <input
              value={subnetName}
              onChange={handleNameChange}
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
              onChangeFunction={handleSubnetMaskChange}
            ></SizeSelect>
          </div>
          <div className="flex-inital w-12 text-sky-800 font-bold">{ips}</div>
          <div className="flex flex-1 flex-row pr-1">
            {error ? (
              <div className="flex-1 text-red-500 font-bold">{error}</div>
            ) : (
              <div className="flex-1 text-sky-800">{range}</div>
            )}
          </div>
        </div>
        {CreateUsedSubnetsArrayinCIDRNotation.length > 1 ? (
          <DeleteButton
            status={"active"}
            onClickFunction={deleteTableEntry}
            height="h-10 w-10"
          />
        ) : (
          <DeleteButton
            status={"inactive"}
            onClickFunction={deleteTableEntry}
            height="h-10 w-10"
          />
        )}
      </div>
    </>
  );
}

export default TableEntry;
