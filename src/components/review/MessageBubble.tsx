import type { Message } from "./types";

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`w-fit max-w-[75%] rounded-2xl px-4 py-3 shadow-cozy ring-1 backdrop-blur ${
          isUser
            ? "rounded-br-none bg-primary/95 text-primary-foreground ring-primary/20"
            : "rounded-bl-none bg-card/95 text-foreground ring-border"
        }`}
      >
        <p className="break-words whitespace-pre-wrap text-sm leading-relaxed">
          {message.content}
        </p>

        {message.code ? (
          <pre className="mt-3 max-w-full overflow-x-auto rounded-xl border border-border bg-background/95 p-3 font-mono text-xs leading-relaxed text-foreground">
            <code>{message.code}</code>
          </pre>
        ) : null}

        {message.attachment ? (
          <div className="mt-2 text-xs opacity-80">
            📎 {message.attachment.name}
          </div>
        ) : null}
      </div>
    </div>
  );
}