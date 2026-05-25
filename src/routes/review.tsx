import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DuckBackground } from "@/components/DuckBackground";
import { AppNav } from "@/components/AppNav";
import { ReviewInput } from "@/components/review-mode/ReviewInput";
import { CodeViewer } from "@/components/review-mode/CodeViewer";
import { IssueInspector } from "@/components/review-mode/IssueInspector";
import { ReviewSummary } from "@/components/review-mode/ReviewSummary";
import { KenzoDialogueBox } from "@/components/review-mode/KenzoDialogueBox";
import { fetchCodeReview, pickPrimaryIssue, type ReviewData } from "@/lib/review-api";

export const Route = createFileRoute("/review")({
  head: () => ({
    meta: [
      { title: "Review Mode — Kenzo Buddy" },
      {
        name: "description",
        content:
          "Visual code review with highlighted lines and Kenzo's dialogue explanations.",
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
            Review Mode — AI highlights, dialogue on click
          </span>
          <h1 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
            Visual code review
          </h1>
          <p className="mt-2 mx-auto max-w-2xl text-muted-foreground md:mx-0">
            Paste code for a live review from Kenzo. Click any highlight — the
            dialogue box below explains that exact line.
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
            <ReviewSummary issues={review.issues} />

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-8">
              <div className="min-w-0 space-y-4">
                <CodeViewer
                  code={review.code}
                  issues={review.issues}
                  selectedIssueId={selectedIssueId}
                  onSelectIssue={setSelectedIssueId}
                />
                <KenzoDialogueBox issue={selectedIssue} />
                <button
                  type="button"
                  onClick={resetReview}
                  className="text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                >
                  ← Paste different code
                </button>
              </div>

              <div className="lg:sticky lg:top-6 lg:self-start">
                <IssueInspector issue={selectedIssue} hasReview />
              </div>
            </div>

            {review.issues.length === 0 ? (
              <p className="rounded-2xl border border-border bg-card/80 px-4 py-3 text-sm text-muted-foreground">
                Kenzo finished but didn&apos;t flag specific lines. Try Chat Mode
                for a conversational review, or paste a longer snippet.
              </p>
            ) : null}
          </section>
        )}

        {!hasResults && (
          <div className="mt-6 max-w-xl">
            <KenzoDialogueBox issue={null} />
          </div>
        )}
      </main>
    </div>
  );
}
