import { createFileRoute } from "@tanstack/react-router";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
// import { DuckBackground } from "@/components/DuckBackground";
import { AppNav } from "@/components/AppNav";
import { ChatSidebar, type ChatSession } from "@/components/review/ChatSidebar";
import { ChatArea } from "@/components/review/ChatArea";
import { BuddyPanel } from "@/components/review/BuddyPanel";
import type { Message } from "@/components/review/types";
import { extractCode, deriveTitle } from "@/lib/buddy-replies";
import type { KenzoMood } from "@/components/KenzoMascot";
import { AppBackground } from "@/components/AppBackground";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Your review — Kenzo Buddy" },
      {
        name: "description",
        content: "Chat with Kenzo Buddy, your relaxed AI code review companion.",
      },
    ],
  }),
  component: ReviewApp,
});

type Session = ChatSession & { messages: Message[] };

const seedSession = (): Session => ({
  id: crypto.randomUUID(),
  title: "Review login component",
  messages: [
    {
      id: crypto.randomUUID(),
      role: "user",
      content: "Can you review this function?",
      code: `function login(user) {
  if (!user.email) return null;
  validateUser(user);
  saveSession(user);
  return api.post("/login", user);
}`,
      timestamp: Date.now() - 60_000,
    },
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Clean overall — I like the email guard. One small thing: this function is doing a few jobs at once. Splitting validation and session saving into their own helpers would keep the intent clearer.",
      timestamp: Date.now() - 30_000,
    },
  ],
});

function getKenzoMoodFromReview(data: any): KenzoMood {
  if (!data) return "happy";

  if (typeof data.score === "number") {
    if (data.score >= 80) return "happy";
    if (data.score >= 50) return "happy";
    return "angry";
  }

  const issues = Array.isArray(data.issues) ? data.issues : [];

  if (issues.some((issue) => issue?.severity === "high")) {
    return "angry";
  }

  if (issues.length > 0) {
    return "happy";
  }

  return "happy";
}

