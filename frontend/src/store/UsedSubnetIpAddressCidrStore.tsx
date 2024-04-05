import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

interface IpAddressCidrStoreInterface {
  usedIpaddressesCidr: string[];
  addIpAddressCidr: (cidr: string, index?: number) => void;
  removeIpAddressCidr: (index: number) => void;
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
              usedIpaddressesCidr: [...state.usedIpaddressesCidr, cidr],
            };
          }
        }),
      removeIpAddressCidr: (index: number) =>
        set((state) => ({
          usedIpaddressesCidr: state.usedIpaddressesCidr.filter(
            (_ele, ind) => ind !== index
          ),
        })),
    }),
    {
      name: "ipaddress-cidr-storage",
    }
  )
);

export default usedIpAddressCidrStore;
