import { useState } from "react";
import { updateVnetById } from "../../api/persistenceCalls";
import { useSubnetStore } from "../../store/SubnetStore";
import { useUserStore } from "../../store/UserStore";
import { useVnetStore } from "../../store/VnetStore";
import SuccessPopup from "../header/elements/SuccessPopUp";

function TableControl() {
  const { userLoginStatus } = useUserStore();
  const { vnet } = useVnetStore();
  const { subnets } = useSubnetStore();

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const buildVnetConfig = () => {
    const vnetConfig = {
      id: vnet.id,
      name: vnet.name,
      networkaddress: vnet.networkAddress,
      subnetmask: vnet.subnetmask,
      subnets: subnets.map((subnet) => {
        const { id, isStored, ...rest } = subnet;
        if (!isStored) {
          return { ...rest };
        }
        return { id, ...rest };
      }),
    };

    console.log(vnetConfig);

    return vnetConfig;
  };

  async function storeVnetConfig() {
    const vnetConfig = buildVnetConfig();
    try {
      await updateVnetById(userLoginStatus, vnet.id, vnetConfig);
      console.log("VNET config stored successfully.");
      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Failed to store VNET config:", error);
    }
  }

  const handleAddVnetClick = () => {
    storeVnetConfig();
    console.log("executed");
  };

  return (
    <div className="flex sm:flex-col pt-10 font-montserrat xl:space-x-10 xl:flex-row">
      <div
        className="flex flex-1 flex-row justify-end space-x-4"
        id="vnetconfig"
      >
        <button className="inline-flex items-center justify-center pr-4 pl-4 h-10 text-slate-50 transition-colors duration-150 bg-red-500 rounded-lg focus:shadow-outline hover:bg-orange-600">
          <span className="text-l">Delete</span>
        </button>
        <button
          className="inline-flex items-center justify-center pr-4 pl-4 h-10 text-slate-50 transition-colors duration-150 bg-sky-800 rounded-lg focus:shadow-outline hover:bg-orange-600"
          onClick={handleAddVnetClick}
        >
          <span className="text-l">Save</span>
        </button>
      </div>
      {showSuccessPopup && (
        <SuccessPopup
          message="Your VNET configuration has been saved successfully!"
          onClose={() => setShowSuccessPopup(false)}
        />
      )}
    </div>
  );
}

export default TableControl;
