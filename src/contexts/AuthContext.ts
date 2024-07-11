import { createContext } from "react";
import { LoginRequestDto } from "../apis/types";

const AuthContext = createContext({
  userId: "",
  accessToken: "",
  isAuthenticated: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: async (_: LoginRequestDto): Promise<void> => {},
  logout: async () => {},
});

export default AuthContext;
