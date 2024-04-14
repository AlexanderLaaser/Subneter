import VnetInput from "./VnetInput";
import Table from "./Table";
import Header from "../header/Header";

function Body() {
  return (
    <div className="h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <Header />
      <VnetInput></VnetInput>
      <Table></Table>
    </div>
  );
}

export default Body;
