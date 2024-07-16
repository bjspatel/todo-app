import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";

const Logout = () => {
  const authContext = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function logout() {
      await authContext.logout();
      navigate("/login");
    }
    logout();
  });

  return <></>;
};

export default Logout;
