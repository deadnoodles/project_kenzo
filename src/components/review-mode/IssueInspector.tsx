import { Link } from "@tanstack/react-router";
import { MessagesSquare } from "lucide-react";
import { KenzoMascot } from "@/components/KenzoMascot";
import type { ReviewIssue } from "@/lib/review-api";

function SeverityBadge({ severity }: { severity: ReviewIssue["severity"] }) {
  const label = severity.charAt(0).toUpperCase() + severity.slice(1);
  const cls =
    severity === "low"
      ? "severity-low-bg"
      : severity === "medium"
        ? "severity-medium-bg"
        : "severity-high-bg";
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}>
      {label}
    </span>
  );
}

type Props = {
  issue: ReviewIssue | null;
  hasReview: boolean;
};

export function IssueInspector({ issue, hasReview }: Props) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-border bg-card/90 p-5 shadow-cozy sketch-border backdrop-blur">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg">Kenzo</h2>
        <span className="rounded-full bg-dusty-blue/50 px-2.5 py-0.5 text-xs font-medium text-foreground">
          {hasReview ? "on watch" : "idle"}
        </span>
      </div>

      <div className="relative mt-4 overflow-hidden rounded-2xl bg-gradient-to-b from-dusty-blue/25 to-background p-4">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-6 bottom-12 h-20 rounded-full bg-gold/15 blur-2xl animate-buddy-glow"
        />
        <div className="flex justify-center py-2">
          <KenzoMascot size="md" className="animate-float-soft" />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {issue ? (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <SeverityBadge severity={issue.severity} />
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs capitalize text-muted-foreground">
                {issue.type}
              </span>
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              Line {issue.startLine}
              {issue.endLine > issue.startLine ? `–${issue.endLine}` : ""}
            </p>
            <h3 className="text-sm font-semibold leading-snug">{issue.title}</h3>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            {hasReview
              ? "Select a highlight — full story is in the dialogue box."
              : "Paste code and hit Review."}
          </p>
        )}

        <Link
          to="/app"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary"
        >
          <MessagesSquare className="h-4 w-4" />
          Ask Kenzo in Chat
        </Link>
      </div>
    </div>
  );
}
