import SizeSelect from "../../elements/SubnetMaskSelect";
import DeleteButton from "../../elements/DeleteButton";
import { useVnetStore } from "../../../store/VnetStore";

interface InterfaceTableEntryProps {
  id: number;
  error: string;
  subnetName: string;
  subnetmask: number;
  ips: number;
  range: string;
  updateSubnetName: (id: number, name: string) => void;
  updateIps: (id: number, subnetmask: number) => Promise<void>;
  deleteTableEntry: () => void;
}

function TableEntry({
  id,
  updateSubnetName,
  updateIps,
  deleteTableEntry,
}: InterfaceTableEntryProps) {
  const { getSubnets, setError } = useVnetStore();
  const subnets = getSubnets();
  const subnet = subnets.find((subnet) => subnet.id === id);

  if (!subnet) {
    return null;
  }

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
              value={subnet.name}
              onChange={handleNameChange}
              className="border-none"
              placeholder="Name"
            ></input>
          </div>
          <div className="flex-inital w-12">
            <SizeSelect
              elementID={"ip_size_input"}
              value={subnet.subnetmask}
              tailWindConfig={
                "outline-none border border-grey text-sm rounded-lg focus:border-orange-600"
              }
              type="subnet"
              onChangeFunction={handleSubnetMaskChange}
            ></SizeSelect>
          </div>
          <div className="flex-inital w-12 text-sky-800 font-bold">
            {subnet.ips}
          </div>
          <div className="flex flex-1 flex-row pr-1">
            <div className="flex-1 text-sky-800">{subnet.range}</div>
          </div>
        </div>
        <DeleteButton
          status={"active"}
          onClickFunction={deleteTableEntry}
          height="h-10 w-10"
        />
      </div>
    </>
  );
}

export default TableEntry;
