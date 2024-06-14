import { useState, useEffect } from "react";
import { deleteVnetById, updateVnetById } from "../../api/persistenceCalls";
import { useUserStore } from "../../store/UserStore";
import { useVnetStore } from "../../store/VnetStore";
import SuccessPopup from "../header/elements/SuccessPopUp";
import iVnet from "../../interfaces/iVnet";

function TableControl() {
  const { userLoginStatus } = useUserStore();
  const {
    getSelectedVnet,
    setSelectedVnet,
    removeVnetById,
    vnets,
    getSubnets,
    getAddressSpaces,
  } = useVnetStore();

  const [showSaveSuccessPopup, setSaveSuccessPopup] = useState(false);
  const [showDeleteSuccessPopup, setDeleteSuccessPopup] = useState(false);

  const selectedVnet = getSelectedVnet();
  const subnets = getSubnets();
  const addressspaces = getAddressSpaces();

  useEffect(() => {
    if (!selectedVnet && vnets.length > 0) {
      setSelectedVnet(vnets[0].id);
    }
  }, [vnets, selectedVnet, setSelectedVnet]);

  if (!selectedVnet) {
    return <div>No VNET selected</div>;
  }

  const buildVnetConfig = (): iVnet => {
    const vnetConfig: iVnet = {
      id: selectedVnet.id,
      name: selectedVnet.name,
      addressspaces: addressspaces.map((addressspace) => {
        const { id, ...rest } = addressspace;
        return { id, ...rest };
      }),
      subnets: subnets.map((subnet) => {
        const { id, ...rest } = subnet;
        return { id, ...rest };
      }),
    };

    console.log(vnetConfig);

    return vnetConfig;
  };

  async function saveVnetConfig() {
    const vnetConfig = buildVnetConfig();
    try {
      if (selectedVnet) {
        await updateVnetById(userLoginStatus, selectedVnet.id, vnetConfig);
        console.log("VNET config stored successfully.");
        setSaveSuccessPopup(true);
      } else {
        console.error("No VNET selected.");
      }
    } catch (error) {
      console.error("Failed to store VNET config:", error);
    }
  }

  const handleSaveVnetClick = () => {
    saveVnetConfig();
    console.log("executed");
  };

  async function deleteVnetConfig() {
    try {
      if (selectedVnet) {
        await deleteVnetById(userLoginStatus, selectedVnet.id);
        removeVnetById(selectedVnet.id);
        console.log("VNET Deleted successfully.");
        setDeleteSuccessPopup(true);
      } else {
        console.error("No VNET selected.");
      }
    } catch (error) {
      console.error("Failed to delete VNET config:", error);
    }
  }

  const handleDeleteVnetClick = () => {
    deleteVnetConfig();
    console.log("executed");
  };

  return (
    <div className="flex sm:flex-col pt-10 font-montserrat xl:space-x-10 xl:flex-row">
      <div className="flex-start font-extrabold text-2xl">
        Network configuration:
      </div>
      <div
        className="flex flex-1 flex-row justify-end space-x-4"
        id="vnetconfig"
      >
        <button
          className="inline-flex items-center justify-center pr-4 pl-4 h-10 text-slate-50 transition-colors duration-150 bg-red-500 rounded-lg focus:shadow-outline hover:bg-orange-600"
          onClick={handleDeleteVnetClick}
        >
          <span className="text-l">Delete</span>
        </button>
        <button
          className="inline-flex items-center justify-center pr-4 pl-4 h-10 text-slate-50 transition-colors duration-150 bg-sky-800 rounded-lg focus:shadow-outline hover:bg-orange-600"
          onClick={handleSaveVnetClick}
        >
          <span className="text-l">Save</span>
        </button>
      </div>
      {showSaveSuccessPopup && (
        <SuccessPopup
          message="Your VNET configuration has been saved successfully!"
          onClose={() => setSaveSuccessPopup(false)}
        />
      )}
      {showDeleteSuccessPopup && (
        <SuccessPopup
          message="Your VNET configuration has been deleted successfully!"
          onClose={() => setDeleteSuccessPopup(false)}
        />
      )}
    </div>
  );
}

export default TableControl;
