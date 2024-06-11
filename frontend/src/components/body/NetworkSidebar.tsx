import NetworkIcon from "../../styles/network.png";
import { useVnetStore } from "../../store/VnetStore";
import iNetworkAddress from "../../interfaces/iAddressSpace";

function NetworkSidebar() {
  const { vnets, addVnet, setSelectedVnet, selectedVnetId } = useVnetStore();

  const handleAddVnet = () => {
    const newNetworkAddress: iNetworkAddress = {
      id: 0,
      networkaddress: "10.0.0.0",
      subnetmask: 24,
    };

    const newVnet = {
      id: vnets.length > 0 ? Math.max(...vnets.map((v) => v.id)) + 1 : 1,
      name: `VnetName-${vnets.length + 1}`,
      addressspaces: [newNetworkAddress],
      subnets: [],
    };
    addVnet(newVnet);
  };

  const handleVnetSelect = (vnetId: number) => {
    setSelectedVnet(vnetId);
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
            <li key={vnet.id} onClick={() => handleVnetSelect(vnet.id)}>
              <div
                className={`flex items-center p-2 rounded-lg ${
                  selectedVnetId === vnet.id
                    ? "bg-sky-800 text-white"
                    : "bg-gray-100 hover:bg-orange-600"
                }`}
              >
                <img className="h-6 w-6" src={NetworkIcon} alt="Network Icon" />
                <div
                  className={`flex-1 text-center ${
                    selectedVnetId === vnet.id ? "text-white" : "text-black"
                  }`}
                >
                  {vnet.name}
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
