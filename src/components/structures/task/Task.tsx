import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { api } from "@/apis";
import { CreateTaskRequestDto, TaskDto, TaskProgressValue } from "@/apis/types";
import { useMutation } from "@tanstack/react-query";

import TaskActions from "./TaskActions";
import TaskDate from "./TaskDate";
import TaskDone from "./TaskDone";
import { TaskProgress } from "./TaskProgress";

type Props = {
  dto: TaskDto;
};

const Task = (props: Props) => {
  const { dto } = props;
  const [taskName, setTaskName] = useState(dto.name);
  const [showDatePicker, setShowDatePicker] = useState(!!dto.dueAt);
  const [isDone, setDone] = useState(false);
  const [selectedProgressValue, setSelectedProgressValue] =
    useState<TaskProgressValue>(dto.progress);
  const [dueDate, setDueDate] = useState<number | undefined>(dto.dueAt);

  const [isTyping, setIsTyping] = useState(false);
  const { mutate: updateTask } = useMutation({
    mutationKey: ["updateTask"],
    mutationFn: (body: Partial<CreateTaskRequestDto>) => {
      return api.task.update(dto.id, body);
    },
  });

  useEffect(() => {
    if (!showDatePicker) {
      setDueDate(undefined);
    }
  }, [showDatePicker]);

  // useEffect(() => {
  //   if (selectedStatusValue !== dto.status) {
  //     const updateTaskRequest: Partial<CreateTaskRequestDto> = {
  //       status: selectedStatusValue,
  //     };
  //     updateTask(updateTaskRequest);
  //   }
  // }, [dto.status, selectedStatusValue, updateTask]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
        if (taskName !== dto.name) {
          const updateTaskRequest: Partial<CreateTaskRequestDto> = {
            name: taskName,
          };
          updateTask(updateTaskRequest);
        }
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [taskName, isTyping, dto.name, updateTask]);

  const handleTaskNameChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTaskName(event.target.value);
    setIsTyping(true);
  };

  return (
    <div className="flex flex-row gap-4 justify-between h-fit p-4 ">
      <TaskDone
        isDone={isDone}
        setDone={setDone}
      />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row justify-between">
          <TextareaAutosize
            rows={1}
            maxRows={5}
            className="w-[75%] resize-none bg-transparent"
            value={taskName}
            onChange={handleTaskNameChange}
          />
          <div className="flex">
            {!isDone && (
              <TaskProgress
                selectedProgressValue={selectedProgressValue}
                setSelectedProgressValue={setSelectedProgressValue}
              />
            )}
            <TaskActions
              taskId={dto.id}
              showDatePicker={showDatePicker}
              setShowDatePicker={setShowDatePicker}
            />
          </div>
        </div>
        <div className="flex justify-end text-sm">
          <TaskDate
            show={showDatePicker}
            dueAt={dueDate}
            setDueAt={setDueDate}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
