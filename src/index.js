import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App.js'
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.js";
import { ContextProvider } from "./contexts/ContentProvider.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);
