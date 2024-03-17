import axios from "axios";

export const getAddressSpace = async (
  ipaddress_cidr: string,
  isValid?: boolean
) => {
  if (isValid) {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_SERVER_URL
        }/api/address_space?ipaddress_cidr=${ipaddress_cidr}`
      );
      return response.data;
    } catch (error) {
      console.error("Fehler beim API-Call", error);
    }
  } else {
    return "";
  }
};

export const getIpaddressesCount = async (suffix: number) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_SERVER_URL
      }/api/count_ipaddresses?subnet_mask=${suffix}`
    );
    return response.data.count.toString();
  } catch (error) {
    console.error("Fehler beim API-Call", error);
  }
};

export const generateNextSubnet = async (
  ipaddress_cidr: string,
  new_suffix_length: number,
  last_ip_ranges_used: string[]
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_SERVER_URL}/api/generate_next_subnet`,
      {
        ipaddress_cidr,
        new_suffix_length,
        last_ip_ranges_used,
      }
    );

    if ((response.status = 200)) {
      return response.data.nextSubnetRange.toString();
    } else {
      throw new Error("Failed to fetch data!");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 400) {
        throw new Error("Inputs invalid. Please check again!");
      } else if (error.response.status === 500) {
        throw new Error("Size doesn't match vnet range!");
      }
    } else {
      throw new Error("Network error!");
    }
  }
};
