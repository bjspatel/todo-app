import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { useEffect, useState, Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib";

type Props = {
  isDone: boolean | undefined;
  setIsDone: Dispatch<SetStateAction<boolean | undefined>>;
};

const itemsSpec = [
  { label: "None", value: "none" },
  { label: "Done", value: "done" },
  { label: "Not Done", value: "not-done" },
];

const FilterDone = (props: Props) => {
  const { isDone, setIsDone } = props;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>(
    isDone === undefined ? "none" : isDone ? "done" : "not-done"
  );

  useEffect(() => {
    setIsDone(value === "none" ? undefined : value === "done");
  }, [value, setIsDone]);

  return (
    <div className="flex gap-4 w-full items-center">
      <div className="w-16">Status:</div>
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-[120px] justify-between"
          >
            {itemsSpec.find(item => item.value === value)?.label}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[120px] p-0">
          <Command>
            <CommandList>
              {itemsSpec.map(item => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={currentValue => {
                    setValue(currentValue === value ? "none" : currentValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterDone;
