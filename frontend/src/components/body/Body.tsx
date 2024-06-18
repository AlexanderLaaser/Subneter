import Slogan from "./Slogan";
import VnetInput from "./VnetInput";
import Tab from "./table/Tab";
import NetworkSidebar from "./NetworkSidebar";
import { useUserStore } from "../../store/UserStore";
import TableControl from "./TableControl";
import Features from "./Features";
import Process from "./Process";

function Body() {
  const { userLoginStatus } = useUserStore();

  return (
    <div className="flex flex-row flex-1 font-sans">
      <div className=" flex-none pl-2 pb-2" id="Sidebar">
        {userLoginStatus ? <NetworkSidebar /> : null}
      </div>
      <div className="flex flex-1 justify-center items-start" id="Main">
        <div className="w-3/4 max-w-screen-lg">
          {userLoginStatus ? null : (
            <>
              <Slogan />
              <Process />
            </>
          )}
          {userLoginStatus ? <TableControl /> : null}
          <VnetInput />
          <Tab />
          {userLoginStatus ? null : <Features />}
        </div>
      </div>
    </div>
  );
}

export default Body;
