import NetworkIcon from "../../styles/network.png";
import { useVnetStore } from "../../store/VnetStore";
import { useUserStore } from "../../store/UserStore";
import FocusModal from "../elements/modals/FocusModal";
import { useState } from "react";

function NetworkSidebar() {
  const { vnets, addVnet, setSelectedVnet, selectedVnetId, getSelectedVnet } =
    useVnetStore();
  const { unsavedChanges, setUnsavedChanges } = useUserStore();
  const [showModal, setShowModal] = useState(false);
  const [pendingVnetId, setPendingVnetId] = useState<number | null>(null);

  const newVnet = {
    id: vnets.length > 0 ? Math.max(...vnets.map((v) => v.id)) + 1 : 1,
    name: "VnetName",
    isStored: false,
    addressspaces: [
      {
        id: 0,
        networkaddress: "10.0.0.0",
        subnetmask: 24,
        isStored: false,
      },
    ],
    subnets: [
      {
        id: 0,
        name: "SubnetName",
        subnetmask: 25,
        ips: 128,
        range: "10.0.0.0 - 10.0.0.128",
        error: "",
        isStored: false,
      },
    ],
  };

  const handleAddVnet = () => {
    if (!unsavedChanges) {
      addVnet(newVnet);
      setSelectedVnet(newVnet.id);
    }
    setUnsavedChanges(true);
  };

  const handleVnetSelect = (vnetId: number) => {
    if (unsavedChanges || getSelectedVnet().isStored === false) {
      setPendingVnetId(vnetId);
      setShowModal(true);
    } else {
      setSelectedVnet(vnetId);
    }
  };

  const handleCloseModal = (confirm: boolean) => {
    setShowModal(false);
    if (confirm && pendingVnetId !== null) {
      setSelectedVnet(pendingVnetId);
    }
    setPendingVnetId(null);
    setUnsavedChanges(false);
  };

  return (
    <>
      <aside
        id="default-sidebar"
        className="left-0 w-64 h-full sm:translate-x-0 bg-gray-200 rounded-lg"
        aria-label="Sidebar"
      >
        <div className="pt-4 px-4 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div className="text-lg text-sky-800">Virtuel Networks</div>
            <div className="">
              <button
                className={`inline-flex items-center justify-center w-6 h-6 text-slate-50 transition-colors duration-150 rounded-lg focus:shadow-outline ${
                  unsavedChanges
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-sky-800 hover:bg-orange-600"
                }`}
                onClick={handleAddVnet}
                disabled={unsavedChanges}
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
                      : "bg-white hover:bg-orange-600"
                  }`}
                >
                  <img
                    className="h-6 w-6"
                    src={NetworkIcon}
                    alt="Network Icon"
                  />
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
      {showModal && <FocusModal onClose={handleCloseModal} />}
    </>
  );
}

export default NetworkSidebar;
