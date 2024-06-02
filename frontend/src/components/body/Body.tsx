import Slogan from "./Slogan";
import VnetInput from "./VnetInput";
import Table from "./table/Table";
import HistorySidebar from "./HistorySidebar";
import { useUserStore } from "../../store/UserStore";

function Body() {
  const { userLoginStatus } = useUserStore();
  return (
    <div>
      {userLoginStatus ? null : <Slogan />}

      <div className="flex">
        <div className="">{userLoginStatus ? <HistorySidebar /> : null}</div>

        <div className="flex flex-1 justify-center">
          <div className="max-w-screen-md">
            <VnetInput />
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
