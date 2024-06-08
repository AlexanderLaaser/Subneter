import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  //<React.StrictMode>
  <BrowserRouter>
    <main id="body">
      <Main />
    </main>
  </BrowserRouter>
  //</React.StrictMode>
);
