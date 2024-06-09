import iSubnet from "./iSubnet";

export default interface iVnet {
  id: number;
  name: string;
  networkaddress: string;
  subnetmask: number;
  subnets: iSubnet[];
}
