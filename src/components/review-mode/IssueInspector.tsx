import { Link } from "@tanstack/react-router";
import { MessagesSquare } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
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
  const explanation =
    issue?.buddyMessage?.trim() ||
    issue?.explanation?.trim() ||
    null;
  const suggestion = issue?.suggestion?.trim();

  const idleText = hasReview
    ? "Click a highlighted line — I'll explain what's wrong and how to fix it."
    : "Paste code and hit Review. I'll flag lines worth a closer look.";

  return (
    <div className="flex min-h-[min(72vh,640px)] flex-col rounded-3xl border border-border bg-card/95 p-5 shadow-cozy sketch-border backdrop-blur lg:sticky lg:top-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg">Kenzo inspector</h2>
        <span className="rounded-full bg-dusty-blue/50 px-2.5 py-0.5 text-xs font-medium text-foreground">
          {hasReview ? "inspecting" : "idle"}
        </span>
      </div>

      <div className="relative mt-4 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-b from-dusty-blue/20 to-background p-3">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-4 bottom-8 h-16 rounded-full bg-primary/20 blur-2xl animate-buddy-glow"
        />
        <div className="flex justify-center">
          <KenzoMascot size="md" className="animate-float-soft h-36 w-36" />
        </div>
      </div>

      <div className="mt-4 flex min-h-0 flex-1 flex-col gap-3">
        {issue ? (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <SeverityBadge severity={issue.severity} />
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs capitalize text-muted-foreground">
                {issue.type}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                Line {issue.startLine}
                {issue.endLine > issue.startLine ? `–${issue.endLine}` : ""}
              </span>
            </div>
            <h3 className="text-base font-semibold leading-snug">{issue.title}</h3>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">{idleText}</p>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={issue?.id ?? "idle"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22 }}
            className="flex-1 overflow-y-auto rounded-2xl border border-primary/15 bg-blue-surface p-4"
          >
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
              Kenzo
            </p>
            <p className="mt-2 text-base leading-relaxed text-cream">
              {explanation ?? idleText}
            </p>
            {suggestion ? (
              <p className="mt-4 border-t border-cream/15 pt-3 text-base leading-relaxed text-cream/80">
                <span className="font-semibold text-primary">Suggestion:</span>{" "}
                {suggestion}
              </p>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <Link
          to="/app"
          className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2.5 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:bg-secondary hover:shadow-cozy"
        >
          <MessagesSquare className="h-4 w-4" />
          Ask Kenzo in Chat
        </Link>
      </div>
    </div>
  );
}
