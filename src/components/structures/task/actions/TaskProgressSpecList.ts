import { CircleDashed } from "lucide-react";
import { FunctionComponent, SVGProps } from "react";

import { TaskProgressValue } from "@/apis/types";
import ProgressHalfIcon from "@/assets/progress-half.svg?react";
import ProgressQuarterSrc from "@/assets/progress-quarter.svg?react";
import ProgressThreeQuarterSrc from "@/assets/progress-three-quarter.svg?react";

type Progress = {
  value: TaskProgressValue;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
};

export const TaskProgressSpecList: Progress[] = [
  {
    value: 0,
    icon: CircleDashed,
  },
  {
    value: 25,
    icon: ProgressQuarterSrc,
  },
  {
    value: 50,
    icon: ProgressHalfIcon,
  },
  {
    value: 75,
    icon: ProgressThreeQuarterSrc,
  },
];
