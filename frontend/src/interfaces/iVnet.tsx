import iAddressSpace from "./iAddressSpace";
import iSubnet from "./iSubnet";

export default interface iVnet {
  id: number;
  name: string;
  addressspaces: iAddressSpace[];
  subnets: iSubnet[];
  isStored?: boolean;
}
