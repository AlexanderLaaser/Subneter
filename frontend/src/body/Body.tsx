import VnetInput from "./VnetInput";
import Table from "./Table";
import Header from "../header/Header";
import Slogan from "./Slogan";
import Footer from "../footer/footer";

function Body() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-sky-800 opacity-20 blur-[100px]"></div>
      <Header />
      <Slogan />
      <VnetInput></VnetInput>
      <Table></Table>
      <Footer></Footer>
    </div>
  );
}

export default Body;
