import type { ReviewIssue } from "@/lib/review-api";

type Props = {
  code: string;
  issues: ReviewIssue[];
  selectedIssueId: string | null;
  onSelectIssue: (id: string) => void;
};

function getLineIssues(issues: ReviewIssue[], lineNumber: number) {
  return issues.filter(
    (issue) => lineNumber >= issue.startLine && lineNumber <= issue.endLine,
  );
}

function getHighlightClass(issue?: ReviewIssue, selectedIssueId?: string | null) {
  if (!issue) return "";

  const isSelected = issue.id === selectedIssueId;

  if (issue.severity === "high") {
    return isSelected
      ? "bg-primary/30 ring-2 ring-primary/55 dark:bg-blush/40 dark:ring-blush/50"
      : "bg-primary/18 ring-1 ring-primary/30 hover:bg-primary/25 dark:bg-blush/25 dark:ring-blush/35";
  }

  if (issue.severity === "medium") {
    return isSelected
      ? "bg-blue-pale/65 ring-2 ring-primary/45 dark:bg-primary/30 dark:ring-primary/45"
      : "bg-blue-pale/40 ring-1 ring-primary/25 hover:bg-blue-pale/55 dark:bg-primary/20 dark:ring-primary/30";
  }

  return isSelected
    ? "bg-muted/60 ring-2 ring-primary/35"
    : "bg-muted/35 ring-1 ring-border hover:bg-muted/50";
}

export function CodeViewer({
  code,
  issues,
  selectedIssueId,
  onSelectIssue,
}: Props) {
  const lines = code.split("\n");

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card/35  sketch-border dark:bg-card/35">
      <div className="border-b border-border bg-card/35 px-6 py-4 dark:bg-card/35">
        <p className="text-sm text-muted-foreground">
          Click a highlighted line — Kenzo explains in the inspector
        </p>
      </div>

      <pre className="max-h-[520px] overflow-auto bg-transparent p-6 font-mono text-sm leading-relaxed text-foreground dark:bg-code-bg/65 dark:text-code-fg">
        {lines.map((line, index) => {
          const lineNumber = index + 1;
          const lineIssues = getLineIssues(issues, lineNumber);
          const primaryIssue = lineIssues[0];
          const isClickable = !!primaryIssue;

          return (
            <div key={`${lineNumber}-${line}`} className="flex min-w-max gap-4">
              <span className="w-8 shrink-0 select-none text-right text-foreground/45 dark:text-code-fg/40">
                {lineNumber}
              </span>

              <button
                type="button"
                disabled={!isClickable}
                onClick={() => {
                  if (primaryIssue) onSelectIssue(primaryIssue.id);
                }}
                className={`block min-h-[1.65rem] flex-1 rounded-lg px-2 text-left transition ${
                  isClickable
                    ? `cursor-pointer ${getHighlightClass(primaryIssue, selectedIssueId)}`
                    : "cursor-default"
                }`}
              >
                <code>{line || " "}</code>
              </button>
            </div>
          );
        })}
      </pre>
    </div>
  );
}