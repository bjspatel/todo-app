import { Loader2 } from "lucide-react";

import { api } from "@/apis";
import { useQuery } from "@tanstack/react-query";

import { Separator } from "../../ui/separator";
import Task from "./Task";
import Filter from "./Filter";

const TaskList = () => {
  const { data: taskDtos, isLoading } = useQuery({
    queryKey: ["tasks-list"],
    queryFn: api.task.list,
  });
  const tasks = taskDtos?.map(taskDto => (
    <>
      <Task
        key={taskDto.id}
        dto={taskDto}
      />
      <Separator
        key={`sep-${taskDto.id}`}
        orientation="horizontal"
      />
    </>
  ));
  return isLoading ? (
    <div className="w-full p-10 flex justify-center">
      <Loader2 className="animate-spin h-10 w-10" />
    </div>
  ) : (
    <>
      <div
        key="header-line"
        className="fixed t-0 lg:w-[480px] w-full bg-slate-500 shadow-lg"
      >
        <Filter />
      </div>
      <div className="flex flex-col gap-2 mt-8 w-full overflow-y-auto">
        {tasks}
      </div>
    </>
  );
};

export default TaskList;
