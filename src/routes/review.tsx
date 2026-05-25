import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FilePlus2 } from "lucide-react";
import { DuckBackground } from "@/components/DuckBackground";
import { AppNav } from "@/components/AppNav";
import { ReviewInput } from "@/components/review-mode/ReviewInput";
import { CodeViewer } from "@/components/review-mode/CodeViewer";
import { IssueInspector } from "@/components/review-mode/IssueInspector";
import { ReviewSummary } from "@/components/review-mode/ReviewSummary";
import { fetchCodeReview, pickPrimaryIssue, type ReviewData } from "@/lib/review-api";

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

function ReviewModePage() {
  const [draft, setDraft] = useState("");
  const [review, setReview] = useState<ReviewData | null>(null);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  const selectedIssue = useMemo(
    () => review?.issues.find((i) => i.id === selectedIssueId) ?? null,
    [review, selectedIssueId],
  );

  const handleReview = async () => {
    setReviewError(null);
    setIsReviewing(true);

    const result = await fetchCodeReview(draft);

    setIsReviewing(false);

    if (!result.ok) {
      setReviewError(result.error);
      return;
    }

    setReview(result.data);
    const first = pickPrimaryIssue(result.data.issues) ?? result.data.issues[0];
    setSelectedIssueId(first?.id ?? null);
  };

  const hasResults = !!review && review.code.length > 0;

  const resetReview = () => {
    setReview(null);
    setSelectedIssueId(null);
    setReviewError(null);
  };

  return (
    <div className="relative min-h-screen">
      <DuckBackground />
      <AppNav />

      <main className="mx-auto w-full max-w-[1240px] px-6 pb-16">
        <div className="mb-8 animate-fade-up text-center md:text-left">
          <span className="inline-flex rounded-full bg-dusty-blue/40 px-3 py-1 text-xs font-medium text-foreground">
            Review Mode — AI highlights, inspector on click
          </span>
          <h1 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
            Visual code review
          </h1>
          <p className="mt-2 mx-auto max-w-2xl text-muted-foreground md:mx-0">
            Paste code for a live review from Kenzo. Click any highlight — the
            inspector on the right explains that exact line.
          </p>
        </div>

        {!hasResults ? (
          <ReviewInput
            value={draft}
            onChange={setDraft}
            onReview={handleReview}
            isReviewing={isReviewing}
            error={reviewError}
          />
        ) : (
          <section className="space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <ReviewSummary issues={review.issues} />
              </div>
              <button
                type="button"
                onClick={resetReview}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-gold/50 bg-gold/20 px-5 py-2.5 text-sm font-semibold text-foreground shadow-cozy transition hover:-translate-y-0.5 hover:bg-gold/35 hover:shadow-float"
              >
                <FilePlus2 className="h-4 w-4" />
                Review new code
              </button>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8">
              <div className="min-w-0">
                <CodeViewer
                  code={review.code}
                  issues={review.issues}
                  selectedIssueId={selectedIssueId}
                  onSelectIssue={setSelectedIssueId}
                />
              </div>

              <IssueInspector issue={selectedIssue} hasReview />
            </div>

            {review.issues.length === 0 ? (
              <p className="rounded-2xl border border-border bg-card/80 px-4 py-3 text-sm text-muted-foreground">
                Kenzo finished but didn&apos;t flag specific lines. Try Chat Mode
                for a conversational review, or paste a longer snippet.
              </p>
            ) : null}
          </section>
        )}
      </main>
    </div>
  );
}
