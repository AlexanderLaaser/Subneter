import Slogan from "./Slogan";
import VnetInput from "./VnetInput";
import Table from "./table/Table";
import HistorySidebar from "./HistorySidebar";
import { useUserStore } from "../../store/UserStore";
import UsageSidebar from "./UsageSidebar";

function Body() {
  const { userLoginStatus } = useUserStore();
  return (
    <div>
      {userLoginStatus ? null : <Slogan />}

      <div className="flex">
        <div className="flex-1">
          {userLoginStatus ? <HistorySidebar /> : null}
        </div>

        <div className="">
          <VnetInput />
          <Table />
        </div>
        <div className="flex-1">
          <UsageSidebar />
        </div>
      </div>
    </div>
  );
}

export default Body;
