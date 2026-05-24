type Issue = {
  line: number;
  type: string;
  severity: "low" | "medium" | "high";
  message: string;
  suggestion: string;
};

const issues: Issue[] = [
  {
    line: 12,
    type: "maintainability",
    severity: "medium",
    message: "This function is doing a bit too much.",
    suggestion: "Try splitting validation and processing into smaller functions.",
  },
  {
    line: 18,
    type: "naming",
    severity: "low",
    message: "The variable `d` could be clearer.",
    suggestion: "How about `delayMs` or `debounceTime`?",
  },
];

const moodMap = {
  curious: { emoji: "🤔", label: "Curious", bg: "bg-secondary" },
  proud: { emoji: "💛", label: "Proud", bg: "bg-primary/50" },
  worried: { emoji: "😟", label: "Worried", bg: "bg-blush/60" },
  excited: { emoji: "✨", label: "Excited", bg: "bg-mint/60" },
} as const;

export function ReviewResult({
  score = 78,
  mood = "curious",
}: {
  score?: number;
  mood?: keyof typeof moodMap;
}) {
  const m = moodMap[mood];
  return (
    <div className="animate-fade-up rounded-3xl border border-border bg-card/95 p-5 shadow-cozy backdrop-blur">
      <div className="flex flex-wrap items-center gap-3">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-cozy">
          <div className="text-center leading-tight">
            <div className="text-xl font-bold">{score}</div>
            <div className="text-[10px] opacity-70">/ 100</div>
          </div>
        </div>
        <div className="flex-1">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Review summary</div>
          <div className="text-base font-semibold">Solid work — a few cozy improvements ahead</div>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${m.bg}`}
        >
          <span>{m.emoji}</span> {m.label}
        </span>
      </div>

      <ul className="mt-4 space-y-2.5">
        {issues.map((i) => (
          <li
            key={i.line}
            className="rounded-2xl border border-border bg-background p-3 text-sm"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-muted-foreground">
                Line {i.line}
              </span>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">
                {i.type}
              </span>
              <SeverityPill severity={i.severity} />
            </div>
            <p className="mt-2 font-medium">{i.message}</p>
            <p className="mt-1 text-muted-foreground">
              <span className="font-semibold text-foreground">Suggestion:</span> {i.suggestion}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SeverityPill({ severity }: { severity: Issue["severity"] }) {
  const styles = {
    low: "bg-mint/60 text-accent-foreground",
    medium: "bg-butter/60 text-foreground",
    high: "bg-blush/70 text-foreground",
  } as const;
  return (
    <span className={`rounded-full px-2 py-0.5 capitalize ${styles[severity]}`}>
      {severity}
    </span>
  );
}
