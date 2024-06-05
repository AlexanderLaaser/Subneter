import Slogan from "./Slogan";
import VnetInput from "./VnetInput";
import Tab from "./table/Tab";
import HistorySidebar from "./NetworkSidebar";
import { useUserStore } from "../../store/UserStore";
import TableControl from "./TableControl";

function Body() {
  const { userLoginStatus } = useUserStore();

  return (
    <div>
      {userLoginStatus ? null : <Slogan />}

      <div className="flex">
        <div className="">{userLoginStatus ? <HistorySidebar /> : null}</div>

        <div className="flex flex-1 justify-center">
          <div className="w-3/4 max-w-screen-lg">
            {userLoginStatus ? <TableControl /> : null}
            <VnetInput />
            <Tab />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
