import "./App.css";

import React from "react";
import { RouterProvider } from "react-router-dom";

import { routes } from "./router/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
