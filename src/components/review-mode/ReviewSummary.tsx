import { countBySeverity, type ReviewIssue } from "@/lib/review-api";

type Props = {
  issues: ReviewIssue[];
};

export function ReviewSummary({ issues }: Props) {
  const counts = countBySeverity(issues);
  const total = issues.length;

  if (total === 0) return null;

  return (
    <div className="animate-fade-up rounded-3xl border border-border bg-card/90 p-4 shadow-cozy sketch-border backdrop-blur">
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Review summary
      </div>
      <p className="mt-1 font-display text-lg">
        {total} note{total === 1 ? "" : "s"} from Kenzo
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <SummaryPill label="High" count={counts.high} className="severity-high-bg" />
        <SummaryPill label="Medium" count={counts.medium} className="severity-medium-bg" />
        <SummaryPill label="Low" count={counts.low} className="severity-low-bg" />
      </div>
    </div>
  );
}

function SummaryPill({
  label,
  count,
  className,
}: {
  label: string;
  count: number;
  className: string;
}) {
  if (count === 0) return null;
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${className}`}>
      {label}: {count}
    </span>
  );
}
