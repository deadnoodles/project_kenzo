import { Brain } from "lucide-react";

const items = [
  "clearer variable names",
  "smaller functions",
  "better error handling",
];

export function LearningMemory() {
  return (
    <div className="rounded-3xl border border-border bg-lilac/30 p-5 shadow-cozy backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-card">
          <Brain className="h-4 w-4 text-foreground/80" />
        </span>
        <div>
          <div className="text-sm font-semibold">Learning memory</div>
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
            Your personalized profile
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Kenzo noticed you often work on:
      </p>
      <ul className="mt-2 space-y-1.5">
        {items.map((i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
