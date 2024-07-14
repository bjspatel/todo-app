import { ArrowUpCircle, PlusCircle, XCircle } from "lucide-react";
import { useState } from "react";

import { api } from "@/apis";
import { CreateTaskRequestDto } from "@/apis/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { StatusValue } from "./StatusDropdown";
import { TaskProgress } from "./TaskProgress";

const NewTask = () => {
  const [isNew, setIsNew] = useState(false);
  const [name, setName] = useState("");
  const [status] = useState<StatusValue>("to-do");

  const queryclient = useQueryClient();
  const { mutate: createTask } = useMutation({
    mutationKey: ["createTask"],
    mutationFn: () => {
      const createTaskRequest: CreateTaskRequestDto = {
        name: name,
        status: status,
      };
      return api.task.create(createTaskRequest);
    },
  });

  return !isNew ? (
    <div className="w-full flex justify-center">
      <PlusCircle onClick={() => setIsNew(true)} />
    </div>
  ) : (
    <div className="flex flex-col gap-2">
      <div className="w-full flex justify-between gap-2">
        <input
          className="w-full p-4"
          autoFocus={true}
          onChange={e => setName(e.target.value)}
          type="text"
          placeholder="Task name"
        />
        <TaskProgress
          selectedProgressValue="0"
          setSelectedProgressValue={() => {}}
        />
      </div>
      <div className="flex flex-row gap-2">
        <button
          onClick={async () => {
            await createTask();
            queryclient.invalidateQueries({
              queryKey: ["tasks"],
            });
            setIsNew(false);
          }}
        >
          <ArrowUpCircle className="w-6 h-6 stroke-primary" />
        </button>
        <button onClick={() => setIsNew(false)}>
          <XCircle className="w-6 h-6 stroke-orange-600" />
        </button>
      </div>
    </div>
  );
};

export default NewTask;
