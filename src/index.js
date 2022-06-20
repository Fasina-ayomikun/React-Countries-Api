import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./index.css";
import App from "./App";
import CountryProvider from "./context/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CountryProvider>
    <App />
  </CountryProvider>
);
