import { Loader2, MoreHorizontal } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { api } from "@/apis";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shadcn/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  taskId: string;
  showDatePicker: boolean;
  setShowDatePicker: Dispatch<SetStateAction<boolean>>;
};

const TaskMenu = (props: Props) => {
  const { taskId, showDatePicker, setShowDatePicker } = props;
  const queryClient = useQueryClient();
  const { mutate: deleteTask, isPending: isDeleting } = useMutation({
    mutationKey: ["delete-task"],
    mutationFn: async () => {
      console.log("Delete task: ", taskId);
      await api.task.delete(taskId);
      queryClient.invalidateQueries({
        queryKey: ["tasks-list"],
      });
    },
  });
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
            disabled={isDeleting}
            onClick={() => {
              deleteTask();
            }}
          >
            Delete {isDeleting && <Loader2 className="animate-spin h-4 w-4" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TaskMenu;
