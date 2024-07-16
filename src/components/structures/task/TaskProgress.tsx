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

const progressSpecList: Progress[] = [
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
  selectedProgress: TaskProgressValue;
  setSelectedProgress: Dispatch<SetStateAction<TaskProgressValue>>;
};

export function TaskProgress(props: Props) {
  const { selectedProgress, setSelectedProgress } = props;
  const [open, setOpen] = useState(false);
  const selectedProgressSpec = useMemo(() => {
    return (
      progressSpecList.find(spec => spec.value === selectedProgress) ||
      progressSpecList[0]
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
            <selectedProgressSpec.icon className="h-4 w-4 fill-current" />
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
          {progressSpecList.map(progress => (
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
                  "h-4 w-4 fill-current",
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
