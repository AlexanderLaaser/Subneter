import { useState } from "react";
import axios from "axios";

function IpInput() {
  const [ip, setIp] = useState("");
  const [subnet_mask, setSubnetMask] = useState("");
  const [isValid, setIsValid] = useState(false);

  //function for validating the entered ip
  const validateIP = (ip: string) => {
    const regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
  };

  //function that sets the ip and the validState
  const handleIpInput = (e: { target: { value: any } }) => {
    const newIp = e.target.value;
    setIp(newIp);
    setIsValid(validateIP(newIp));
    console.log(ip);
    console.log(isValid);
  };

  //function that handles the api calls
  const handleSubmit = async () => {
    if (isValid && ip) {
      try {
        const response = await axios.get(
          `process.env.API_SERVER_URL/api/address_space?ip=${ip}&subnet_mask=${subnet_mask}`
        );
        console.log(response.data);
        // Weiterer Code für die Verarbeitung der Antwort
      } catch (error) {
        console.error("Fehler beim API-Call", error);
      }
    }
  };

  return (
    <>
      <div className="flex w-full items-center justify-center font-montserrat">
        <div className="pt-14">
          <div className="flex">
            <input
              id="ip_adress"
              type="text"
              placeholder="IP-Address"
              className="text-sm sm:text-base relative border-t-2 border-l-2 border-b-2 border-r rounded-l-lg placeholder-gray-400 focus:border-orange-600 focus:outline-none py-2 pr-8 pl-8 border-zinc-950"
              onKeyDown={handleIpInput}
            ></input>
            <select
              id="ip_size_input"
              className=" outline-none border-t-2 border-r-2 border-b-2 border-l border-zinc-950 text-sm rounded-r-lg focus:border-orange-600 p-2.5 "
            >
              <option value="US">/21</option>
              <option value="CA">/22</option>
              <option value="FR">/23</option>
              <option value="DE">/24</option>
              <option value="DE">/25</option>
              <option value="DE">/26</option>
              <option value="DE">/27</option>
            </select>
            <div className=" flex pl-2 items-center justify-center">
              <button className="inline-flex items-center justify-center w-6 h-6 mr-2 text-slate-50 transition-colors duration-150 bg-blue-700 rounded-lg focus:shadow-outline hover:bg-orange-600">
                <span className="text-2xl">+</span>
              </button>
            </div>
          </div>
          <div className="flex pt-4 justify-center items-center">
            <div className="">IP-address space:</div>
            <div className="pl-2 text-blue-700 font-bold text-xl">256</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IpInput;
