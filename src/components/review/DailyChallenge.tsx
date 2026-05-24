import { useState } from "react";
import { Puzzle } from "lucide-react";

const snippet = `const nums = [1, 2, 3];
nums.forEach((n) => sum += n);
console.log(sum);`;

const options = [
  { id: "a", label: "`sum` is never declared" },
  { id: "b", label: "`forEach` returns the sum" },
  { id: "c", label: "`console.log` is misspelled" },
];
const correct = "a";

export function DailyChallenge() {
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <div className="rounded-3xl border border-border bg-butter/30 p-5 shadow-cozy backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-card">
          <Puzzle className="h-4 w-4 text-foreground/80" />
        </span>
        <div>
          <div className="text-sm font-semibold">Daily Bug Challenge</div>
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
            Spot the tiny bug
          </div>
        </div>
      </div>

      <pre className="mt-3 overflow-x-auto rounded-2xl bg-code-bg p-3 text-xs text-code-fg">
        <code>{snippet}</code>
      </pre>

      <div className="mt-3 space-y-2">
        {options.map((o) => {
          const isPicked = picked === o.id;
          const isCorrect = o.id === correct;
          const state =
            picked === null
              ? "bg-card hover:bg-muted"
              : isPicked && isCorrect
              ? "bg-mint/70"
              : isPicked && !isCorrect
              ? "bg-blush/60"
              : isCorrect
              ? "bg-mint/40"
              : "bg-card opacity-70";
          return (
            <button
              key={o.id}
              disabled={picked !== null}
              onClick={() => setPicked(o.id)}
              className={`block w-full rounded-2xl border border-border px-3 py-2 text-left text-sm transition ${state}`}
            >
              {o.label}
            </button>
          );
        })}
      </div>

      {picked && (
        <p className="mt-3 animate-fade-up text-sm">
          {picked === correct
            ? "🌟 Yes! `sum` was never declared. Nice catch, buddy!"
            : "💛 Close! The real bug is that `sum` was never declared."}
        </p>
      )}
    </div>
  );
}
