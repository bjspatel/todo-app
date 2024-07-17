import { useReducer } from "react";

import { TaskDto, TaskProgressValue } from "@/apis/types";

export interface TaskListState {
  taskList: TaskDto[];
  filteredTaskList: TaskDto[];
  filters: {
    isDone: boolean | undefined;
    progressList: TaskProgressValue[];
  };
}

export interface TaskListActionPayload {
  taskList?: TaskDto[];
  filters?: {
    isDone: boolean | undefined;
    progressList: TaskProgressValue[];
  };
}

export interface TaskListAction {
  type: "set_task_list" | "apply_filters" | "clear_filters";
  payload?: TaskListActionPayload;
}

function applyFilters(
  taskList: TaskDto[],
  filters: {
    isDone: boolean | undefined;
    progressList: TaskProgressValue[];
  }
): TaskDto[] {
  let filteredTasks = taskList;
  if (typeof filters.isDone === "boolean") {
    filteredTasks = filteredTasks.filter(
      task => task.isDone === filters.isDone
    );
  }
  if (filters.progressList.length > 0) {
    filteredTasks = filteredTasks.filter(task =>
      filters.progressList.includes(task.progress)
    );
  }
  return filteredTasks;
}

function reducer(
  prevState: TaskListState,
  action: TaskListAction
): TaskListState {
  const newState = { ...prevState };
  switch (action.type) {
    case "set_task_list":
      newState.taskList =
        (action.payload ? action.payload.taskList : prevState.taskList) || [];
      newState.filteredTaskList = applyFilters(
        newState.taskList,
        newState.filters
      );
      return newState;
    case "apply_filters":
      if (!action.payload?.filters) return prevState;
      newState.filters = action.payload.filters;
      newState.filteredTaskList = applyFilters(
        newState.taskList,
        newState.filters
      );
      return newState;
    case "clear_filters":
      newState.filters = {
        isDone: undefined,
        progressList: [],
      };
      newState.filteredTaskList = newState.taskList;
      return newState;
    default:
      return prevState;
  }
}

export const useFilter = (taskList: TaskDto[]) => {
  const [taskListState, updateTaskListState] = useReducer(reducer, {
    taskList,
    filteredTaskList: taskList,
    filters: {
      isDone: undefined,
      progressList: [],
    },
  });

  return {
    taskListState,
    updateTaskListState,
  };
};
