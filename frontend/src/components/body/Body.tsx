import Slogan from "./Slogan";
import VnetInput from "./VnetInput";
import Tab from "./table/Tab";
import NetworkSidebar from "./NetworkSidebar";
import { useUserStore } from "../../store/UserStore";
import TableControl from "./TableControl";

function Body() {
  const { userLoginStatus } = useUserStore();

  return (
    <div className="flex flex-row flex-1">
      <div className=" flex-none bg-gray-200" id="Sidebar">
        {userLoginStatus ? <NetworkSidebar /> : null}
      </div>
      <div className="flex flex-1 justify-center items-start" id="Main">
        <div className="w-3/4 max-w-screen-lg">
          {userLoginStatus ? null : <Slogan />}
          {userLoginStatus ? <TableControl /> : null}
          <VnetInput />
          <Tab />
        </div>
      </div>
    </div>
  );
}

export default Body;
