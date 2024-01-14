function TableEntry() {
  const amount_ips = 128;
  const calculated_range = "222.222.222.222-222.222.222.222";

  return (
    <>
      <div className="flex justify-center content-center w-full">
        <div className="flex items-center font-montserrat w-full max-w-screen-md bg-white mt-3 rounded-lg h-12 ml-10">
          <div className="flex pl-6">
            <input className="w-52 outline-none" placeholder="Name"></input>
          </div>
          <div className="flex pl-10">
            <select
              id="countries"
              className=" outline-none border border-grey text-sm rounded-lg focus:border-orange-600 p-1.5 "
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
          <div className="flex pl-20 text-blue-700 font-bold">{amount_ips}</div>
          <div className="flex pl-16  ">{calculated_range}</div>
        </div>
        <div className=" flex pl-2 items-center justify-center mt-3">
          <button className="inline-flex items-center justify-center w-6 h-6 mr-2 text-slate-50 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-orange-600">
            <span className="text-2xl h-10">-</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default TableEntry;
