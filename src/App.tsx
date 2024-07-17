import "./App.css";

import React from "react";
import { RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AuthProvider from "./contexts/AuthProvider";
import { router } from "./router/routes";

const queryClient = new QueryClient();

function App() {
  return (
    // <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
    // </React.StrictMode>
  );
}

export default App;
