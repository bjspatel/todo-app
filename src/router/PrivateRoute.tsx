import { useContext, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import AuthContext from "../contexts/AuthContext";

const PrivateRoute = ({ children }: PropsWithChildren) => {
  const authContext = useContext(AuthContext);
  return authContext.isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
