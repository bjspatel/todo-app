import "./App.css";

import React from "react";
import { RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthLoader } from "./auth/AuthLoader";
import { router } from "./router/routes";

const queryClient = new QueryClient();

function App() {
  return (
    <React.StrictMode>
      <AuthLoader>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthLoader>
    </React.StrictMode>
  );
}

export default App;
