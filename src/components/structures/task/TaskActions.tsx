import { MoreHorizontal } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shadcn/dropdown-menu";

type Props = {
  taskId: string;
  showDatePicker: boolean;
  setShowDatePicker: Dispatch<SetStateAction<boolean>>;
};

const TaskActions = (props: Props) => {
  const { taskId, showDatePicker, setShowDatePicker } = props;
  return (
    <div className="flex flex-col justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal
            strokeWidth={1}
            className="h-4 w-4"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          align="end"
          className="w-[124px] min-w-4"
        >
          <DropdownMenuItem
            onClick={() => {
              setShowDatePicker(show => !show);
            }}
          >
            {showDatePicker ? "Clear Due Date" : "Add Due Date"}
          </DropdownMenuItem>
          <DropdownMenuItem>Archive</DropdownMenuItem>
          <DropdownMenuItem
            className="text-orange-600"
            onClick={() => {
              console.log("Delete task: ", taskId);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TaskActions;
