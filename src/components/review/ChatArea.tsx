import { useEffect, useRef, useState } from "react";
import { MessageBubble, type Message } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { SettingsDialog } from "@/components/SettingsDialog";
import { useAppSettings } from "@/hooks/use-app-settings";

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

  const maxW = settings.spaciousLayout ? "max-w-4xl" : "max-w-3xl";
  const padX = settings.spaciousLayout ? "px-12" : "px-10";
  const padY = settings.spaciousLayout ? "py-10" : "py-8";
  const msgGap = settings.spaciousLayout ? "gap-7" : "gap-6";

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  return (
    <div className="flex h-full min-w-0 flex-col">
      <header
        className={`flex items-center justify-between border-b border-border bg-card/60 ${padX} py-5 backdrop-blur`}
      >
        <div className="min-w-0">
          <h1 className="truncate font-display text-xl">{title}</h1>
          <p className="text-sm text-muted-foreground">
            Chat Mode — ask follow-ups about your code
          </p>
        </div>
        <div className="md:hidden">
          <SettingsDialog />
        </div>
      </header>

      <div className={`flex-1 overflow-y-auto ${padX} ${padY}`}>
        <div className={`mx-auto flex w-full ${maxW} flex-col ${msgGap}`}>
          {messages.length === 0 && !isThinking && (
            <div className="mx-auto mt-20 max-w-md rounded-3xl border border-border bg-card/70 p-10 text-center shadow-cozy backdrop-blur">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-pale/80 text-2xl">
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

      <div className={`border-t border-border bg-card/40 ${padX} py-6 backdrop-blur`}>
        <div className={`mx-auto w-full ${maxW}`}>
          <ChatInput
            onSend={onSend}
            thinkingMode={thinkingMode}
            onToggleThinking={() => setThinkingMode((v) => !v)}
            disabled={isThinking}
          />
        </div>
      </div>
    </div>
  );
}
