import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState, Dispatch, SetStateAction, useMemo } from "react";

import { Calendar } from "@shadcn/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@shadcn/popover";

import { Button } from "../../../ui/button";
import { cn } from "@/lib";

type Props = {
  show?: boolean;
  dueAt: number | undefined;
  setDueAt: Dispatch<SetStateAction<number | undefined>>;
};

const TaskDate = (props: Props) => {
  const { dueAt, setDueAt } = props;
  const [isOpen, setOpen] = useState(false);
  const isDueIn24Hours = useMemo(
    () => dueAt && dueAt - Date.now() < 24 * 60 * 60 * 1000,
    [dueAt]
  );
  const isDuePast = useMemo(() => dueAt && dueAt < Date.now(), [dueAt]);
  return (
    <Popover
      open={isOpen}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[148px] h-[24px] text-muted-foreground text-left font-normal p-2",
            isDueIn24Hours &&
              "border-orange-300 bg-orange-50 border-2 hover:bg-orange-100",
            isDuePast && "border-red-400 border-2 bg-red-100 hover:bg-red-200"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dueAt ? format(dueAt, "PPP") : <span>Due date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={(dueAt && new Date(dueAt)) || undefined}
          onSelect={e => {
            setDueAt(e?.getTime() || 0);
            setOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default TaskDate;
