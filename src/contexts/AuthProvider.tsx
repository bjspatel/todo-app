import { useCallback, useEffect, useState, PropsWithChildren } from "react";

import { api } from "../apis";
import { LoginRequestDto, UserDto } from "../apis/types";
import AuthContext from "./AuthContext";
import { TokenManager } from "./TokenManager";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback(async (requestDto: LoginRequestDto) => {
    try {
      const { accessToken, user } = await api.auth.login(requestDto);
      TokenManager.setAccessToken(accessToken);
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      TokenManager.setAccessToken("");
      setIsAuthenticated(false);
      throw new Error("Unauthorized");
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.auth.logout();
    } finally {
      TokenManager.setAccessToken("");
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        // load access-token on first render
        setIsLoading(true);
        const { accessToken, user } = await api.auth.refreshAccessToken();
        TokenManager.setAccessToken(accessToken);
        setUser(user);
        setIsAuthenticated(true);
      } catch {
        TokenManager.setAccessToken("");
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <AuthContext.Provider value={{ login, logout, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
