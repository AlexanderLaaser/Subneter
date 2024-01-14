import { useState } from "react";
import TableEntry from "./TableEntry";

function AddButton() {
  const [tableEntries, setTableEntries] = useState(0);

  const addTableEntry = () => {
    setTableEntries(tableEntries + 1);
    console.log(tableEntries);
  };

  const renderTableEntries = () => {
    return Array.from({ length: tableEntries }, (_, index) => (
      <TableEntry key={index} />
    ));
  };

  return (
    <>
      {renderTableEntries()} {<TableEntry></TableEntry>}
      <div className="flex justify-center content-center w-full font-montserrat">
        <div className=" flex pl-2 items-center justify-center mt-4">
          <button
            className="inline-flex items-center justify-center w-32 h-10 mr-2 text-slate-50 transition-colors duration-150 bg-blue-700 rounded-lg focus:shadow-outline hover:bg-orange-600"
            onClick={() => addTableEntry()}
          >
            <span className="text-l">Add Subnet</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default AddButton;
