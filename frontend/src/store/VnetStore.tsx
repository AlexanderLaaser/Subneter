import { create } from "zustand";
import { compareVnetRangeWithSubnetRangeUsed } from "../api/calculatorCalls";
import iVnet from "../interfaces/iVnet";
import iSubnet from "../interfaces/iSubnet";
import iAddressSpace from "../interfaces/iAddressSpace";

interface iVnetStore {
  vnets: iVnet[];
  selectedVnetId: number | null;
  addVnet: (vnet: iVnet) => void;
  setSelectedVnet: (id: number) => void;
  getSelectedVnet: () => iVnet | null;
  updateVnet: (index: number, vnet: iVnet) => void;
  updateSelectedVnetName: (newName: string) => void;
  removeVnetByIndex: (index: number) => void;
  removeVnetById: (id: number) => void;
  clearVnets: () => void;

  // Subnet Operations
  addSubnet: (subnet: iSubnet) => void;
  deleteSubnet: (subnetId: number) => void;
  updateSubnet: (subnet: iSubnet) => void;
  deleteAllSubnets: () => void;
  getSubnets: () => iSubnet[];
  getSubnetsExcludingID: (id: number) => iSubnet[];
  setError: (id: number, error: string) => void;
  checkErrorInEntries: () => boolean;

  // AddressSpace Operations
  addAddressSpace: (addressSpace: iAddressSpace) => void;
  deleteAddressSpace: (addressSpaceId: number) => void;
  updateAddressSpace: (addressSpace: iAddressSpace) => void;
  getAddressSpaces: () => iAddressSpace[];

  // VNet Validation
  checkIfVnetSubnetMaskIsValid: (
    networkaddress: string,
    subnetmask: number
  ) => Promise<boolean>;
}

