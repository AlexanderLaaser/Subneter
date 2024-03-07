import SizeSelect from "./SizeSelect";

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
            <SizeSelect
              elementID={"ip_size_input"}
              defaultValue="27"
              tailWindConfig={
                "w-18 h-8 outline-none border border-grey text-sm rounded-lg focus:border-orange-600"
              }
              onChangeFunction={handleSizeChange}
            ></SizeSelect>
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
