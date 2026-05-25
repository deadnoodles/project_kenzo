import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScanSearch, MessagesSquare } from "lucide-react";

const linkBase =
  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition";
const linkIdle = "text-muted-foreground hover:bg-muted hover:text-foreground";
const linkActive = "bg-secondary text-foreground ring-1 ring-border";

type Props = {
  showAuth?: boolean;
};

export function AppNav({ showAuth = false }: Props) {
  return (
    <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
      <Logo />
      <nav className="flex flex-wrap items-center gap-1 rounded-full border border-border bg-card/80 p-1 shadow-cozy backdrop-blur">
        <Link
          to="/review"
          className={linkBase}
          activeOptions={{ exact: true }}
          inactiveProps={{ className: linkIdle }}
          activeProps={{ className: linkActive }}
        >
          <ScanSearch className="h-3.5 w-3.5" />
          Review
        </Link>
        <Link
          to="/app"
          className={linkBase}
          activeOptions={{ exact: true }}
          inactiveProps={{ className: linkIdle }}
          activeProps={{ className: linkActive }}
        >
          <MessagesSquare className="h-3.5 w-3.5" />
          Chat
        </Link>
      </nav>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {showAuth && (
          <>
            <Link
              to="/auth"
              className="hidden rounded-full px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground sm:inline"
            >
              Log in
            </Link>
            <Link
              to="/auth"
              className="hidden rounded-full bg-brown px-4 py-1.5 text-sm font-semibold text-cream sm:inline"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
