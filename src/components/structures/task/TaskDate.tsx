import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState, Dispatch, SetStateAction } from "react";

import { Calendar } from "@shadcn/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@shadcn/popover";

import { Button } from "../../ui/button";

type Props = {
  show?: boolean;
  dueAt: number | undefined;
  setDueAt: Dispatch<SetStateAction<number | undefined>>;
};

const TaskDate = (props: Props) => {
  const { dueAt, setDueAt } = props;
  const [isOpen, setOpen] = useState(false);
  return (
    <Popover
      open={isOpen}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[148px] h-[24px] text-muted-foreground text-left font-normal p-2"
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
