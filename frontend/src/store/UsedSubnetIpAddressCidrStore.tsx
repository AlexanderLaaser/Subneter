import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

interface IpAddressCidrStoreInterface {
  usedIpaddressesCidr: string[];
  addIpAddressCidr: (cidr: string, index?: number) => void;
  removeIpAddressCidr: (cidr: string) => void;
}

const usedIpAddressCidrStore = create<IpAddressCidrStoreInterface>()(
  devtools(
    (set) => ({
      usedIpaddressesCidr: ["10.0.0.0/27"],
      addIpAddressCidr: (cidr: string, index?: number) =>
        set((state) => {
          if (
            typeof index === "number" &&
            index >= 0 &&
            index < state.usedIpaddressesCidr.length
          ) {
            const updatedIpAddressesCidr = [...state.usedIpaddressesCidr];
            updatedIpAddressesCidr[index] = cidr;
            return { usedIpaddressesCidr: updatedIpAddressesCidr };
          } else {
            return {
              used_ipaddresses_cidr: [...state.usedIpaddressesCidr, cidr],
            };
          }
        }),
      removeIpAddressCidr: (cidr) =>
        set((state) => ({
          usedIpaddressesCidr: state.usedIpaddressesCidr.filter(
            (c) => c !== cidr
          ),
        })),
    }),
    {
      name: "ipaddress-cidr-storage",
    }
  )
);

export default usedIpAddressCidrStore;
