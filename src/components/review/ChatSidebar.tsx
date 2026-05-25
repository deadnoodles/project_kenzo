import { Link } from "@tanstack/react-router";
import { Plus, MessageSquare, ScanSearch } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SettingsDialog } from "@/components/SettingsDialog";
import { LearningStreakCard } from "./LearningStreakCard";
import { useAppSettings } from "@/hooks/use-app-settings";

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
  const { settings } = useAppSettings();
  const gap = settings.spaciousLayout ? "gap-3.5" : "gap-3";
const pad = settings.spaciousLayout ? "px-4 py-4" : "px-4 py-4";

  return (
    <aside
      className={`flex h-full w-full min-w-0 flex-col border-r border-border bg-card/70 backdrop-blur ${gap} ${pad}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1 overflow-visible">
          <Logo size="sm" />
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <SettingsDialog />
          <ThemeToggle />
        </div>
      </div>

      <button
        onClick={onNew}
  className="btn-primary w-full gap-1.5 px-3 py-2 text-sm font-semibold"
      >
        <Plus className="h-3.5 w-3.5" /> New chat
      </button>

      <Link
        to="/review"
        className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground transition hover:bg-muted"
      >
        <ScanSearch className="h-3.5 w-3.5 shrink-0" /> Review
      </Link>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <p className="px-1 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Recent
        </p>
        <ul className="space-y-2">
          {sessions.map((s) => {
            const active = s.id === activeId;
            return (
              <li key={s.id}>
                <button
                  onClick={() => onSelect(s.id)}
                  className={`flex w-full items-start gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    active
                      ? "bg-blue-pale/70 font-medium text-foreground ring-1 ring-primary/30"
                      : "text-foreground/80 hover:bg-muted"
                  }`}
                >
                  <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-60" />
                  <span
                    className="min-w-0 flex-1 truncate leading-snug"
                    title={s.title}
                  >
                    {s.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

{settings.showLearningStreak ? <LearningStreakCard /> : null}

      <Link
        to="/"
        className="shrink-0 text-center text-xs text-muted-foreground hover:text-foreground"
      >
        ← Back to home
      </Link>
    </aside>
  );
}
