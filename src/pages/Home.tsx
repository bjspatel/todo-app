import { useNavigate } from "react-router-dom";
import { AuthService } from "../auth/auth-service";
import { Button } from "../components/ui/button";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center align-center gap-4 w-fit">
      <h1>Home</h1>
      <Button
        onClick={async () => {
          await AuthService.logout();
          navigate("/login");
        }}
      >
        Logout
      </Button>
    </div>
  );
};
