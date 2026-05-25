import { useState } from "react";
import { Send, ImageIcon, Paperclip, Brain } from "lucide-react";

type Props = {
  onSend: (text: string, attachment?: { type: "image"; name: string }) => void;
  thinkingMode: boolean;
  onToggleThinking: () => void;
  disabled?: boolean;
};

export function ChatInput({
  onSend,
  thinkingMode,
  onToggleThinking,
  disabled,
}: Props) {
  const [value, setValue] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || disabled) return;

    onSend(value.trim());
    setValue("");
  };

  const sendImage = () => {
    if (disabled) return;

    onSend(value.trim() || "Take a look at this screenshot please", {
      type: "image",
      name: "screenshot.png",
    });

    setValue("");
  };

  return (
    <form
      onSubmit={submit}
      className="w-full min-w-0 rounded-[1.75rem] border border-border bg-card/95 px-5 py-4 shadow-cozy backdrop-blur"
    >
      <div className="flex min-w-0 items-center gap-3">
        <textarea
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit(e);
            }
          }}
          placeholder="Paste code or ask Kenzo Buddy anything..."
          disabled={disabled}
          className="min-h-[44px] max-h-40 min-w-0 flex-1 resize-none bg-transparent py-3 text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-60"
        />

        <div className="flex shrink-0 items-center gap-1.5">
          <IconBtn label="Upload screenshot" onClick={sendImage}>
            <ImageIcon className="h-4 w-4" />
          </IconBtn>

          <IconBtn label="Attach file">
            <Paperclip className="h-4 w-4" />
          </IconBtn>

          <button
            type="button"
            onClick={onToggleThinking}
            aria-pressed={thinkingMode}
            className={`inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition ${
              thinkingMode
                ? "bg-accent text-accent-foreground shadow-cozy"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            title="Thinking mode"
          >
            <Brain className="h-3.5 w-3.5" />
            Thinking
          </button>

          <button
            type="submit"
            aria-label="Send"
            disabled={disabled || !value.trim()}
            className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-cozy transition hover:shadow-float disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </form>
  );
}

function IconBtn({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
    >
      {children}
    </button>
  );
}