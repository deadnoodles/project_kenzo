export type Message = {
  id: string;
  role: "user" | "assistant";
  content?: string;
  code?: string;
  attachment?: { type: "image"; name: string };
  thinking?: boolean;
  timestamp?: number;
};

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} animate-fade-up`}>
      <div
        className={`w-full ${isUser ? "max-w-[88%] ml-auto items-end" : "max-w-[92%] mr-auto items-start"}`}
      >
        {!isUser && (
          <div className="mb-1 ml-1 text-xs font-medium text-muted-foreground">Kenzo Buddy</div>
        )}
        <div
          className={`rounded-3xl px-4 py-3 text-sm shadow-cozy ${
            isUser
              ? "rounded-tr-md bg-user-bubble text-user-bubble-foreground"
              : "rounded-tl-md bg-assistant-bubble text-assistant-bubble-foreground"
          }`}
        >
          {message.thinking ? (
            <span className="inline-flex items-center">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </span>
          ) : (
            <>
              {message.attachment && (
                <div className="mb-2 inline-flex items-center gap-2 rounded-2xl bg-background/30 px-3 py-1.5 text-xs">
                  🖼️ {message.attachment.name}
                </div>
              )}
              {message.content && (
                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
              )}
              {message.code && (
                <pre className="mt-2 rounded-2xl bg-code-bg p-3 text-xs text-code-fg overflow-x-auto">
                  <code>{message.code}</code>
                </pre>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
