import { CheckCircle2, Circle, XIcon } from "lucide-react";
import { Dispatch } from "react";

import { Separator } from "@/components/ui/separator";

import { TaskProgressSpecList } from "../actions/TaskProgressSpecList";
import { TaskListAction, TaskListState } from "./hooks/useFilter";

type Props = {
  taskListState: TaskListState;
  updateTaskListState: Dispatch<TaskListAction>;
};

const FilterChips = (props: Props) => {
  const { taskListState } = props;
  const doneFilter = taskListState.filters.isDone;
  const hasFilters =
    doneFilter !== undefined || taskListState.filters.progressList.length > 0;
  if (!hasFilters) return <></>;
  const doneChip =
    doneFilter !== undefined ? (
      <div className="flex gap-1 h-6 w-12 items-center px-1 bg-primary-foreground rounded-lg border-[1px]">
        {doneFilter ? (
          <CheckCircle2 className="h-4 w-4 stroke-green-500 stroke-2" />
        ) : (
          <Circle className="h-4 w-4" />
        )}
        <XIcon
          className="h-4 w-4 cursor-pointer"
          onClick={() => {
            props.updateTaskListState({
              type: "apply_filters",
              payload: {
                filters: {
                  isDone: undefined,
                  progressList: taskListState.filters.progressList,
                },
              },
            });
          }}
        />
      </div>
    ) : (
      <></>
    );
  const progressFilter = taskListState.filters.progressList;
  const progressChips = progressFilter.map(progress => {
    const Spec = TaskProgressSpecList.find(spec => spec.value === progress);
    return Spec ? (
      <div
        key={progress}
        className="flex gap-1 h-6 w-12 items-center px-1 bg-primary-foreground rounded-lg border-[1px]"
      >
        <Spec.icon className="h-4 w-4 stroke-primary fill-primary" />
        <XIcon
          className="h-4 w-4 cursor-pointer"
          onClick={() => {
            props.updateTaskListState({
              type: "apply_filters",
              payload: {
                filters: {
                  isDone: taskListState.filters.isDone,
                  progressList: taskListState.filters.progressList.filter(
                    value => value !== progress
                  ),
                },
              },
            });
          }}
        />
      </div>
    ) : null;
  });
  return (
    <div className="flex gap-4 items-center">
      <Separator orientation="vertical" />
      {doneChip}
      {progressChips}
    </div>
  );
};

export default FilterChips;
