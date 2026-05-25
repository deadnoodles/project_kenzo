import { Link } from "@tanstack/react-router";
import { Plus, Flame, MessageSquare, ScanSearch } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

export type ChatSession = {
  id: string;
  title: string;
  messages: unknown[];
};

type Props = {
  sessions: ChatSession[];
  activeId: string;
  onSelect: (id: string) => void;
  onNew: () => void;
};

export function ChatSidebar({ sessions, activeId, onSelect, onNew }: Props) {
  return (
    <aside className="flex h-full w-full flex-col gap-4 border-r border-border bg-card/70 p-4 backdrop-blur">
      <div className="flex items-center justify-between">
        <Logo size="sm" />
        <ThemeToggle />
      </div>

      <button
        onClick={onNew}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-brown py-2.5 text-sm font-semibold text-cream shadow-cozy hover:opacity-90 transition"
      >
        <Plus className="h-4 w-4" /> New chat
      </button>

      <Link
        to="/review"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card py-2 text-sm font-medium text-foreground transition hover:bg-muted"
      >
        <ScanSearch className="h-4 w-4" /> Review Mode
      </Link>

      <div className="flex-1 overflow-y-auto">
        <p className="px-2 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Recent
        </p>
        <ul className="space-y-1">
          {sessions.map((s) => {
            const active = s.id === activeId;
            return (
              <li key={s.id}>
                <button
                  onClick={() => onSelect(s.id)}
                  className={`flex w-full items-center gap-2 truncate rounded-2xl px-3 py-2 text-left text-sm transition ${
                    active
                      ? "bg-primary/30 text-foreground font-medium ring-1 ring-primary/40"
                      : "text-foreground/80 hover:bg-muted"
                  }`}
                >
                  <MessageSquare className="h-3.5 w-3.5 shrink-0 opacity-60" />
                  <span className="truncate">{s.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="rounded-3xl border border-border bg-mint/40 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Flame className="h-4 w-4 text-blush" /> Learning streak
        </div>
        <p className="mt-1 text-xs text-muted-foreground">5 days in a row — nice progress!</p>
        <div className="mt-3 flex gap-1.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full ${
                i < 5 ? "bg-primary" : "bg-background"
              }`}
            />
          ))}
        </div>
      </div>

      <Link
        to="/"
        className="text-center text-xs text-muted-foreground hover:text-foreground"
      >
        ← Back to home
      </Link>
    </aside>
  );
}
