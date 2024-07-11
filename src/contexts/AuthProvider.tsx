import { useCallback, useEffect, useState, PropsWithChildren } from "react";

import { api } from "../apis";
import { LoginRequestDto } from "../apis/types";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState("");
  const [userId, setUserId] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback(async (requestDto: LoginRequestDto) => {
    try {
      const { accessToken, userId } = await api.auth.login(requestDto);
      setAccessToken(accessToken);
      setUserId(userId);
      setIsAuthenticated(true);
    } catch (error) {
      setAccessToken("");
      setUserId("");
      setIsAuthenticated(false);
      throw new Error("Unauthorized");
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.auth.logout();
    } finally {
      setAccessToken("");
      setUserId("");
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        // load access-token on first render
        setIsLoading(true);
        const { accessToken, userId } = await api.auth.refreshAccessToken();
        setAccessToken(accessToken);
        setUserId(userId);
        setIsAuthenticated(true);
      } catch {
        setAccessToken("");
        setUserId("");
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <AuthContext.Provider
      value={{ login, logout, userId, accessToken, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
