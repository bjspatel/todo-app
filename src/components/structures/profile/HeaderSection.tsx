import InitialsAvatar from "react-initials-avatar";

import { useAuth } from "@/contexts/AuthContext";

const HeaderSection = () => {
  const { user } = useAuth();
  return (
    <header className="space-y-1.5">
      <div className="flex items-center space-x-4">
        <InitialsAvatar
          name={user?.name || "User"}
          className={"h-24 w-24 text-4xl bg-slate-500 initials-avatar"}
        />
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold">{user?.name}</h1>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
