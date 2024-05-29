function HistoryUsage() {
  return (
    <div className="flex flex-row min-w-[20rem] min-h-[20rem] pt-16 pl-6">
      <div className="flex flex-col rounded-xl bg-white border border-sky-800 p-4 text-gray-700  shadow-blue-gray-900/5 font-montserrat ">
        <div className="">
          <h5 className="block text-xl text-sky-800 font-semibold  text-blue-gray-900">
            Vnet Usage
          </h5>
        </div>
        <div className="grow">
          <nav className=" min-w-[240px] gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
            <div
              role="button"
              className="flex grow items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:bg-orange-600 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            >
              <div className="grid mr-4 place-items-center"></div>
              Data
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default HistoryUsage;
