import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children }: PropsWithChildren) => {
  const authContext = useAuth();
  return authContext.isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
