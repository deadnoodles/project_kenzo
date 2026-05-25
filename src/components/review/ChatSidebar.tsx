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
  const gap = settings.spaciousLayout ? "gap-6" : "gap-5";
  const pad = settings.spaciousLayout ? "p-7" : "p-6";

  return (
    <aside
      className={`flex h-full w-full flex-col border-r border-border bg-card/70 backdrop-blur ${gap} ${pad}`}
    >
      <div className="flex items-center justify-between">
        <Logo size="sm" />
        <div className="flex items-center gap-1.5">
          <SettingsDialog />
          <ThemeToggle />
        </div>
      </div>

      <button
        onClick={onNew}
        className="btn-primary w-full py-3 text-sm"
      >
        <Plus className="h-4 w-4" /> New chat
      </button>

      <Link
        to="/review"
        className="btn-secondary w-full py-2.5 text-sm"
      >
        <ScanSearch className="h-4 w-4" /> Review Mode
      </Link>

      <div className="flex-1 overflow-y-auto">
        <p className="px-2 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Recent
        </p>
        <ul className="space-y-1.5">
          {sessions.map((s) => {
            const active = s.id === activeId;
            return (
              <li key={s.id}>
                <button
                  onClick={() => onSelect(s.id)}
                  className={`flex w-full items-center gap-2 truncate rounded-2xl px-3 py-2.5 text-left text-base transition ${
                    active
                      ? "bg-blue-pale/70 font-medium text-foreground ring-1 ring-primary/30"
                      : "text-foreground/80 hover:bg-muted"
                  }`}
                >
                  <MessageSquare className="h-4 w-4 shrink-0 opacity-60" />
                  <span className="truncate">{s.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <LearningStreakCard />

      <Link
        to="/"
        className="text-center text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to home
      </Link>
    </aside>
  );
}
