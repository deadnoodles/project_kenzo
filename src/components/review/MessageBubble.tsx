import type { Message } from "./types";

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`w-fit max-w-[75%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-muted text-foreground rounded-bl-none"
        }`}
      >
        <p className="break-words whitespace-pre-wrap text-sm leading-relaxed">
          {message.content}
        </p>

        {message.code && (
          <pre className="mt-3 overflow-x-auto rounded bg-black/20 p-3 text-xs leading-relaxed">
            <code>{message.code}</code>
          </pre>
        )}

        {message.attachment && (
          <div className="mt-2 text-xs opacity-80">
            📎 {message.attachment.name}
          </div>
        )}
      </div>
    </div>
  );
}
