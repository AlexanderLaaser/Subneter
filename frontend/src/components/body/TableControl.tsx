import { useState, useEffect } from "react";
import {
  createVnet,
  deleteVnetById,
  updateVnetById,
} from "../../api/persistenceCalls";
import { useUserStore } from "../../store/UserStore";
import { useVnetStore } from "../../store/VnetStore";
import iVnet from "../../interfaces/iVnet";
import ActionModals from "../elements/modals/NoFocusModal";

function TableControl() {
  const { userLoginStatus, setUnsavedChanges } = useUserStore();
  const { vnets, getSelectedVnet, setSelectedVnet, removeVnetById } =
    useVnetStore();

  const [showSaveSuccessPopup, setSaveSuccessPopup] = useState(false);
  const [showDeleteSuccessPopup, setDeleteSuccessPopup] = useState(false);
  const [showWarningPopup, setWarningPopup] = useState(false);

  const selectedVnet = getSelectedVnet();

  useEffect(() => {
    if (!selectedVnet && vnets.length > 0) {
      setSelectedVnet(vnets[0].id);
    }
  }, [vnets, selectedVnet, setSelectedVnet]);

  // Deleting the ID of subnets and addressspaces if isStored is false
  function cleanVnet(vnet: iVnet): iVnet {
    const { isStored, ...restVnet } = vnet;
    return {
      ...restVnet,
      id: isStored ? vnet.id : 0,
      addressspaces: vnet.addressspaces.map(({ isStored, id, ...rest }) =>
        isStored ? { ...rest, id } : rest
      ),
      subnets: vnet.subnets.map(({ isStored, error, id, ...rest }) =>
        isStored ? { ...rest, id } : rest
      ),
    };
  }

  async function saveVnetConfig() {
    try {
      if (
        selectedVnet.name !== "" &&
        selectedVnet.addressspaces[0].networkaddress !== "" &&
        selectedVnet.addressspaces[0].subnetmask !== 0 &&
        selectedVnet.subnets[0].name !== ""
      ) {
        const cleanedSelectedVnet = cleanVnet(selectedVnet);
        console.log(selectedVnet.name);
        console.log("cleanedSelectedVnet", cleanedSelectedVnet);

        if (selectedVnet?.isStored === true) {
          await updateVnetById(
            userLoginStatus,
            selectedVnet.id,
            cleanedSelectedVnet
          );
        } else {
          await createVnet(userLoginStatus, cleanedSelectedVnet);
        }
        setSaveSuccessPopup(true);
      } else {
        setWarningPopup(true);
      }
    } catch (error) {
      console.error("Failed to store VNET config:", error);
    }
  }

  const handleSaveVnetClick = () => {
    saveVnetConfig();
    setUnsavedChanges(false);
  };

  async function deleteVnetConfig() {
    try {
      if (selectedVnet) {
        if (selectedVnet.isStored) {
          await deleteVnetById(userLoginStatus, selectedVnet.id);
          removeVnetById(selectedVnet.id);
          setDeleteSuccessPopup(true);
        } else {
          removeVnetById(selectedVnet.id);
        }
        // Select the first VNET as the selected VNET
        const updatedVnets = vnets.filter(
          (vnet) => vnet.id !== selectedVnet.id
        );
        if (updatedVnets.length > 0) {
          setSelectedVnet(updatedVnets[0].id);
        } else {
          setSelectedVnet(0);
        }
      } else {
        console.error("No VNET selected.");
      }
    } catch (error) {
      console.error("Failed to delete VNET config:", error);
    }
  }

  const handleDeleteVnetClick = () => {
    deleteVnetConfig();
  };

  return (
    <div className="flex sm:flex-col pt-10  xl:space-x-10 xl:flex-row">
      <div className="flex-start font-extrabold text-2xl">
        <h2>Manage Subnets, Address Spaces and More: </h2>
      </div>
      <div
        className="flex flex-1 flex-row justify-end space-x-4"
        id="vnetconfig"
      >
        <button
          className={`inline-flex items-center justify-center pr-4 pl-4 h-10 text-slate-50 transition-colors duration-150 ${
            vnets.length === 1
              ? "bg-slate-300 cursor-not-allowed"
              : "bg-red-500 focus:shadow-outline hover:bg-orange-600"
          } rounded-lg`}
          onClick={handleDeleteVnetClick}
          disabled={vnets.length === 1}
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
        <ActionModals
          message="Your VNET configuration has been saved successfully!"
          type="success"
          onClose={() => setSaveSuccessPopup(false)}
        />
      )}
      {showDeleteSuccessPopup && (
        <ActionModals
          message="Your VNET configuration has been deleted successfully!"
          type="success"
          onClose={() => setSaveSuccessPopup(false)}
        />
      )}
      {showWarningPopup && (
        <ActionModals
          message="Please fill in the required fields before saving the VNET configuration!"
          type="warning"
          onClose={() => setWarningPopup(false)}
        />
      )}
    </div>
  );
}

export default TableControl;
