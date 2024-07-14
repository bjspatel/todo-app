import { Trash2 } from "lucide-react";

type Props = {
  taskId: string;
};

const TaskDelete = (props: Props) => {
  const { taskId } = props;
  return (
    <button
      onClick={() => {
        console.log("Delete task with id: ", taskId);
      }}
    >
      <Trash2 className="w-4 h-4 stroke-slate-400" />
    </button>
  );
};

export default TaskDelete;
