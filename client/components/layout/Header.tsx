import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Bell, Stethoscope, CalendarCheck2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import logoFull from "@/assets/medi-link.png";

type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: typeof Sparkles;
  unread?: boolean;
};

export default function Header() {
  const location = useLocation();
  const notificationToggleRef = useRef<HTMLButtonElement>(null);
  const notificationPanelRef = useRef<HTMLDivElement>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Chatbot", to: "/chatbot" },
    { label: "Messages", to: "/messages" },
    { label: "Learning", to: "/learning" },
  ];

  const notifications: Notification[] = [
    {
      id: "n1",
      title: "New consult insight",
      description: "Dr. Priya Menon added a genetics note to your stroke mimic thread.",
      time: "5 minutes ago",
      icon: Sparkles,
      unread: true,
    },
    {
      id: "n2",
      title: "Follow-up requested",
      description: "Cardiac ICU team would like an MRI update for myocarditis case #2034.",
      time: "28 minutes ago",
      icon: Stethoscope,
      unread: true,
    },
    {
      id: "n3",
      title: "Live board prep session",
      description: "Neurocritical care simulation begins in 45 minutes. Join from Learning Hub.",
      time: "1 hour ago",
      icon: CalendarCheck2,
    },
  ];

  const unreadCount = notifications.filter((item) => item.unread).length;

  useEffect(() => {
    if (!notificationsOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const panel = notificationPanelRef.current;
      const toggle = notificationToggleRef.current;
      if (panel && toggle) {
        const target = event.target as Node;
        if (!panel.contains(target) && !toggle.contains(target)) {
          setNotificationsOpen(false);
        }
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setNotificationsOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [notificationsOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container relative mx-auto flex h-16 max-w-5xl items-center gap-3 px-4 md:gap-5 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoFull} alt="MediLink" className="h-10 w-auto" />
        </Link>

        <nav className="hidden flex-1 items-center gap-1 sm:flex">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors " +
                  (active ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:bg-muted")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <button
            ref={notificationToggleRef}
            type="button"
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            onClick={() => setNotificationsOpen((prev) => !prev)}
            className="relative grid h-11 w-11 place-items-center rounded-full bg-muted/60 text-muted-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 grid h-5 min-w-[20px] place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </button>
          <Link
            to="/profile"
            className="group hidden items-center gap-3 rounded-full px-2 py-1 transition hover:bg-muted sm:flex"
            aria-label="View profile"
          >
            <div className="text-right">
              <span className="block text-sm font-semibold text-foreground group-hover:text-primary">Dr. Eleanor Pena</span>
              <span className="text-xs text-muted-foreground">Cardiology | Online</span>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/15 text-primary transition group-hover:bg-primary/20">
              <User className="h-5 w-5" />
            </span>
          </Link>
          <Link
            to="/profile"
            className="grid h-11 w-11 place-items-center rounded-full bg-primary/15 text-primary transition hover:bg-primary/20 sm:hidden"
            aria-label="View profile"
          >
            <User className="h-5 w-5" />
          </Link>
        </div>

        {notificationsOpen && (
          <div
            ref={notificationPanelRef}
            className="absolute right-0 top-full z-50 mt-3 w-full max-w-md overflow-hidden rounded-3xl border border-border/60 bg-white/95 p-5 shadow-2xl backdrop-blur"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Notifications</p>
                <h2 className="mt-1 text-lg font-semibold text-foreground">Recent updates</h2>
                <p className="text-xs text-muted-foreground">
                  Stay aligned with collaborators and learning pathways.
                </p>
              </div>
              <Button variant="ghost" size="sm" className="rounded-full" onClick={() => setNotificationsOpen(false)}>
                Close
              </Button>
            </div>
            <div className="mt-5 space-y-3">
              {notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className="flex gap-3 rounded-2xl border border-border/50 bg-muted/30 p-3 transition hover:border-primary/40"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-foreground">{notification.title}</p>
                        <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground">{notification.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} unread updates` : "All caught up"}
              </span>
              <Link
                to="/notifications"
                className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
                onClick={() => setNotificationsOpen(false)}
              >
                View all notifications
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 px-4 pb-3 sm:hidden">
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={
                "flex-1 rounded-full px-3 py-2 text-center text-xs font-semibold uppercase tracking-wider " +
                (active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")
              }
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
