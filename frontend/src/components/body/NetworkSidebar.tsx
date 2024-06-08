import NetworkIcon from "../../styles/network.png";
import { useVnetStore } from "../../store/VnetStore";

function NetworkSidebar() {
  const { vnets, addVnet, setSelectedVnet, selectedVnet } = useVnetStore();

  const handleAddVnet = () => {
    const newVnetName = `VnetName-${vnets.length + 1}`;
    addVnet(newVnetName);
  };

  const handleVnetSelect = (vnetName: string) => {
    setSelectedVnet(vnetName);
  };

  return (
    <aside
      id="default-sidebar"
      className="left-0 w-64 h-full sm:translate-x-0 border-r-2 border-sky-800 bg-white"
      aria-label="Sidebar"
    >
      <div className=" pt-6 px-4 overflow-y-auto bg-white dark:bg-gray-800 font-montserrat">
        <div className="flex items-center justify-between">
          <div className="text-lg text-sky-800">Virtuel Networks </div>
          <div className="">
            <button
              className="inline-flex items-center justify-center w-6 h-6 text-slate-50 transition-colors duration-150 bg-sky-800 rounded-lg focus:shadow-outline hover:bg-orange-600"
              onClick={handleAddVnet}
            >
              <span className="text-l">+</span>
            </button>
          </div>
        </div>
        <ul className="space-y-2 font-medium pt-4">
          {vnets.map((vnet) => (
            <li key={vnet} onClick={() => handleVnetSelect(vnet)}>
              <div
                className={`flex items-center p-2 rounded-lg ${
                  selectedVnet === vnet
                    ? "bg-sky-800 text-white"
                    : "bg-gray-100 hover:bg-orange-600"
                }`}
              >
                <img className="h-6 w-6" src={NetworkIcon} alt="Network Icon" />
                <div
                  className={`flex-1 text-center ${
                    selectedVnet === vnet ? "text-white" : "text-black"
                  }`}
                >
                  {vnet}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default NetworkSidebar;
