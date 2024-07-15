import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState, Dispatch, SetStateAction } from "react";

import { Calendar } from "@shadcn/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@shadcn/popover";

import { Button } from "../../ui/button";

type Props = {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
};

const TaskDate = (props: Props) => {
  const { date, setDate } = props;
  const [isOpen, setOpen] = useState(false);
  return (
    <Popover
      open={isOpen}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[148px] h-[24px] justify-end text-muted-foreground text-left font-normal p-2"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={e => {
            setDate(e);
            setOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default TaskDate;
