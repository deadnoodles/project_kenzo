import { Link } from "@tanstack/react-router";
import { Plus, MessageSquare, ScanSearch, MoreHorizontal, Pencil } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SettingsDialog } from "@/components/SettingsDialog";
import { LearningStreakCard } from "./LearningStreakCard";
import { useAppSettings } from "@/hooks/use-app-settings";
import { useRef, useState, useEffect } from "react";

export type ChatSession = {
  id: string;
  title: string;
};

type Props = {
  sessions: ChatSession[];
  activeId: string;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  onShare: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
};

export function ChatSidebar({ sessions, activeId, onSelect, onNew, onDelete, onShare, onRename }: Props) {
  const { settings } = useAppSettings();
  const gap = settings.spaciousLayout ? "gap-3.5" : "gap-3";
  const pad = settings.spaciousLayout ? "px-4 py-4" : "px-4 py-4";
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState("");
  const menuRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingId]);

  const handleMenuClick = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === sessionId ? null : sessionId);
  };

  const handleShare = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    onShare(sessionId);
    setOpenMenuId(null);
  };

  const handleDelete = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    onDelete(sessionId);
    setOpenMenuId(null);
  };

  const handleEditStart = (e: React.MouseEvent, sessionId: string, currentTitle: string) => {
    e.stopPropagation();
    setEditingId(sessionId);
    setDraftTitle(currentTitle);
  };

  const handleEditSave = (sessionId: string) => {
    if (draftTitle.trim()) {
      onRename(sessionId, draftTitle.trim());
    }
    setEditingId(null);
    setDraftTitle("");
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setDraftTitle("");
  };

  const handleKeyDown = (e: React.KeyboardEvent, sessionId: string) => {
    if (e.key === "Enter") {
      handleEditSave(sessionId);
    } else if (e.key === "Escape") {
      handleEditCancel();
    }
  };

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
        <ul className="space-y-2" ref={menuRef}>
          {sessions.map((s) => {
            const active = s.id === activeId;
            const menuOpen = openMenuId === s.id;
            const isEditing = editingId === s.id;
            return (
              <li key={s.id}>
                <div className="relative group">
                  {isEditing ? (
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-muted">
                      <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-60" />
                      <input
                        ref={inputRef}
                        type="text"
                        value={draftTitle}
                        onChange={(e) => setDraftTitle(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, s.id)}
                        onBlur={() => handleEditSave(s.id)}
                        className="flex-1 min-w-0 bg-transparent outline-none text-sm"
                      />
                    </div>
                  ) : (
                    <>
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
                        <button
                          onClick={(e) => handleMenuClick(e, s.id)}
                          className="ml-1 shrink-0 rounded-md p-1 text-blue-300 dark:text-white hover:bg-muted/50 transition"
                          title="Options"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </button>

                      {menuOpen && (
                        <div className="absolute right-0 top-full mt-1 w-40 rounded-lg border border-border bg-card shadow-lg z-50 overflow-hidden">
                          <button
                            onClick={(e) => handleShare(e, s.id)}
                            className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted transition border-b border-border/30"
                          >
                            Share
                          </button>
                          <button
                            onClick={(e) => handleDelete(e, s.id)}
                            className="w-full px-3 py-2 text-left text-sm text-red-500 hover:bg-muted transition"
                          >
                            Delete the chat
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {settings.showLearningStreak ? <LearningStreakCard /> : null}

      <Link
        to="/"
        className="shrink-0 text-center text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back to home
      </Link>
    </aside>
  );
}