const vnetStore = create<iVnetStore>((set, get) => ({
  vnets: [],
  selectedVnetId: null,
  // VNet Operations
  addVnet: (vnet) => set((state) => ({ vnets: [...state.vnets, vnet] })),
  setSelectedVnet: (id) => set(() => ({ selectedVnetId: id })),
  getSelectedVnet: () => {
    const { selectedVnetId, vnets } = get();
    return vnets.find((vnet) => vnet.id === selectedVnetId) || null;
  },
  updateVnet: (index, vnet) =>
    set((state) => ({
      vnets: state.vnets.map((currentVnet, i) =>
        i === index ? vnet : currentVnet
      ),
    })),
  updateSelectedVnetName: (newName: string) => {
    const { selectedVnetId, vnets } = get();
    const updatedVnets = vnets.map((v) =>
      v.id === selectedVnetId ? { ...v, name: newName } : v
    );
    set(() => ({
      vnets: updatedVnets,
    }));
  },
  removeVnetByIndex: (index) =>
    set((state) => ({
      vnets: state.vnets.filter((_, i) => i !== index),
    })),
  removeVnetById: (id) =>
    set((state) => ({
      vnets: state.vnets.filter((vnet) => vnet.id !== id),
    })),
  clearVnets: () => set(() => ({ vnets: [] })),

  // Subnet Operations
  addSubnet: (subnet) =>
    set((state) => {
      const selectedVnet = state.vnets.find(
        (vnet) => vnet.id === state.selectedVnetId
      );
      if (selectedVnet) {
        selectedVnet.subnets.push(subnet);
      }
      return { vnets: [...state.vnets] };
    }),
  updateSubnet: (updatedSubnet) =>
    set((state) => {
      const selectedVnet = state.vnets.find(
        (vnet) => vnet.id === state.selectedVnetId
      );
      if (selectedVnet) {
        selectedVnet.subnets = selectedVnet.subnets.map((subnet) =>
          subnet.id === updatedSubnet.id
            ? { ...subnet, ...updatedSubnet }
            : subnet
        );
      }
      return { vnets: [...state.vnets] };
    }),
  deleteSubnet: (subnetId) => {
    const { selectedVnetId, vnets } = get();
    const updatedVnets = vnets.map((vnet) =>
      vnet.id === selectedVnetId
        ? {
            ...vnet,
            subnets: vnet.subnets.filter((subnet) => subnet.id !== subnetId),
          }
        : vnet
    );
    set(() => ({ vnets: updatedVnets }));
  },
  deleteAllSubnets: () => {
    const { selectedVnetId, vnets } = get();
    const updatedVnets = vnets.map((vnet) =>
      vnet.id === selectedVnetId ? { ...vnet, subnets: [] } : vnet
    );
    set(() => ({ vnets: updatedVnets }));
  },
  getSubnets: () => {
    const selectedVnet = get().getSelectedVnet();
    return selectedVnet ? selectedVnet.subnets : [];
  },
  getSubnetsExcludingID: (id) => {
    const selectedVnet = get().getSelectedVnet();
    return selectedVnet
      ? selectedVnet.subnets.filter((subnet) => subnet.id !== id)
      : [];
  },
  setError: (id, error) => {
    const { selectedVnetId, vnets } = get();
    const updatedVnets = vnets.map((vnet) =>
      vnet.id === selectedVnetId
        ? {
            ...vnet,
            subnets: vnet.subnets.map((subnet) =>
              subnet.id === id ? { ...subnet, error } : subnet
            ),
          }
        : vnet
    );
    set(() => ({ vnets: updatedVnets }));
  },
  checkErrorInEntries: () => {
    const selectedVnet = get().getSelectedVnet();
    return selectedVnet
      ? selectedVnet.subnets.some((subnet) => subnet.error !== "")
      : false;
  },

  // AddressSpace Operations
  addAddressSpace: (addressSpace) => {
    const { selectedVnetId, vnets } = get();
    const updatedVnets = vnets.map((vnet) =>
      vnet.id === selectedVnetId
        ? {
            ...vnet,
            addressspaces: [...vnet.addressspaces, addressSpace],
          }
        : vnet
    );
    set(() => ({ vnets: updatedVnets }));
  },
  deleteAddressSpace: (addressSpaceId) => {
    const { selectedVnetId, vnets } = get();
    const updatedVnets = vnets.map((vnet) =>
      vnet.id === selectedVnetId
        ? {
            ...vnet,
            addressspaces: vnet.addressspaces.filter(
              (addressSpace) => addressSpace.id !== addressSpaceId
            ),
          }
        : vnet
    );
    set(() => ({ vnets: updatedVnets }));
  },
  updateAddressSpace: (updatedAddressSpace) => {
    const { selectedVnetId, vnets } = get();
    const updatedVnets = vnets.map((vnet) =>
      vnet.id === selectedVnetId
        ? {
            ...vnet,
            addressspaces: vnet.addressspaces.map((addressSpace) =>
              addressSpace.id === updatedAddressSpace.id
                ? updatedAddressSpace
                : addressSpace
            ),
          }
        : vnet
    );
    set(() => ({ vnets: updatedVnets }));
  },
  getAddressSpaces: () => {
    const selectedVnet = get().getSelectedVnet();
    return selectedVnet ? selectedVnet.addressspaces : [];
  },

  // VNet Validation
  checkIfVnetSubnetMaskIsValid: async (
    networkAddress: string,
    subnetmask: number
  ) => {
    try {
      const selectedVnet = get().getSelectedVnet();
      if (!selectedVnet) return false;

      const usedRanges = get()
        .getSubnets()
        .map((entry) => {
          const firstIp = entry.range.split(" - ")[0];
          return `${firstIp}/${entry.subnetmask}`;
        });

      // Temporarily add the new subnet mask for validation
      const vnetCidrs = selectedVnet.addressspaces.map((addressSpace) =>
        addressSpace.networkaddress === networkAddress
          ? `${addressSpace.networkaddress}/${subnetmask}`
          : `${addressSpace.networkaddress}/${addressSpace.subnetmask}`
      );

      const isValid = await compareVnetRangeWithSubnetRangeUsed(
        vnetCidrs,
        usedRanges
      );

      console.log("Network validation API call result:", isValid);
      return isValid;
    } catch (error) {
      console.error("Error validating subnet mask:", error);
      return false; // Default to false on error
    }
  },
}));

export const useVnetStore = () => {
  const {
    vnets,
    selectedVnetId,
    addVnet,
    setSelectedVnet,
    getSelectedVnet,
    updateVnet,
    updateSelectedVnetName,
    removeVnetByIndex,
    removeVnetById,
    clearVnets,

    addSubnet,
    deleteSubnet,
    updateSubnet,
    deleteAllSubnets,
    getSubnets,
    getSubnetsExcludingID,
    setError,
    checkErrorInEntries,

    addAddressSpace,
    deleteAddressSpace,
    updateAddressSpace,
    getAddressSpaces,

    checkIfVnetSubnetMaskIsValid,
  } = vnetStore();

  return {
    vnets,
    selectedVnetId,
    addVnet,
    setSelectedVnet,
    getSelectedVnet,
    updateVnet,
    updateSelectedVnetName,
    removeVnetByIndex,
    removeVnetById,
    clearVnets,

    addSubnet,
    deleteSubnet,
    updateSubnet,
    deleteAllSubnets,
    getSubnets,
    getSubnetsExcludingID,
    setError,
    checkErrorInEntries,

    addAddressSpace,
    deleteAddressSpace,
    updateAddressSpace,
    getAddressSpaces,

    checkIfVnetSubnetMaskIsValid,
  };
};
