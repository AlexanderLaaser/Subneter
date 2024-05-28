import Header from "./header/Header";
import Footer from "./footer/Footer";
import "../styles/index.css";
import Body from "./body/Body";

function Page() {
  return (
    <div>
      <Header />
      <Body />
      <Footer></Footer>
    </div>
  );
}

export default Page;
