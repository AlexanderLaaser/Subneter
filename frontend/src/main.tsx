import React from "react";
import ReactDOM from "react-dom/client";
import Body from "./body/Body";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <main id="body">
      <Body />
    </main>
  </React.StrictMode>
);
