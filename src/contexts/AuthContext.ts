import { createContext, useContext } from "react";
import { LoginRequestDto } from "../apis/types";

const AuthContext = createContext({
  userId: "",
  isAuthenticated: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: async (_: LoginRequestDto): Promise<void> => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
