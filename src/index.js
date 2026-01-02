import React from "react";
import ReactDOM from "react-dom/client";

import GasPriceController from "./controllers/GasPriceController";
import reportWebVitals from "./utils/reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GasPriceController />
  </React.StrictMode>
);

reportWebVitals();
