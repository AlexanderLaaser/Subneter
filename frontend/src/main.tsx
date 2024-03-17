import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./header/Header";
import Body from "./body/Body";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <header id="header">
      <Header />
    </header>
    <main id="body">
      <Body />
    </main>
  </React.StrictMode>
);
