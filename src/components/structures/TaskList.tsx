import { api } from "@/apis";
import { useQuery } from "@tanstack/react-query";

import NewTask from "./NewTask";
import Task from "./Task";

const TaskList = () => {
  const { data: taskDtos, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: api.task.list,
  });
  const tasks = taskDtos?.map(taskDto => (
    <Task
      key={taskDto.id}
      dto={taskDto}
    />
  ));
  const newTask = <NewTask key="new" />;
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col gap-2 w-[480px] self-center">
      {tasks?.concat(newTask)}
    </div>
  );
};

export default TaskList;
