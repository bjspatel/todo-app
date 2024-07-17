import { FilterIcon } from "lucide-react";
import { useState, Dispatch, useEffect } from "react";

import { TaskProgressValue } from "@/apis/types";
import { Button } from "@shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shadcn/dialog";

import FilterDone from "./FilterDone";
import FilterProgress from "./FilterProgress";
import { TaskListAction, TaskListState } from "./hooks/useFilter";

type Props = {
  taskListState: TaskListState;
  updateTaskListState: Dispatch<TaskListAction>;
};

const FilterDialog = (props: Props) => {
  const { taskListState, updateTaskListState } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDone, setIsDone] = useState(taskListState.filters.isDone);
  const [progressList, setProgressList] = useState<TaskProgressValue[]>(
    taskListState.filters.progressList
  );

  useEffect(() => {
    setIsDone(taskListState.filters.isDone);
    setProgressList(taskListState.filters.progressList);
  }, [taskListState.filters.isDone, taskListState.filters.progressList]);

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
    >
      <DialogTrigger asChild>
        <FilterIcon className="m-2 stroke-primary-foreground cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Filters</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-6 mx-8 my-16">
          <FilterDone
            isDone={isDone}
            setIsDone={setIsDone}
          />
          <FilterProgress
            progressList={progressList}
            setProgressList={setProgressList}
          />
        </div>
        <DialogFooter className="sm:justify-start">
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => {
                updateTaskListState({
                  type: "apply_filters",
                  payload: {
                    filters: {
                      isDone,
                      progressList,
                    },
                  },
                });
                setIsDialogOpen(false);
              }}
            >
              Apply
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsDone(taskListState.filters.isDone);
                setProgressList(taskListState.filters.progressList);
                updateTaskListState({ type: "clear_filters" });
                setIsDialogOpen(false);
              }}
            >
              Reset
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
