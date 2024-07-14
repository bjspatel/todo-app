import { CheckCircle2, Circle } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  isDone: boolean;
  setDone: Dispatch<SetStateAction<boolean>>;
};

const TaskDone = (props: Props) => {
  const { isDone, setDone } = props;
  return (
    <div className="flex">
      <button
        className="self-center"
        onClick={() => setDone(isDone => !isDone)}
      >
        {isDone ? (
          <CheckCircle2 className="h-6 w-6 stroke-green-500" />
        ) : (
          <Circle
            strokeWidth={2}
            className="h-6 w-6 stroke-slate-400"
          />
        )}
      </button>
    </div>
  );
};

export default TaskDone;
