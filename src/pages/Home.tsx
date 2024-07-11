import { useNavigate } from "react-router-dom";

import { Button } from "../components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import TaskList from "../components/structures/TaskList";

export const Home = () => {
  const authContext = useAuth();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center align-center gap-4 w-fit">
      <h1>Home</h1>
      <TaskList />
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
