import { useEffect, useState, PropsWithChildren } from "react";

import { AuthService } from "./auth-service";

export const AuthLoader = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadAuthStatus = async () => {
      try {
        await AuthService.loadAuthStatus();
      } finally {
        setIsLoading(false);
      }
    };
    loadAuthStatus();
  }, []);
  return isLoading ? <div>Loading...</div> : <>{children}</>;
};
