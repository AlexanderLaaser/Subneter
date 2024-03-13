import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

interface VnetIpaddressCidrStoreInterface {
  ipaddress_cidr: string;
  setIpAddressCidr: (ipaddress_cidr: string) => void;
}

const vnetIpaddressCidrStore = create<VnetIpaddressCidrStoreInterface>()(
  devtools(
    persist(
      (set) => ({
        ipaddress_cidr: "10.0.0.0/24",
        setIpAddressCidr: (ipaddress_cidr_param) =>
          set({ ipaddress_cidr: ipaddress_cidr_param }),
      }),
      {
        name: "ipaddress-cidr-storage",
      }
    )
  )
);

export default vnetIpaddressCidrStore;
