import { useEffect } from "react";
import useTableEntriesStore from "../store/TabelEntriesStore";

function JSONField() {
  useEffect(() => {
    console.log("JSON:");
    console.log(tableEntriesStore);
  });

  const { tableEntriesStore } = useTableEntriesStore((state) => ({
    tableEntriesStore: state.tableEntries,
  }));

  return (
    <>
      <div className="flex justify-center content-center w-full font-montserrat">
        <div className="flex justify-center content-center w-full">
          <textarea
            value={JSON.stringify(tableEntriesStore, null, 2)}
            className=" fleexresize-y font-montserrat w-full max-w-screen-md bg-white mt-3 rounded-lg h-auto min-h-[300px]"
          ></textarea>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button className="inline-flex items-center justify-center w-32 h-10 mr-2 text-slate-50 transition-colors duration-150 bg-blue-700 rounded-lg focus:shadow-outline hover:bg-orange-600">
          <span className="text-l">Export</span>
        </button>
      </div>
    </>
  );
}

export default JSONField;
