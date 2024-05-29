function Sidebar() {
  return (
    <div className="flex flex-row min-w-[20rem] min-h-[20rem] pt-16 pl-6">
      <div className="flex flex-col rounded-xl bg-white border border-sky-800 p-4 text-gray-700  shadow-blue-gray-900/5 font-montserrat ">
        <div className="">
          <h5 className="block text-xl text-sky-800 font-semibold  text-blue-gray-900">
            Vnet History
          </h5>
        </div>
        <div className="grow">
          <nav className=" min-w-[240px] gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
            <div
              role="button"
              className="flex grow items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:bg-orange-600 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            >
              <div className="grid mr-4 place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-5 h-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              Dashboard
            </div>
          </nav>
        </div>

        <div className="flex">
          <button className="inline-flex items-center justify-center h-10 pl-4 pr-4 mr-2 w-full text-slate-50 transition-colors duration-150 bg-sky-800 rounded-lg focus:shadow-outline hover:bg-orange-600">
            <span className="text-l">Add Vnet</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
