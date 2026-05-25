import { useEffect, useRef } from "react";
import { MessageBubble, type Message } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { useAppSettings } from "@/hooks/use-app-settings";

type Props = {
  title: string;
  messages: Message[];
  onSend: (text: string, attachment?: { type: "image"; name: string }) => void;
  isThinking: boolean;
};

export function ChatArea({ title, messages, onSend, isThinking }: Props) {
  const endRef = useRef<HTMLDivElement>(null);
  const { settings } = useAppSettings();
  const msgGap = settings?.spaciousLayout ? "gap-7" : "gap-6";

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-none border-b border-border/40 bg-card/50 px-6 py-4">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className={`space-y-4 ${msgGap}`}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isThinking && (
            <div className="text-sm text-muted-foreground">
              Thinking…
            </div>
          )}
        </div>
      </div>

    </div>
  );
}