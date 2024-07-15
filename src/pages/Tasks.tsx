import { NavBar } from "@/components/structures/NavBar";
import NewTask from "@/components/structures/task/NewTask";
import TaskList from "@/components/structures/task/TaskList";

export const Tasks = () => {
  // const authContext = useAuth();
  // const navigate = useNavigate();
  return (
    <div className="flex flex-row w-full justify-center">
      <NavBar />
      <div className="flex min-h-screen flex-col bg-muted lg:w-[480px] w-[360px] self-center">
        <TaskList />
      </div>
      <NewTask />
      {/* <Button
        className="w-24"
        onClick={async () => {
          await authContext.logout();
          navigate("/login");
        }}
      >
        Logout
      </Button> */}
    </div>
  );
};
