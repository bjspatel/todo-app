import { Link } from "react-router-dom";

import { Button } from "@shadcn/button";

export const NotFound = () => {
  return (
    <div className="flex flex-col gap-8 justify-around h-full">
      <h1 className="text-orange-600">Page Not Found</h1>
      <Link to="/">
        <Button>Home</Button>
      </Link>
    </div>
  );
};
