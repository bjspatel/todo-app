import { createBrowserRouter } from "react-router-dom";

import { ComingSoon } from "@/pages/ComingSoon";
import Profile from "@/pages/Profile";

import { Login, NotFound, Register, Tasks } from "../pages";
import PrivateRoute from "./PrivateRoute";
import Logout from "@/pages/Logout";

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
    path: "calendar",
    element: <ComingSoon />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "logout",
    element: <Logout />,
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
