"use client";

import {
  useMemo,
  useState,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  SVGProps,
} from "react";

import ProgressHalfIcon from "@/assets/progress-half.svg?react";
import ProgressNoneSrc from "@/assets/progress-none.svg?react";
import ProgressQuarterSrc from "@/assets/progress-quarter.svg?react";
import ProgressThreeQuarterSrc from "@/assets/progress-three-quarter.svg?react";
import { cn } from "@/lib/utils";
import { Button } from "@shadcn/button";
import { Popover, PopoverContent, PopoverTrigger } from "@shadcn/popover";
import { ToggleGroup, ToggleGroupItem } from "@shadcn/toggle-group";

export type ProgressValue = "0" | "0.25" | "0.5" | "0.75";

type Progress = {
  value: ProgressValue;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
};

const progressList: Progress[] = [
  {
    value: "0",
    icon: ProgressNoneSrc,
  },
  {
    value: "0.25",
    icon: ProgressQuarterSrc,
  },
  {
    value: "0.5",
    icon: ProgressHalfIcon,
  },
  {
    value: "0.75",
    icon: ProgressThreeQuarterSrc,
  },
];

type Props = {
  selectedProgressValue: ProgressValue;
  setSelectedProgressValue: Dispatch<SetStateAction<ProgressValue>>;
};

export function ProgressDropdown(props: Props) {
  const { selectedProgressValue, setSelectedProgressValue } = props;
  const [open, setOpen] = useState(false);
  const selectedProgress = useMemo(() => {
    return progressList.find(
      progress => progress.value === selectedProgressValue
    );
  }, [selectedProgressValue]);
  console.log(
    "Icons: ",
    progressList.map(progress => progress.icon)
  );
  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant="link"
          size="sm"
          className="w-[50px] justify-start"
        >
          {selectedProgress ? (
            <selectedProgress.icon className="mr-2 h-4 w-4 fill-current" />
          ) : (
            <>Set progress</>
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
          value={selectedProgressValue}
        >
          {progressList.map(progress => (
            <ToggleGroupItem
              key={progress.value}
              disabled={false}
              value={progress.value}
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
