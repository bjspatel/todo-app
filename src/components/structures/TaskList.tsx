import { useQuery } from "@tanstack/react-query";

import { api } from "../../apis";
import { useAuth } from "../../contexts/AuthContext";

const TaskList = () => {
  const { userId } = useAuth();
  const { data: taskDtos, isLoading } = useQuery({
    queryKey: ["tasks", userId],
    queryFn: api.task.list,
  });
  const tasks = taskDtos?.map(taskDto => (
    <div key={taskDto.id}>{taskDto.name}</div>
  ));
  const newTask = <div key="new">New Task</div>;
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col gap-2">{tasks?.concat(newTask)}</div>
  );
};

export default TaskList;
