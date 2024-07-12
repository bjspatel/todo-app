"use client";

import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  LucideIcon,
  XCircle,
} from "lucide-react";
import { useMemo, useState, Dispatch, SetStateAction } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@shadcn/button";
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@shadcn/command";
import { Popover, PopoverContent, PopoverTrigger } from "@shadcn/popover";

export type StatusValue = "to-do" | "in-progress" | "done" | "canceled";

type Status = {
  value: StatusValue;
  label: string;
  icon: LucideIcon;
};

const statuses: Status[] = [
  {
    value: "to-do",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "in-progress",
    label: "In Progress",
    icon: ArrowUpCircle,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle2,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircle,
  },
];

type Props = {
  allowedStatusValues?: StatusValue[];
  selectedStatusValue: StatusValue;
  setSelectedStatusValue: Dispatch<SetStateAction<StatusValue>>;
};

export function StatusDropdown(props: Props) {
  const { allowedStatusValues, selectedStatusValue, setSelectedStatusValue } =
    props;
  const [open, setOpen] = useState(false);
  const statusesToRender = useMemo(
    () =>
      allowedStatusValues
        ? statuses.filter(status => allowedStatusValues.includes(status.value))
        : statuses,
    [allowedStatusValues]
  );
  const selectedStatus = useMemo(() => {
    return statusesToRender.find(
      status => status.value === selectedStatusValue
    );
  }, [statusesToRender, selectedStatusValue]);
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
          {selectedStatus ? (
            <>
              <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
              {selectedStatus.label}
            </>
          ) : (
            <>Set status</>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 w-[150px]"
        side="bottom"
        align="start"
      >
        <Command>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {statusesToRender.map(status => (
              <CommandItem
                key={status.value}
                value={status.value}
                onSelect={value => {
                  setSelectedStatusValue(value as StatusValue);
                  setOpen(false);
                }}
              >
                <status.icon
                  className={cn(
                    "mr-2 h-4 w-4",
                    status.value === selectedStatus?.value
                      ? "opacity-100"
                      : "opacity-40"
                  )}
                />
                <span>{status.label}</span>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
