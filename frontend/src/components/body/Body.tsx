import Slogan from "./Slogan";
import VnetInput from "./VnetInput";
import Table from "./table/Table";
import Sidebar from "./Sidebar";
import { useUserStore } from "../../store/UserStore";

function Body() {
  const { userLoginStatus } = useUserStore();
  return (
    <div>
      <Slogan />
      <VnetInput />
      <div className="flex">
        <div className="flex-1">{userLoginStatus ? <Sidebar /> : null}</div>

        <div className="">
          <Table />
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
}

export default Body;
