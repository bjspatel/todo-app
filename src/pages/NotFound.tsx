import { Link } from "react-router-dom";

import { Button } from "@shadcn/button";

export const NotFound = () => {
  return (
    <div className="flex h-full w-full bg-slate-400">
      <div className="flex flex-col gap-8 justify-around h-96 w-full m-48 p-24 bg-slate-200 self-center shadow-[0_4px_8px_-15px_rgba(0,0,0,0.1)">
        <h1 className="text-4xl text-center text-destructive">
          Page Not Found
        </h1>
        <div className="flex flex-col gap-4">
          <p className="text-center">Let's navigate back to your tasks list</p>
          <Link
            to="/"
            className="self-center"
          >
            <Button>Tasks</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
