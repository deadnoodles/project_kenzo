import { useEffect, useRef, useState } from "react";
import { MessageBubble, type Message } from "./MessageBubble";
import { ChatInput } from "./ChatInput";

type Props = {
  title: string;
  messages: Message[];
  onSend: (text: string, attachment?: { type: "image"; name: string }) => void;
  isThinking: boolean;
};

export function ChatArea({ title, messages, onSend, isThinking }: Props) {
  const [thinkingMode, setThinkingMode] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-border bg-card/60 px-6 py-3 backdrop-blur">
        <div className="min-w-0">
          <h1 className="truncate font-display text-lg">{title}</h1>
          <p className="text-xs text-muted-foreground">Chat Mode — ask follow-ups about your code</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          {messages.length === 0 && !isThinking && (
            <div className="mx-auto mt-16 max-w-md rounded-3xl border border-border bg-card/70 p-6 text-center shadow-cozy backdrop-blur">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary/30 text-xl">
                🦆
              </div>
              <h3 className="mt-3 font-display text-lg">Fresh review, fresh start</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Paste some code, ask a question, or drop a screenshot — Kenzo Buddy is listening.
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

      <div className="border-t border-border bg-card/40 px-6 py-4 backdrop-blur">
        <div className="mx-auto max-w-3xl">
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
