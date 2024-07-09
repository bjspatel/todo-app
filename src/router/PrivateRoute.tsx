import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { AuthService } from "../auth/auth-service";

const PrivateRoute = ({ children }: PropsWithChildren) => {
  return AuthService.isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
