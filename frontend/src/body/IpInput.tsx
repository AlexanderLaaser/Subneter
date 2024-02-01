import { useState } from "react";
import axios from "axios";

function IpInput() {
  const [ip, setIp] = useState("");
  const [subnet_mask, setSubnetMask] = useState("21");
  const [isValid, setIsValid] = useState(false);
  const [address_space, setAddressSpace] = useState("");

  //function for validating the entered ip
  const validateIP = (ip: string) => {
    const regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
  };

  //function that handles the api calls
  const handleSubmit = async () => {
    if (isValid && ip) {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_SERVER_URL
          }/api/address_space?ip=${ip}&subnet_mask=${subnet_mask}`
        );
        setAddressSpace(response.data);
      } catch (error) {
        console.error("Fehler beim API-Call", error);
      }
    } else {
      setAddressSpace("");
    }
  };

  //function that sets the ip and the validState
  const handleIpInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIp = (e.target as HTMLInputElement).value;
    setIp(newIp);
    console.log("Neu Ip" + newIp);
    setIsValid(validateIP(newIp));
    handleSubmit();
  };

  return (
    <>
      <div className="flex w-full items-center justify-center font-montserrat">
        <div className="pt-14">
          <div className="flex items-center justify-center">
            <div className="mr-2">
              <input
                id="ip_adress"
                type="text"
                placeholder="Starting ip address"
                defaultValue="10.0.0.0"
                className="text-sm sm:text-base relative border rounded placeholder-gray-400 focus:border-orange-600 focus:outline-none pl-4 pr-20 border-zinc-950 h-10"
                onChange={handleIpInput}
              ></input>
              <div className="text-blue-700 font-bold text-sm pt-2">
                {/* {address_space} */}
                255.255.255.255 - 255.255.255.255
              </div>
            </div>
            <div className="">
              <select
                id="ip_size_input"
                className=" text-sm sm:text-base outline-none border border-zinc-950 text-sm rounded focus:border-orange-600 pr-16 pl-4 h-10"
              >
                <option value="US">/21</option>
                <option value="CA">/22</option>
                <option value="FR">/23</option>
                <option value="DE">/24</option>
                <option value="DE">/25</option>
                <option value="DE">/26</option>
                <option value="DE">/27</option>
              </select>

              <div className="text-blue-700 font-bold text-sm pt-2">1024</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IpInput;
