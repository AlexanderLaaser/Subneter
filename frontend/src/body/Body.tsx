import IpInput from "./IpInput";
import Tab from "./Tab";
import React from "react";
import IpStartContext from "../context/IpStartContext";

const startIp = "10.0.0.0";

function Body() {
  const [ip, setIp] = React.useState(startIp);

  const value = {
    startIp: ip,
    setStartIp: setIp,
  };

  return (
    <IpStartContext.Provider value={value}>
      <div className="bg-blue-100 h-screen ">
        <IpInput></IpInput>
        <Tab></Tab>
      </div>
    </IpStartContext.Provider>
  );
}

export default Body;
