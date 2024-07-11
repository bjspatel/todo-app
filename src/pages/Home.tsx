import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../contexts/AuthContext";
import { Button } from "../components/ui/button";

export const Home = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center align-center gap-4 w-fit">
      <h1>Home</h1>
      <Button
        onClick={async () => {
          await authContext.logout();
          navigate("/login");
        }}
      >
        Logout
      </Button>
    </div>
  );
};
