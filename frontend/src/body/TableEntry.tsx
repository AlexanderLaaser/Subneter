import { useContext } from "react";
import IpStartContext from "../context/IpStartContext";

interface TableEntryProps {
  id: number;
  name: string;
  size: string;
  ips: string;
  range: string;
  updateName: (id: number, description: string) => void;
  updateSize: (id: number, size: string) => void;
  updateIps: (id: number, size: string) => void;
  deleteTableEntry: () => void;
  totalEntries: number;
}

function TableEntry({
  id,
  name,
  size,
  ips,
  range,
  updateName,
  updateSize,
  updateIps,
  deleteTableEntry,
  totalEntries,
}: TableEntryProps) {
  const { startIp } = useContext(IpStartContext);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateName(id, event.target.value);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateSize(id, event.target.value);
    updateIps(id, event.target.value);
  };

  return (
    <>
      <div className="flex justify-center content-center w-full">
        <div className="flex items-center font-montserrat w-full max-w-screen-md bg-white mt-3 rounded-lg h-12 ml-10">
          <div className="flex pl-6">
            <input
              value={name}
              onChange={handleNameChange}
              className="w-52 outline-none"
              placeholder="Name"
            ></input>
          </div>
          <div className="flex pl-10">
            <select
              value={size}
              onChange={handleSizeChange}
              className="outline-none border border-grey text-sm rounded-lg focus:border-orange-600 p-1.5"
            >
              <option value="21">/21</option>
              <option value="22">/22</option>
              <option value="23">/23</option>
              <option value="24">/24</option>
              <option value="25">/25</option>
              <option value="26">/26</option>
              <option value="27">/27</option>
            </select>
          </div>
          <div className="flex pl-20 text-blue-700 font-bold">{ips}</div>
          <div className="flex pl-16  ">{startIp}</div>
        </div>
        {totalEntries > 0 ? (
          <div className=" flex pl-2 items-center justify-center mt-3">
            <button
              className="inline-flex items-center justify-center w-6 h-6 mr-2 text-slate-50 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-orange-600"
              onClick={deleteTableEntry}
            >
              <span className="text-2xl h-10">-</span>
            </button>
          </div>
        ) : (
          <div className=" flex pl-10 items-center justify-center mt-3"></div>
        )}
      </div>
    </>
  );
}

export default TableEntry;
