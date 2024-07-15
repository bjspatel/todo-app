import { createBrowserRouter } from "react-router-dom";

import { Tasks, Login, NotFound, Register } from "../pages";
import PrivateRoute from "./PrivateRoute";
import Profile from "@/pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Tasks />
      </PrivateRoute>
    ),
  },
  {
    path: "profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
