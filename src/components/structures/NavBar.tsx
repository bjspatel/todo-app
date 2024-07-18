import "react-initials-avatar/lib/ReactInitialsAvatar.css";

import { ListTodo, LucideCalendarDays, PowerIcon } from "lucide-react";
import InitialsAvatar from "react-initials-avatar";
import { useLocation, Link } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@shadcn/tooltip";

const topNavItems = [
  {
    icon: ListTodo,
    label: "Tasks",
    to: "/",
  },
  {
    icon: LucideCalendarDays,
    label: "Calendar",
    to: "/calendar",
  },
];

const bottomNavItems = [
  {
    icon: InitialsAvatar,
    label: "Profile",
    to: "/profile",
  },
  {
    icon: PowerIcon,
    label: "Logout",
    to: "/logout",
  },
];

export function NavBar() {
  const auth = useAuth();
  const location = useLocation();
  const navClassName =
    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8";
  const selectedNavClassName =
    "group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base";
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        {topNavItems.map(({ icon: Icon, label, to }) => (
          <TooltipProvider key={label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={to}
                  className={
                    to === location.pathname
                      ? selectedNavClassName
                      : navClassName
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{label}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        {bottomNavItems.map(({ icon: Icon, label, to }) => (
          <TooltipProvider key={label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={to}
                  className={
                    to === location.pathname
                      ? selectedNavClassName
                      : navClassName
                  }
                >
                  {to === "/profile" ? (
                    <Icon
                      name={auth.user?.name || "User"}
                      className="h-8 w-8 text-sm bg-slate-500 initials-avatar"
                    />
                  ) : (
                    <Icon
                      name={label}
                      className="h-5 w-5"
                    />
                  )}
                  <span className="sr-only">{label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{label}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>
    </aside>
  );
}
