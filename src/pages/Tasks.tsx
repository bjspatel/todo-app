import { NavBar } from "@/components/structures/NavBar";
import NewTask from "@/components/structures/task/NewTask";
import TaskList from "@/components/structures/task/TaskList";

export const Tasks = () => {
  return (
    <div className="flex flex-row w-full justify-center">
      <NavBar />
      <div className="flex min-h-screen flex-col bg-muted lg:w-[480px] w-full self-center">
        <TaskList />
      </div>
      <NewTask />
    </div>
  );
};
