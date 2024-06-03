import { Link } from "react-router-dom";
import NetworkIcon from "../../styles/network.png";

function NetworkSidebar() {
  return (
    <aside
      id="default-sidebar"
      className="left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r-2 border-sky-800"
      aria-label="Sidebar"
    >
      <div className="h-full pt-6 px-4 overflow-y-auto bg-white dark:bg-gray-800 font-montserrat">
        <div className="flex items-center justify-between">
          <div className="text-lg text-sky-800">Virtuel Networks </div>
          <div className="">
            <button
              className="inline-flex items-center justify-center w-6 h-6 text-slate-50 transition-colors duration-150 bg-sky-800 rounded-lg focus:shadow-outline hover:bg-orange-600"
              //onClick={null}
            >
              <span className="text-l">+</span>
            </button>
          </div>
        </div>
        <ul className="space-y-2 font-medium pt-4">
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white bg-gray-100 hover:bg-orange-600 dark:hover:bg-gray-700 group"
            >
              <Link to="/">
                <img className="h-6 w-6" src={NetworkIcon} alt="Your Logo" />
              </Link>
              <span className="ms-3">Vnet1</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default NetworkSidebar;