function ReviewApp() {
  const [sessions, setSessions] = useState<Session[]>(() => [seedSession()]);
  const [activeId, setActiveId] = useState<string>(() => sessions[0]?.id ?? "");
  const [thinkingMap, setThinkingMap] = useState<Record<string, boolean>>({});
  const [kenzoMood, setKenzoMood] = useState<KenzoMood>("happy");

  const hasHandledPendingMessageRef = useRef(false);

  const active = useMemo(
    () => sessions.find((s) => s.id === activeId) ?? sessions[0],
    [sessions, activeId],
  );

  const isThinking = !!thinkingMap[active?.id ?? ""];

  const sendMessageToSession = useCallback(
    async (
      sessionId: string,
      text: string,
      attachment?: { type: "image"; name: string },
    ) => {
      if (!text.trim()) return;

      const currentSession = sessions.find((s) => s.id === sessionId);
      const code = extractCode(text);

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: text,
        code,
        attachment,
        timestamp: Date.now(),
      };

      setKenzoMood("observing");
      setThinkingMap((prev) => ({ ...prev, [sessionId]: true }));

      setSessions((prev) =>
        prev.map((s) =>
          s.id === sessionId
            ? {
                ...s,
                title: s.messages.length === 0 ? deriveTitle(text) : s.title,
                messages: [...s.messages, userMsg],
              }
            : s,
        ),
      );

      try {
        const response = await fetch("http://localhost:3001/api/review", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: text,
            code,
            attachment,
            chatHistory: currentSession?.messages ?? [],
          }),
        });

        const data = await response.json();

        const assistantMsg: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            typeof data.reply === "string" && data.reply.trim().length > 0
              ? data.reply
              : "I reviewed it, but I have no dramatic comments this time.",
          timestamp: Date.now(),
        };

        setSessions((prev) =>
          prev.map((s) =>
            s.id === sessionId
              ? {
                  ...s,
                  messages: [...s.messages, assistantMsg],
                }
              : s,
          ),
        );

        setKenzoMood(getKenzoMoodFromReview(data));
      } catch (error) {
        console.error("Kenzo review failed:", error);

        const errorMsg: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Something broke while I was reviewing. Bold move from the machine. Try again in a second.",
          timestamp: Date.now(),
        };

        setSessions((prev) =>
          prev.map((s) =>
            s.id === sessionId
              ? {
                  ...s,
                  messages: [...s.messages, errorMsg],
                }
              : s,
          ),
        );

        setKenzoMood("sad");
      } finally {
        setThinkingMap((prev) => ({ ...prev, [sessionId]: false }));
      }
    },
    [sessions],
  );

  const handleSend = useCallback(
    async (text: string, attachment?: { type: "image"; name: string }) => {
      if (!active?.id) return;
      await sendMessageToSession(active.id, text, attachment);
    },
    [active?.id, sendMessageToSession],
  );

  useEffect(() => {
    if (hasHandledPendingMessageRef.current) return;

    const pendingMessage = sessionStorage.getItem("kenzo_pending_chat_message");

    if (!pendingMessage) return;

    hasHandledPendingMessageRef.current = true;
    sessionStorage.removeItem("kenzo_pending_chat_message");

    const handoffSession: Session = {
      id: crypto.randomUUID(),
      title: "Explain review",
      messages: [],
    };

    setSessions((prev) => [handoffSession, ...prev]);
    setActiveId(handoffSession.id);

    window.setTimeout(() => {
      sendMessageToSession(handoffSession.id, pendingMessage);
    }, 150);
  }, [sendMessageToSession]);

  const handleNew = () => {
    const fresh: Session = {
      id: crypto.randomUUID(),
      title: "New review",
      messages: [],
    };

    setSessions((prev) => [fresh, ...prev]);
    setActiveId(fresh.id);
    setKenzoMood("happy");
  };

  const handleDeleteChat = (sessionId: string) => {
    setSessions((prev) => {
      const updated = prev.filter((s) => s.id !== sessionId);

      if (updated.length === 0) {
        const fresh: Session = {
          id: crypto.randomUUID(),
          title: "New review",
          messages: [],
        };

        setActiveId(fresh.id);
        return [fresh];
      }

      if (activeId === sessionId) {
        setActiveId(updated[0].id);
      }

      return updated;
    });
  };

  const handleShareChat = (sessionId: string) => {
    console.log("Share chat:", sessionId);
  };

  const handleRenameChat = (sessionId: string, newTitle: string) => {
    if (!newTitle.trim()) return;

    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId ? { ...s, title: newTitle.trim() } : s,
      ),
    );
  };


return (
  <div className="relative min-h-screen overflow-hidden bg-background">
    <AppBackground />

      <div className="border-b border-border/60 bg-card/50 backdrop-blur md:hidden">
        <AppNav />
      </div>

      <div
        className="grid h-[calc(100vh-57px)] w-full md:h-screen md:grid-cols-[280px_minmax(0,1fr)_260px]"
        style={{ gap: "0" } as CSSProperties}
      >
        <div className="hidden h-full min-h-0 min-w-0 overflow-hidden md:flex md:flex-col">
          <ChatSidebar
            sessions={sessions}
            activeId={active?.id ?? ""}
            onSelect={setActiveId}
            onNew={handleNew}
            onDelete={handleDeleteChat}
            onShare={handleShareChat}
            onRename={handleRenameChat}
          />
        </div>

        <main className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          {active ? (
            <ChatArea
              title={active.title}
              messages={active.messages}
              onSend={handleSend}
              isThinking={isThinking}
              onRenameTitle={(newTitle) => handleRenameChat(active.id, newTitle)}
            />
          ) : null}
        </main>

        <aside className="hidden h-full w-[260px] shrink-0 border-l border-border bg-card/30 p-4 pt-12 xl:flex">
          <BuddyPanel mood={kenzoMood} />
        </aside>
      </div>
    </div>
  );
}