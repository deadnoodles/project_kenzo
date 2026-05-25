import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type CSSProperties } from "react";
import { DuckBackground } from "@/components/DuckBackground";
import { AppNav } from "@/components/AppNav";
import { ChatSidebar, type ChatSession } from "@/components/review/ChatSidebar";
import { ChatArea } from "@/components/review/ChatArea";
import { BuddyPanel } from "@/components/review/BuddyPanel";
import { DailyChallenge } from "@/components/review/DailyChallenge";
import { useAppSettings } from "@/hooks/use-app-settings";
import type { Message } from "@/components/review/MessageBubble";
import { extractCode, deriveTitle } from "@/lib/buddy-replies";

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

const seedSecondary = (title: string): Session => ({
  id: crypto.randomUUID(),
  title,
  messages: [],
});

function ReviewApp() {
  const { settings } = useAppSettings();
  const [sessions, setSessions] = useState<Session[]>(() => [
    seedSession(),
    seedSecondary("Fix Python script"),
    seedSecondary("Improve API endpoint"),
  ]);
  const [activeId, setActiveId] = useState<string>(() => sessions[0]?.id ?? "");
  const [thinkingMap, setThinkingMap] = useState<Record<string, boolean>>({});
  const [buddyMessage, setBuddyMessage] = useState("");

  const active = useMemo(
    () => sessions.find((s) => s.id === activeId) ?? sessions[0],
    [sessions, activeId],
  );
  const isThinking = !!thinkingMap[active?.id ?? ""];

const sidebarW = "clamp(260px, 16vw, 300px)";
const buddyW = "260px";
const colGap = "clamp(1rem, 2vw, 2rem)";

  const handleNew = () => {
    const fresh: Session = {
      id: crypto.randomUUID(),
      title: "New review",
      messages: [],
    };
    setSessions((s) => [fresh, ...s]);
    setActiveId(fresh.id);
    setBuddyMessage("");
  };

  const handleSend = async (
    text: string,
    attachment?: { type: "image"; name: string },
  ) => {
    if (!active) return;

    const sessionId = active.id;
    const code = extractCode(text);

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      code,
      attachment,
      timestamp: Date.now(),
    };

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

    setThinkingMap((m) => ({ ...m, [sessionId]: true }));
    setBuddyMessage("Hmm. Let me take a look…");

    try {
      const currentSession = sessions.find((s) => s.id === sessionId);

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
          data.reply || "I reviewed it, but I have no dramatic comments this time.",
        timestamp: Date.now(),
      };

      setSessions((prev) =>
        prev.map((s) =>
          s.id === sessionId
            ? { ...s, messages: [...s.messages, assistantMsg] }
            : s,
        ),
      );

      setBuddyMessage(
        data.buddyBubble ||
          data.reply?.split("\n")[0]?.slice(0, 90) ||
          "",
      );
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
            ? { ...s, messages: [...s.messages, errorMsg] }
            : s,
        ),
      );

      setBuddyMessage("Not my finest moment. Try again.");
    } finally {
      setThinkingMap((m) => ({ ...m, [sessionId]: false }));
    }
  };

  return (
    <div className="relative min-h-screen">
      <DuckBackground />
      <div className="border-b border-border/60 bg-card/50 backdrop-blur md:hidden">
        <AppNav />
      </div>
      <div
        className="grid h-[calc(100vh-57px)] w-full grid-cols-1 md:h-screen md:grid-cols-[var(--sidebar)_minmax(0,1fr)] xl:grid-cols-[var(--sidebar)_minmax(0,1fr)_var(--buddy)]"
style={
  {
    "--sidebar": sidebarW,
    "--buddy": buddyW,
    columnGap: colGap,
  } as CSSProperties
}
      >
        <div className="hidden h-full min-h-0 min-w-0 overflow-hidden md:block">
          <ChatSidebar
            sessions={sessions}
            activeId={active?.id ?? ""}
            onSelect={setActiveId}
            onNew={handleNew}
          />
        </div>

       <main className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden pr-0">

          {active && (
            <ChatArea
              title={active.title}
              messages={active.messages}
              onSend={handleSend}
              isThinking={isThinking}
            />
          )}
        </main>

        <aside
className={`hidden h-full min-h-0 w-full min-w-0 shrink-0 flex-col overflow-y-auto pr-6 xl:flex ${
  settings.spaciousLayout ? "gap-4 pb-8 pt-28" : "gap-3 pb-6 pt-24"
}`}
        >
          <BuddyPanel message={buddyMessage} />
          <DailyChallenge />
        </aside>
      </div>
    </div>
  );
}
