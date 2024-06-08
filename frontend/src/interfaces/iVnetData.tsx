export default interface VnetData {
  name: string;
  networkaddress: string;
  subnetmask: number;
  subnets: Array<{
    id?: number;
    name: string;
    subnetmask: number;
    ips: number;
    range: string;
  }>;
}
