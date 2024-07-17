"use client";

import { useMemo, useState, Dispatch, SetStateAction } from "react";

import { TaskProgressValue } from "@/apis/types";
import { cn } from "@/lib/utils";
import { Button } from "@shadcn/button";
import { Popover, PopoverContent, PopoverTrigger } from "@shadcn/popover";
import { ToggleGroup, ToggleGroupItem } from "@shadcn/toggle-group";
import { TaskProgressSpecList } from "./TaskProgressSpecList";

type Props = {
  selectedProgress: TaskProgressValue;
  setSelectedProgress: Dispatch<SetStateAction<TaskProgressValue>>;
};

export function TaskProgress(props: Props) {
  const { selectedProgress, setSelectedProgress } = props;
  const [open, setOpen] = useState(false);
  const selectedProgressSpec = useMemo(() => {
    return (
      TaskProgressSpecList.find(spec => spec.value === selectedProgress) ||
      TaskProgressSpecList[0]
    );
  }, [selectedProgress]);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant="link"
          size="sm"
          className="w-[50px] justify-start self-center h-4"
        >
          {selectedProgressSpec && (
            <selectedProgressSpec.icon className="h-4 w-4 fill-current stroke-current" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 w-[240px]"
        side="bottom"
        align="end"
      >
        <ToggleGroup
          type="single"
          value={selectedProgress.toString()}
        >
          {TaskProgressSpecList.map(progress => (
            <ToggleGroupItem
              key={progress.value}
              disabled={false}
              value={progress.value.toString()}
              className="m-2"
              onClick={() => {
                console.log("Selected toggle: ", progress.value);
                setSelectedProgress(progress.value);
                setOpen(false);
              }}
            >
              <progress.icon
                className={cn(
                  "h-4 w-4 fill-current stroke-current",
                  progress.value === selectedProgressSpec?.value
                    ? "border-2"
                    : "border-0"
                )}
              />
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </PopoverContent>
    </Popover>
  );
}
