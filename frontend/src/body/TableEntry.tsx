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
          <div className="flex pl-4 flex-initial w-5/12">
            <input
              value={name}
              onChange={handleNameChange}
              className="w-60 outline-none"
              placeholder="Name"
            ></input>
          </div>
          <div className="flex pl-6 flex-initial w-28 w-min-28">
            <select
              value={size}
              onChange={handleSizeChange}
              className="w-18 h-8 outline-none border border-grey text-sm rounded-lg focus:border-orange-600 "
            >
              <option value="14">/14</option>
              <option value="15">/15</option>
              <option value="16">/16</option>
              <option value="17">/17</option>
              <option value="18">/18</option>
              <option value="19">/19</option>
              <option value="20">/20</option>
              <option value="21">/21</option>
              <option value="22">/22</option>
              <option value="23">/23</option>
              <option value="24">/24</option>
              <option value="25">/25</option>
              <option value="26">/26</option>
              <option value="27">/27</option>
              <option value="28">/28</option>
              <option value="29">/29</option>
              <option value="30">/30</option>
              <option value="31">/31</option>
              <option value="32">/32</option>
            </select>
          </div>
          <div className="flex pl-6 flex-initial w-28 text-blue-700 font-bold">
            {ips}
          </div>
          <div className="flex pl-6 flex-initial w-80 ">{range}</div>
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
