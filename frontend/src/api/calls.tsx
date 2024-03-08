import axios from "axios";

export const getIpAddressAmountForSuffix = async (suffix: string) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_SERVER_URL
      }/api/count_ipaddresses?subnet_mask=${suffix}`
    );
    return response.data;
  } catch (error) {
    console.error("Fehler beim API-Call", error);
  }
};

export const getStartAndEndIp = async (
  ip: string,
  suffix: string,
  isValid?: boolean
) => {
  if (isValid) {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_SERVER_URL
        }/api/address_space?ip=${ip}&subnet_mask=${suffix}`
      );
      return response.data;
    } catch (error) {
      console.error("Fehler beim API-Call", error);
    }
  } else {
    return "";
  }
};
