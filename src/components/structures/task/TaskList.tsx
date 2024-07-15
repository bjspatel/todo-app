import { api } from "@/apis";
import { useQuery } from "@tanstack/react-query";

import { Separator } from "../../ui/separator";
import Task from "./Task";

const TaskList = () => {
  const { data: taskDtos, isLoading } = useQuery({
    queryKey: ["tasks"],
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
  // const newTask = <NewTask key="new" />;
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col space-around lg:w-[480px] w-[360px] h-full self-center">
      <div className="flex flex-col gap-2 lg:w-[480px] w-[360px] self-center overflow-y-auto">
        {tasks}
      </div>
      {/* <div>{newTask}</div> */}
    </div>
  );
};

export default TaskList;
