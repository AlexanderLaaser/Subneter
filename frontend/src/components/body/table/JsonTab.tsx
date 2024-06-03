import { useEffect } from "react";
import useSubnetStore from "../../../store/SubnetStore";

function JsonField() {
  useEffect(() => {
    console.log("JSON:");
    console.log(subnets);
  });

  const { subnets } = useSubnetStore((state) => ({
    subnets: state.subnets,
  }));

  return (
    <>
      <div className="flex justify-center content-center w-full font-montserrat">
        <div className="flex justify-center content-center w-full">
          <textarea
            value={JSON.stringify(subnets, null, 2)}
            className=" fleexresize-y font-montserrat w-full  bg-white mt-3 rounded-lg h-auto min-h-[300px]"
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

export default JsonField;
