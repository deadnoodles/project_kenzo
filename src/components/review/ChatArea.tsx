import { useEffect, useRef, useState } from "react";
import { Pencil } from "lucide-react";
import type { Message } from "./types";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { useAppSettings } from "@/hooks/use-app-settings";

type Props = {
  title: string;
  messages: Message[];
  onSend: (text: string, attachment?: { type: "image"; name: string }) => void;
  isThinking: boolean;
  onRenameTitle?: (newTitle: string) => void;
};

export function ChatArea({ title, messages, onSend, isThinking, onRenameTitle }: Props) {
  const endRef = useRef<HTMLDivElement>(null);
  const { settings } = useAppSettings();
  const msgGap = settings?.spaciousLayout ? "gap-7" : "gap-6";
  const [thinkingMode, setThinkingMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEditStart = () => {
    setIsEditing(true);
    setDraftTitle(title);
  };

  const handleEditSave = () => {
    if (draftTitle.trim() && draftTitle !== title) {
      onRenameTitle?.(draftTitle.trim());
    }
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setDraftTitle(title);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEditSave();
    } else if (e.key === "Escape") {
      handleEditCancel();
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-none border-b border-border/40 bg-card/50 px-6 py-4">
        <div className="flex items-center gap-2 group">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleEditSave}
              className="text-lg font-semibold bg-transparent outline-none border-b-2 border-primary"
            />
          ) : (
            <>
              <h1 className="text-lg font-semibold">{title}</h1>
              <button
                onClick={handleEditStart}
                className="shrink-0 rounded-md p-1 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted/50 transition"
                title="Rename chat"
              >
                <Pencil className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
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
          <div ref={endRef} />
        </div>
      </div>

      {/* Input */}
      <div className="flex-none border-t border-border/40 bg-card/50 px-6 py-4">
        <ChatInput
          onSend={onSend}
          thinkingMode={thinkingMode}
          onToggleThinking={() => setThinkingMode(!thinkingMode)}
          disabled={isThinking}
        />
      </div>
    </div>
  );
}