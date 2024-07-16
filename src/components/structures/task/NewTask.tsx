import { ArrowUpCircle, PlusCircle, XCircle } from "lucide-react";
import { useState } from "react";

import { api } from "@/apis";
import { CreateTaskRequestDto, TaskProgressValue } from "@/apis/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import TaskDate from "./TaskDate";
import { TaskProgress } from "./TaskProgress";

const NewTask = () => {
  const [isNew, setIsNew] = useState(false);
  const [name, setName] = useState("");
  const [progress, setProgress] = useState<TaskProgressValue>(0);
  const [dueAt, setDueAt] = useState<number | undefined>();

  const queryclient = useQueryClient();
  const { mutate: createTask } = useMutation({
    mutationKey: ["create-task"],
    mutationFn: async () => {
      const createTaskRequest: CreateTaskRequestDto = {
        name,
        progress: progress,
        dueAt,
      };
      await api.task.create(createTaskRequest);
      queryclient.invalidateQueries({
        queryKey: ["tasks-list"],
      });
    },
  });

  return (
    <div className="fixed right-2 bottom-2 lg:w-[480px] w-[360px] self-end pointer-events-none">
      {!isNew ? (
        <div className="flex flex-row justify-end w-full">
          <PlusCircle
            className="h-16 w-16 fill-accent stroke-primary cursor-pointer pointer-events-auto"
            strokeWidth={1}
            onClick={() => setIsNew(true)}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-2 bg-accent shadow p-4 pointer-events-auto">
          <div className="w-full flex justify-between gap-4">
            <input
              className="w-full p-4 rounded"
              autoFocus={true}
              onChange={e => setName(e.target.value)}
              type="text"
              placeholder="Task name"
            />
            <TaskProgress
              selectedProgress={progress}
              setSelectedProgress={setProgress}
            />
          </div>
          <div className="w-full flex justify-between">
            <TaskDate
              dueAt={dueAt}
              setDueAt={setDueAt}
            />
            <div className="flex flex-row gap-2 justify-end">
              <button
                onClick={async () => {
                  await createTask();
                  setIsNew(false);
                  setProgress(0);
                  setName("");
                  setDueAt(undefined);
                }}
              >
                <ArrowUpCircle className="w-6 h-6 stroke-primary" />
              </button>
              <button onClick={() => setIsNew(false)}>
                <XCircle className="w-6 h-6 stroke-orange-600" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewTask;
