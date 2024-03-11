import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IpAddressCidrState {
  used_ipaddresses_cidr: string[];
  addIpAddressCidr: (cidr: string) => void;
  removeIpAddressCidr: (cidr: string) => void;
}

const usedIpAddressCidrStore = create<IpAddressCidrState>()(
  devtools(
    persist(
      (set) => ({
        used_ipaddresses_cidr: ["10.0.0.0/27"],
        addIpAddressCidr: (cidr) =>
          set((state) => ({
            used_ipaddresses_cidr: [...state.used_ipaddresses_cidr, cidr],
          })),
        removeIpAddressCidr: (cidr) =>
          set((state) => ({
            used_ipaddresses_cidr: state.used_ipaddresses_cidr.filter(
              (c) => c !== cidr
            ),
          })),
      }),
      {
        name: "ipaddress-cidr-storage",
      }
    )
  )
);

export default usedIpAddressCidrStore;
