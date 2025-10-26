import type { LucideIcon } from "lucide-react";
import { Home, Bot, Plus, GraduationCap, MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import logoFull from "@/assets/medi-link.png";
import { cn } from "@/lib/utils";

type TabProps = {
  to: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
};

const Tab = ({ to, label, icon: Icon, active }: TabProps) => (
  <Link
    to={to}
    className={cn(
      "group flex items-center justify-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
      "sm:justify-start",
      active ? "bg-muted text-foreground" : "text-muted-foreground",
    )}
  >
    <Icon className={cn("h-5 w-5 shrink-0", active && "text-primary")} />
    <span className="hidden sm:inline">{label}</span>
  </Link>
);

export default function SidebarNav() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const tabs: Array<Omit<TabProps, "active">> = [
    { to: "/", label: "Home", icon: Home },
    { to: "/chatbot", label: "Chatbot", icon: Bot },
    { to: "/messages", label: "Messages", icon: MessageCircle },
    { to: "/learning", label: "Learning", icon: GraduationCap },
  ];

  return (
    <aside className="sticky top-0 flex h-screen w-20 shrink-0 flex-col border-r bg-card/90 px-2 py-6 text-sm shadow-sm sm:w-64 sm:px-6">
      <Link
        to="/"
        className="flex flex-col items-center gap-3 rounded-xl bg-primary/10 px-3 py-4 transition hover:bg-primary/15 sm:flex-row sm:justify-start sm:py-5"
        aria-label="MediLink home"
      >
        <img
          src={logoFull}
          alt="MediLink"
          className="h-8 w-auto sm:h-10"
        />
      </Link>

      <nav className="mt-8 flex-1 space-y-1 overflow-y-auto pr-1">
        {tabs.map((tab) => (
          <Tab key={tab.to} {...tab} active={location.pathname === tab.to} />
        ))}
      </nav>

      {isHome && (
        <Link
          to="/create"
          className="mt-6 flex items-center justify-center gap-3 rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 sm:justify-start"
          aria-label="Create"
        >
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Create</span>
        </Link>
      )}
    </aside>
  );
}
