import { useNavigate } from "react-router-dom";

import TaskList from "@/components/structures/TaskList";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@shadcn/button";

export const Home = () => {
  const authContext = useAuth();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center align-center gap-4 w-full">
      <h1>Home</h1>
      <TaskList />
      <Button
        className="w-24"
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
