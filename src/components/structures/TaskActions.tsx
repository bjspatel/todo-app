import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type Props = {
  taskId: string;
};

const TaskActions = (props: Props) => {
  const { taskId } = props;
  console.log("Task id: ", taskId);
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
          className="w-[80px] min-w-4"
        >
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TaskActions;
