import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SettingsDialog } from "@/components/SettingsDialog";
import { ScanSearch, MessagesSquare } from "lucide-react";

const linkBase =
  "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-base font-medium transition";
const linkIdle = "text-muted-foreground hover:bg-blue-pale/50 hover:text-foreground";
const linkActive = "bg-blue-pale/60 text-foreground ring-1 ring-primary/35";

type Props = {
  showAuth?: boolean;
};

export function AppNav({ showAuth = false }: Props) {
  return (
    <header className="page-container relative flex min-h-[5.25rem] items-center justify-between py-7">
      <div className="relative z-10 shrink-0">
        <Logo />
      </div>

      <nav
        className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border border-border bg-card/90 p-1 shadow-cozy backdrop-blur"
        aria-label="Review or Chat mode"
      >
        <Link
          to="/review"
          className={linkBase}
          activeOptions={{ exact: true }}
          inactiveProps={{ className: linkIdle }}
          activeProps={{ className: linkActive }}
        >
          <ScanSearch className="h-4 w-4" />
          Review
        </Link>
        <Link
          to="/app"
          className={linkBase}
          activeOptions={{ exact: true }}
          inactiveProps={{ className: linkIdle }}
          activeProps={{ className: linkActive }}
        >
          <MessagesSquare className="h-4 w-4" />
          Chat
        </Link>
      </nav>

      <div className="relative z-10 ml-auto flex shrink-0 items-center gap-2">
        <SettingsDialog />
        <ThemeToggle />
        {showAuth && (
          <>
            <Link
              to="/auth"
              className="hidden rounded-full px-4 py-2 text-base text-muted-foreground hover:text-foreground sm:inline"
            >
              Log in
            </Link>
            <Link
              to="/auth"
              className="btn-primary hidden px-5 py-2 text-sm sm:inline-flex"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
