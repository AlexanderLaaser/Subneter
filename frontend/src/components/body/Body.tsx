import VnetInput from "./VnetInput";
import Table from "./Table";
import Header from "../header/Header";
import Slogan from "./Slogan";
import Footer from "../footer/Footer";
import "../../styles/index.css";

function Body() {
  return (
    <div>
      <Header />
      <Slogan />
      <VnetInput></VnetInput>
      <Table></Table>
      <Footer></Footer>
    </div>
  );
}

export default Body;
