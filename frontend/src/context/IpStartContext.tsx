import React from "react";

interface IpStartContextType {
  startIp: string;
  setStartIp: (ip: string) => void;
}

const defaultIpValue: IpStartContextType = {
  startIp: "10.0.0.0",
  setStartIp: () => {},
};

const IpStartContext = React.createContext<IpStartContextType>(defaultIpValue);

export default IpStartContext;
