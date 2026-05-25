import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type CSSProperties } from "react";
import { FilePlus2 } from "lucide-react";
// import { DuckBackground } from "@/components/DuckBackground";
import { AppNav } from "@/components/AppNav";
import { ReviewInput } from "@/components/review-mode/ReviewInput";
import { CodeViewer } from "@/components/review-mode/CodeViewer";
import { IssueInspector } from "@/components/review-mode/IssueInspector";
import { ReviewSummary } from "@/components/review-mode/ReviewSummary";
import { AppBackground } from "@/components/AppBackground";

import {
  fetchCodeReview,
  pickPrimaryIssue,
  type ReviewData,
} from "@/lib/review-api";
import { useAppSettings } from "@/hooks/use-app-settings";

export const Route = createFileRoute("/review")({
  head: () => ({
    meta: [
      { title: "Review Mode — Kenzo Buddy" },
      {
        name: "description",
        content:
          "Visual code review with highlighted lines and Kenzo inspector explanations.",
      },
    ],
  }),
  component: ReviewModePage,
});

function buildChatHandoffMessage(code: string) {
  return `Explain further what I should improve here. Be practical, point out the risky parts, and give me a cleaner version if needed.

\`\`\`js
${code}
\`\`\``;
}

function ReviewModePage() {
  const { settings } = useAppSettings();

  const [draft, setDraft] = useState("");
  const [review, setReview] = useState<ReviewData | null>(null);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  const selectedIssue = useMemo(
    () => review?.issues.find((i) => i.id === selectedIssueId) ?? null,
    [review, selectedIssueId],
  );

  const hasResults = !!review && review.code.length > 0;

  const gridGap = settings.spaciousLayout ? "gap-12" : "gap-10";
  const leftColW = settings.spaciousLayout ? "820px" : "780px";
  const inspectorW = settings.spaciousLayout ? "420px" : "380px";

  const handleReview = async () => {
    if (!draft.trim()) {
      setReviewError("Paste some code first.");
      return;
    }

    setReviewError(null);
    setIsReviewing(true);

    const result = await fetchCodeReview(draft);

    setIsReviewing(false);

    if (!result.ok) {
      setReviewError(result.error);
      return;
    }

    setReview(result.data);

    const first =
      pickPrimaryIssue(result.data.issues) ?? result.data.issues[0] ?? null;

    setSelectedIssueId(first?.id ?? null);
  };

  const resetReview = () => {
    setReview(null);
    setSelectedIssueId(null);
    setReviewError(null);
  };

  const handleAskInChat = () => {
    if (!review?.code) return;

    const message = buildChatHandoffMessage(review.code);
    sessionStorage.setItem("kenzo_pending_chat_message", message);
  };

  return (
    <div className="relative min-h-screen">
      <AppBackground />
      <AppNav />

      <main className="mx-auto max-w-7xl px-6 pb-36 pt-4 md:px-8">
        <div className="mb-16 animate-fade-up text-center md:text-left">
          <span className="inline-flex rounded-full bg-primary/15 px-3 py-1 text-sm font-medium text-primary">
            Review Mode — AI highlights, inspector on click
          </span>

          <h1 className="mt-8 font-display text-4xl tracking-tight md:text-5xl">
            Visual code review
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:mx-0">
            Paste code for a live review from Kenzo. Click any highlight — the
            inspector on the right explains that exact line.
          </p>
        </div>

        {!hasResults ? (
          <div className="max-w-4xl">
            <ReviewInput
              value={draft}
              onChange={setDraft}
              onReview={handleReview}
              isReviewing={isReviewing}
              error={reviewError}
            />
          </div>
        ) : (
          <section>
            <div
              className={`grid ${gridGap} items-start justify-start lg:grid-cols-[var(--left)_var(--inspector)]`}
              style={
                {
                  "--left": leftColW,
                  "--inspector": inspectorW,
                } as CSSProperties
              }
            >
              <div className="min-w-0 w-full max-w-[820px] space-y-8">
                <div className="rounded-3xl border border-border bg-card/80 p-7 shadow-cozy sketch-border backdrop-blur">
                  <div className="flex flex-wrap items-start justify-between gap-5">
                    <div className="min-w-0 flex-1">
                      <ReviewSummary issues={review.issues} />
                    </div>

                    <button
                      type="button"
                      onClick={resetReview}
                      className="btn-primary shrink-0 border-2 border-primary/40"
                    >
                      <FilePlus2 className="h-4 w-4" />
                      Review new code
                    </button>
                  </div>
                </div>

                <CodeViewer
                  code={review.code}
                  issues={review.issues}
                  selectedIssueId={selectedIssueId}
                  onSelectIssue={setSelectedIssueId}
                />

                {review.issues.length === 0 ? (
                  <p className="rounded-2xl border border-border bg-card/80 px-5 py-4 text-base text-muted-foreground">
                    Kenzo finished but didn&apos;t flag specific lines. Try Chat
                    Mode for a conversational review, or paste a longer snippet.
                  </p>
                ) : null}
              </div>

              <div className="self-start">
                <IssueInspector
                  issue={selectedIssue}
                  hasReview={hasResults}
                  reviewScore={review.score}
                  allIssues={review.issues}
                  code={review.code}
                  onAskInChat={handleAskInChat}
                />
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}