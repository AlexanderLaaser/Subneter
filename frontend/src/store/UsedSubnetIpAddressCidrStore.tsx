import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

interface IpAddressCidrStoreInterface {
  used_ipaddresses_cidr: string[];
  addIpAddressCidr: (cidr: string, index: number) => void;
  removeIpAddressCidr: (cidr: string) => void;
}

const usedIpAddressCidrStore = create<IpAddressCidrStoreInterface>()(
  devtools(
    (set) => ({
      used_ipaddresses_cidr: ["10.0.0.0/27"],
      // Anpassung der addIpAddressCidr Funktion, um den Index als optionalen Parameter zu akzeptieren
      addIpAddressCidr: (cidr: string, index?: number) =>
        set((state) => {
          // Wenn ein Index angegeben wird, aktualisiere das Element an dieser Stelle
          if (
            typeof index === "number" &&
            index >= 0 &&
            index < state.used_ipaddresses_cidr.length
          ) {
            const updatedIpAddressesCidr = [...state.used_ipaddresses_cidr];
            updatedIpAddressesCidr[index] = cidr;
            return { used_ipaddresses_cidr: updatedIpAddressesCidr };
          } else {
            // Wenn kein Index angegeben wird, füge das CIDR am Ende der Liste hinzu
            return {
              used_ipaddresses_cidr: [...state.used_ipaddresses_cidr, cidr],
            };
          }
        }),
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
);

export default usedIpAddressCidrStore;
