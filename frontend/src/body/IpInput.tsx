import { useContext, useEffect, useState } from "react";
import IpStartContext from "../context/IpStartContext";
import { callSuffixInput, callIpInput } from "../api/calls";

function IpInput() {
  const [suffix, setSuffix] = useState("24");
  const [isValid, setIsValid] = useState(true);
  const [address_space, setAddressSpace] = useState("10.0.0.0-10.0.0.255");
  const [address_count, setAddressCount] = useState("256");
  const { startIp, setStartIp } = useContext(IpStartContext);

  //function for validating the entered ip
  const validateIP = (ip: string) => {
    const regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
  };

  //function that sets the ip and the validState
  const handleIpInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIp = (e.target as HTMLInputElement).value;
    setStartIp(newIp);
    updateIsValid(newIp);
  };

  const updateIsValid = (newip: string) => {
    setIsValid(validateIP(newip));
    return validateIP(newip);
  };

  useEffect(() => {
    const fetchAddressSpace = async () => {
      try {
        const addressSpace = await callIpInput(startIp, suffix, isValid);
        setAddressSpace(addressSpace);
      } catch (error) {
        console.error("Failed to fetch address space:", error);
      }
    };

    if (isValid) {
      fetchAddressSpace();
    }
  }, [startIp, suffix, isValid]);

  //function that sets the suffix
  const handleSuffix = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const suffix = (e.target as HTMLSelectElement).value;
    setSuffix(suffix);
    console.log("Suffix:" + suffix);
    setAddressCount(await callSuffixInput(suffix));
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
              {isValid ? (
                <div className="text-blue-700 font-bold text-sm pt-2">
                  {address_space}
                </div>
              ) : (
                <div className="text-red-500 font-bold text-sm pt-2">
                  Ungültige IP-Adresse
                </div>
              )}
            </div>
            <div className="">
              <select
                id="ip_size_input"
                className="sm:text-base outline-none border border-zinc-950 text-sm rounded focus:border-orange-600 pr-16 pl-4 h-10"
                onChange={handleSuffix}
                defaultValue="24"
              >
                <option value="14">/14</option>
                <option value="15">/15</option>
                <option value="16">/16</option>
                <option value="17">/17</option>
                <option value="18">/18</option>
                <option value="19">/19</option>
                <option value="20">/20</option>
                <option value="21">/21</option>
                <option value="22">/22</option>
                <option value="23">/23</option>
                <option value="24">/24</option>
                <option value="25">/25</option>
                <option value="26">/26</option>
                <option value="27">/27</option>
                <option value="28">/28</option>
                <option value="29">/29</option>
                <option value="30">/30</option>
                <option value="31">/31</option>
                <option value="32">/32</option>
              </select>

              <div className="text-blue-700 font-bold text-sm pt-2">
                {address_count}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IpInput;
