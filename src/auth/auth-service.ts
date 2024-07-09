import { api } from "../apis";
import { LoginRequestDto } from "../apis/types";

const AuthStatus = {
  isAuthenticated: false,
  accessToken: "",
};

export const AuthService = {
  login: async (requestDto: LoginRequestDto): Promise<void> => {
    try {
      AuthStatus.accessToken = await api.auth.login(requestDto);
      AuthStatus.isAuthenticated = true;
    } catch (error) {
      AuthStatus.accessToken = "";
      AuthStatus.isAuthenticated = false;
      throw new Error("Unauthorized");
    }
  },

  logout: async (): Promise<void> => {
    try {
      await api.auth.logout();
    } finally {
      AuthStatus.accessToken = "";
      AuthStatus.isAuthenticated = false;
    }
  },

  loadAuthStatus: async () => {
    try {
      AuthStatus.accessToken = await api.auth.refreshAccessToken();
      AuthStatus.isAuthenticated = true;
    } catch {
      AuthStatus.accessToken = "";
      AuthStatus.isAuthenticated = false;
    }
  },

  isAuthenticated: (): boolean => {
    return AuthStatus.isAuthenticated;
  },
};
