import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

interface IpAddressCidrState {
  ipaddress_cidr: string;
  setIpAddressCidr: (cidr: string) => void;
}

const useipaddressCidrStore = create<IpAddressCidrState>()(
  devtools(
    persist(
      (set) => ({
        ipaddress_cidr: "",
        setIpAddressCidr: (cidr) => set({ ipaddress_cidr: cidr }),
      }),
      {
        name: "ipaddress-cidr-storage",
      }
    )
  )
);

export default useipaddressCidrStore;
