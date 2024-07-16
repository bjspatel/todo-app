"use client";

import { CircleDashed } from "lucide-react";
import {
  useMemo,
  useState,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  SVGProps,
} from "react";

import { TaskProgressValue } from "@/apis/types";
import ProgressHalfIcon from "@/assets/progress-half.svg?react";
import ProgressQuarterSrc from "@/assets/progress-quarter.svg?react";
import ProgressThreeQuarterSrc from "@/assets/progress-three-quarter.svg?react";
import { cn } from "@/lib/utils";
import { Button } from "@shadcn/button";
import { Popover, PopoverContent, PopoverTrigger } from "@shadcn/popover";
import { ToggleGroup, ToggleGroupItem } from "@shadcn/toggle-group";

type Progress = {
  value: TaskProgressValue;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
};

const progressList: Progress[] = [
  {
    value: 0,
    icon: CircleDashed,
  },
  {
    value: 25,
    icon: ProgressQuarterSrc,
  },
  {
    value: 50,
    icon: ProgressHalfIcon,
  },
  {
    value: 75,
    icon: ProgressThreeQuarterSrc,
  },
];

type Props = {
  selectedProgressValue: TaskProgressValue;
  setSelectedProgressValue: Dispatch<SetStateAction<TaskProgressValue>>;
};

export function TaskProgress(props: Props) {
  const { selectedProgressValue, setSelectedProgressValue } = props;
  const [open, setOpen] = useState(false);
  const selectedProgress = useMemo(() => {
    return (
      progressList.find(progress => progress.value === selectedProgressValue) ||
      progressList[0]
    );
  }, [selectedProgressValue]);
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
          {selectedProgress && (
            <selectedProgress.icon className="h-4 w-4 fill-current" />
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
          value={selectedProgressValue.toString()}
        >
          {progressList.map(progress => (
            <ToggleGroupItem
              key={progress.value}
              disabled={false}
              value={progress.value.toString()}
              className="m-2"
              onClick={() => {
                console.log("Selected toggle: ", progress.value);
                setSelectedProgressValue(progress.value);
                setOpen(false);
              }}
            >
              <progress.icon
                className={cn(
                  "h-4 w-4 fill-current",
                  progress.value === selectedProgress?.value
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
