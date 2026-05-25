import {
  pickPrimaryIssue,
  type ReviewIssue,
} from "@/lib/review-api";

type Props = {
  code: string;
  issues: ReviewIssue[];
  selectedIssueId: string | null;
  onSelectIssue: (id: string) => void;
};

function severityClass(severity: ReviewIssue["severity"], selected: boolean) {
  const map = {
    low: "bg-dusty-blue/35 text-code-fg ring-dusty-blue/50",
    medium: "bg-gold/30 text-code-fg ring-gold/45",
    high: "bg-blush/40 text-code-fg ring-blush/50",
  } as const;
  const base = map[severity];
  return selected
    ? `${base} ring-2`
    : `${base} hover:brightness-110`;
}

export function CodeViewer({
  code,
  issues,
  selectedIssueId,
  onSelectIssue,
}: Props) {
  const lines = code.split("\n");

  const issueByLine = new Map<number, ReviewIssue[]>();
  for (const issue of issues) {
    for (let line = issue.startLine; line <= issue.endLine; line++) {
      const content = lines[line - 1];
      if (!content?.trim()) continue;

      const list = issueByLine.get(line) ?? [];
      list.push(issue);
      issueByLine.set(line, list);
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-code-bg shadow-cozy sketch-border">
      <div className="border-b border-border/30 bg-code-bg/80 px-4 py-2 text-xs text-code-fg/70">
        Click a highlighted line — Kenzo&apos;s dialogue appears below
      </div>
      <div className="max-h-[min(58vh,480px)] overflow-auto p-3">
        <table className="w-full border-collapse font-mono text-sm">
          <tbody>
            {lines.map((line, index) => {
              const lineNum = index + 1;
              const lineIssues = issueByLine.get(lineNum) ?? [];
              const primary = pickPrimaryIssue(lineIssues);
              const highlighted = !!primary;
              const selected =
                primary && selectedIssueId === primary.id;

              return (
                <tr
                  key={lineNum}
                  className={
                    highlighted
                      ? "cursor-pointer transition"
                      : "text-code-fg/90"
                  }
                >
                  <td className="w-10 select-none pr-3 text-right align-top text-xs text-code-fg/40">
                    {lineNum}
                  </td>
                  <td
                    className={`align-top whitespace-pre rounded-md px-2 py-0.5 ${
                      highlighted && primary
                        ? severityClass(primary.severity, !!selected)
                        : ""
                    }`}
                    onClick={() => {
                      if (primary) onSelectIssue(primary.id);
                    }}
                    onKeyDown={(e) => {
                      if (primary && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        onSelectIssue(primary.id);
                      }
                    }}
                    role={highlighted ? "button" : undefined}
                    tabIndex={highlighted ? 0 : undefined}
                    aria-pressed={selected || undefined}
                  >
                    {line || " "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
