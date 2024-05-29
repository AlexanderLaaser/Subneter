import Slogan from "./Slogan";
import VnetInput from "./VnetInput";
import Table from "./table/Table";
import Sidebar from "./Sidebar";
import { useUserStore } from "../../store/UserStore";

function Body() {
  const { userLoginStatus } = useUserStore();
  return (
    <div>
      {userLoginStatus ? null : <Slogan />}

      <div className="flex">
        <div className="flex-1">{userLoginStatus ? <Sidebar /> : null}</div>

        <div className="">
          <VnetInput />
          <Table />
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
}

export default Body;
