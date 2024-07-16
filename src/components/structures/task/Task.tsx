import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { api } from "@/apis";
import { TaskDto, TaskProgressValue, UpdateTaskRequestDto } from "@/apis/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import TaskActions from "./TaskActions";
import TaskDate from "./TaskDate";
import TaskDone from "./TaskDone";
import { TaskProgress } from "./TaskProgress";

type Props = {
  dto: TaskDto;
};

const Task = (props: Props) => {
  const { dto } = props;
  const [name, setName] = useState(dto.name);
  const [isDone, setIsDone] = useState(dto.isDone);
  const [progress, setProgress] = useState<TaskProgressValue>(dto.progress);
  const [showDatePicker, setShowDatePicker] = useState(!!dto.dueAt);
  const [dueAt, setDueAt] = useState<number | undefined>(dto.dueAt);
  const queryClient = useQueryClient();

  const [isTyping, setIsTyping] = useState(false);
  const { mutate: updateTask } = useMutation({
    mutationKey: ["updateTask"],
    mutationFn: async (body: UpdateTaskRequestDto) => {
      await api.task.update(dto.id, body);
      queryClient.invalidateQueries({
        queryKey: ["tasks-list"],
      });
    },
  });

  useEffect(() => {
    if (!showDatePicker) {
      setDueAt(undefined);
    }
  }, [showDatePicker]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
        if (name !== dto.name) {
          updateTask({ name });
        }
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [name, isTyping, dto.name, updateTask]);

  useEffect(() => {
    if (isDone !== dto.isDone) {
      setProgress(isDone ? 100 : 0);
      updateTask({ isDone });
    }
  }, [isDone, dto.isDone, updateTask]);

  useEffect(() => {
    if (progress !== dto.progress) {
      updateTask({ progress });
    }
  }, [progress, dto.progress, updateTask]);

  useEffect(() => {
    if (dueAt !== dto.dueAt) {
      updateTask({ dueAt });
    }
  }, [dueAt, dto.dueAt, updateTask]);

  const handleTaskNameChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setName(event.target.value);
    setIsTyping(true);
  };

  return (
    <div className="flex flex-row gap-4 justify-between h-fit p-4 ">
      <TaskDone
        isDone={isDone}
        setDone={setIsDone}
      />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row justify-between">
          <TextareaAutosize
            rows={1}
            maxRows={5}
            className="w-[75%] p-2 resize-none bg-transparent"
            value={name}
            onChange={handleTaskNameChange}
          />
          <div className="flex">
            {!isDone && (
              <TaskProgress
                selectedProgress={progress}
                setSelectedProgress={setProgress}
              />
            )}
            <TaskActions
              taskId={dto.id}
              showDatePicker={showDatePicker}
              setShowDatePicker={setShowDatePicker}
            />
          </div>
        </div>
        {!isDone && (showDatePicker || dueAt) && (
          <div className="flex justify-end text-sm">
            <TaskDate
              dueAt={dueAt}
              setDueAt={setDueAt}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
