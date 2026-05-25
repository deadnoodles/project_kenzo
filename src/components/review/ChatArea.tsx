import { useEffect, useRef, useState } from "react";
import { MessageBubble, type Message } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { SettingsDialog } from "@/components/SettingsDialog";
import { useAppSettings } from "@/hooks/use-app-settings";

/** Shared horizontal padding for header, messages, and input — keeps edges aligned */
const CHAT_EDGE = "px-4 md:px-6 lg:px-8";

type Props = {
  title: string;
  messages: Message[];
  onSend: (text: string, attachment?: { type: "image"; name: string }) => void;
  isThinking: boolean;
};

export function ChatArea({ title, messages, onSend, isThinking }: Props) {
  const [thinkingMode, setThinkingMode] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const { settings } = useAppSettings();
  const msgGap = settings.spaciousLayout ? "gap-7" : "gap-6";

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  return (
    <div className="flex h-full w-full min-w-0 flex-1 flex-col">
      <header
        className={`flex w-full shrink-0 items-center justify-between border-b border-border bg-card/60 ${CHAT_EDGE} py-4 backdrop-blur`}
      >
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-xl">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Chat Mode — ask follow-ups about your code
          </p>
        </div>
        <div className="shrink-0 md:hidden">
          <SettingsDialog />
        </div>
      </header>

      <div className={`min-h-0 flex-1 overflow-y-auto ${CHAT_EDGE} py-8`}>
        <div className={`flex w-full flex-col ${msgGap}`}>
          {messages.length === 0 && !isThinking && (
            <div className="w-full rounded-3xl border border-border bg-card/70 p-10 text-center shadow-cozy backdrop-blur">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-blue-pale/80 text-xl">
                🦆
              </div>
              <h3 className="mt-5 font-display text-xl">Fresh review, fresh start</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Paste some code, ask a question, or drop a screenshot — Kenzo is
                listening.
              </p>
            </div>
          )}

          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}

          {isThinking && (
            <MessageBubble
              message={{ id: "thinking", role: "assistant", thinking: true }}
            />
          )}
          <div ref={endRef} />
        </div>
      </div>

      <div
        className={`w-full shrink-0 border-t border-border bg-card/40 ${CHAT_EDGE} py-6 backdrop-blur`}
      >
        <ChatInput
          onSend={onSend}
          thinkingMode={thinkingMode}
          onToggleThinking={() => setThinkingMode((v) => !v)}
          disabled={isThinking}
        />
      </div>
    </div>
  );
}
