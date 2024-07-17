import { Loader2 } from "lucide-react";
import { useEffect } from "react";

import { api } from "@/apis";
import { useQuery } from "@tanstack/react-query";

import { Separator } from "../../ui/separator";
import FilterDialog from "./filter/FilterDialog";
import { useFilter } from "./filter/hooks/useFilter";
import Task from "./Task";
import FilterChips from "./filter/FilterChips";

const TaskList = () => {
  const { data: taskDtos, isLoading } = useQuery({
    queryKey: ["tasks-list"],
    queryFn: api.task.list,
  });
  const { taskListState, updateTaskListState } = useFilter(taskDtos || []);
  useEffect(() => {
    updateTaskListState({
      type: "set_task_list",
      payload: {
        taskList: taskDtos,
      },
    });
  }, [taskDtos, updateTaskListState]);

  const tasks = taskListState.filteredTaskList.map(taskDto => (
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
        className="fixed flex t-0 lg:w-[480px] w-full bg-slate-500 shadow-lg"
      >
        <FilterDialog
          taskListState={taskListState}
          updateTaskListState={updateTaskListState}
        />
        <FilterChips
          taskListState={taskListState}
          updateTaskListState={updateTaskListState}
        />
      </div>
      <div className="flex flex-col gap-2 mt-8 w-full overflow-y-auto">
        {tasks}
      </div>
    </>
  );
};

export default TaskList;
