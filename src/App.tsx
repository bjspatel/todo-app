import "./App.css";

import React from "react";
import { RouterProvider } from "react-router-dom";

import { routes } from "./router/routes";

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={routes} />
    </React.StrictMode>
  );
}

export default App;
