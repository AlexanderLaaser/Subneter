export default interface iSubnet {
  id: number;
  name: string;
  subnetmask: number;
  ips: number;
  range: string;
  error?: string;
  isStored: boolean;
}
