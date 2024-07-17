import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { TaskProgressValue } from "@/apis/types";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { TaskProgressSpecList } from "../actions/TaskProgressSpecList";

type Props = {
  progressList: TaskProgressValue[];
  setProgressList: Dispatch<SetStateAction<TaskProgressValue[]>>;
};

const FilterProgress = (props: Props) => {
  const { progressList, setProgressList } = props;
  const [values, setValues] = useState<TaskProgressValue[]>(progressList);

  useEffect(() => {
    setProgressList(values);
  }, [values, setProgressList]);

  return (
    <div className="flex gap-4 items-center">
      <div className="w-16">Progress:</div>
      <ToggleGroup
        type="multiple"
        value={values.map(value => value.toString())}
      >
        {TaskProgressSpecList.map(spec => (
          <ToggleGroupItem
            key={spec.value}
            value={spec.value.toString()}
            onClick={() => {
              setValues(prevList => {
                const selected = !prevList.includes(spec.value);
                const newValues = selected
                  ? [...prevList, spec.value].sort((a, b) => a - b)
                  : prevList.filter(value => value !== spec.value);
                return newValues;
              });
            }}
          >
            <spec.icon className="h-4 w-4 stroke-primary fill-primary" />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default FilterProgress;
