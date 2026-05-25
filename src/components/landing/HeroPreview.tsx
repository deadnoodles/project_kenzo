import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send } from "lucide-react";
import type { HeroMode } from "./ModeToggle";

type ReviewHighlight = {
  id: string;
  line: number;
  severity: "medium" | "high";
  dialogue: string;
};

const reviewHighlights: ReviewHighlight[] = [
  {
    id: "guard",
    line: 2,
    severity: "high",
    dialogue:
      "This guard helps, but returning null quietly can make debugging annoying later. Consider returning a clear error.",
  },
  {
    id: "api",
    line: 4,
    severity: "medium",
    dialogue:
      "Bold of you to trust this call without error handling. Wrap it so failures don't vanish into the void.",
  },
];

const codeLines = [
  "function login(user) {",
  "  if (!user.email) return null;",
  "  validateUser(user);",
  "  return api.post(\"/login\", user);",
  "}",
];

function severityLineClass(severity: ReviewHighlight["severity"], active: boolean) {
  const base =
    severity === "high"
      ? "bg-blush/45 ring-blush/50"
      : "bg-gold/30 ring-gold/45";
  return `${base} ${active ? "ring-2" : "ring-1 hover:brightness-110"} cursor-pointer rounded-md transition`;
}

function MiniDialogue({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="mt-3 rounded-lg border-[3px] border-cream/90 bg-[#1a1411] px-3 py-2.5"
    >
      <p className="font-mono text-[11px] font-bold uppercase tracking-wide text-gold">
        Kenzo
      </p>
      <p className="mt-1 font-mono text-xs leading-relaxed text-cream">{text}</p>
    </motion.div>
  );
}

function ReviewPreviewPanel() {
  const [selectedId, setSelectedId] = useState<string | null>(reviewHighlights[0].id);
  const selected = reviewHighlights.find((h) => h.id === selectedId);

  return (
    <div>
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <span className="rounded-full bg-dusty-blue/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-foreground">
          Review
        </span>
        <span className="text-xs text-muted-foreground">kenzo.review</span>
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">Click a highlight</p>
      <pre className="mt-2 overflow-x-auto rounded-2xl bg-code-bg p-3 font-mono text-[11px] leading-relaxed text-code-fg">
        {codeLines.map((line, i) => {
          const lineNum = i + 1;
          const hit = reviewHighlights.find((h) => h.line === lineNum);
          const active = hit?.id === selectedId;
          return (
            <div key={lineNum} className="flex gap-2">
              <span className="w-4 shrink-0 text-right text-code-fg/35">{lineNum}</span>
              <span
                className={
                  hit
                    ? severityLineClass(hit.severity, !!active)
                    : ""
                }
                onClick={() => hit && setSelectedId(hit.id)}
                onKeyDown={(e) => {
                  if (hit && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    setSelectedId(hit.id);
                  }
                }}
                role={hit ? "button" : undefined}
                tabIndex={hit ? 0 : undefined}
              >
                {line}
              </span>
            </div>
          );
        })}
      </pre>
      <AnimatePresence mode="wait">
        {selected ? (
          <MiniDialogue key={selected.id} text={selected.dialogue} />
        ) : (
          <motion.p
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-center text-[11px] text-muted-foreground"
          >
            Click a highlighted line
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChatPreviewPanel() {
  return (
    <div>
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <span className="rounded-full bg-gold/30 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide">
          Chat
        </span>
        <span className="text-xs text-muted-foreground">kenzo.chat</span>
      </div>
      <div className="mt-4 space-y-3">
        <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-user-bubble px-3 py-2 text-xs text-user-bubble-foreground">
          Can you explain this function?
        </div>
        <div className="max-w-[92%] rounded-2xl rounded-tl-md bg-assistant-bubble px-3 py-2 text-xs text-assistant-bubble-foreground">
          Sure. It works, but it&apos;s trying to do a little too much. Let&apos;s split
          the logic before it becomes a tiny swamp.
        </div>
        <div className="flex gap-1 px-1">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-2">
        <span className="flex-1 text-xs text-muted-foreground">
          Ask Kenzo about your code…
        </span>
        <span className="grid h-7 w-7 place-items-center rounded-full bg-brown text-cream">
          <Send className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}

type Props = {
  mode: HeroMode;
};

export function HeroPreview({ mode }: Props) {
  return (
    <div className="rounded-[2rem] border border-border bg-card/90 p-5 shadow-float sketch-border backdrop-blur">
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, x: mode === "review" ? -12 : 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: mode === "review" ? 12 : -12 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          {mode === "review" ? <ReviewPreviewPanel /> : <ChatPreviewPanel />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
