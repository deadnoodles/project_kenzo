import { KenzoMascot } from "@/components/KenzoMascot";
import type { ReviewIssue } from "@/lib/review-api";

type Props = {
  issue: ReviewIssue | null;
};

export function KenzoDialogueBox({ issue }: Props) {
  const defaultLine =
    "Click a highlighted section and I'll explain what I'm side-eyeing.";

  const dialogue =
    issue?.buddyMessage?.trim() ||
    issue?.explanation?.trim() ||
    defaultLine;

  const suggestion = issue?.suggestion?.trim();

  return (
    <div
      key={issue?.id ?? "default"}
      className="animate-fade-up rounded-xl border-[3px] border-cream bg-[#1a1411] p-4 shadow-float"
      role="region"
      aria-label="Kenzo dialogue"
    >
      <div className="flex gap-3 sm:gap-4">
        <div className="shrink-0 rounded-lg border-2 border-cream/30 bg-[#2b211d] p-1">
          <KenzoMascot size="sm" className="h-20 w-20" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-gold">
            Kenzo
          </p>
          <p className="mt-2 font-mono text-sm leading-relaxed text-cream sm:text-[15px]">
            {dialogue}
          </p>
          {suggestion ? (
            <p className="mt-3 font-mono text-xs leading-relaxed text-cream/75 sm:text-sm">
              <span className="font-bold text-gold">Suggestion:</span>{" "}
              {suggestion}
            </p>
          ) : null}
        </div>
      </div>
      <p
        className="mt-3 text-center font-mono text-xs text-cream/45"
        aria-hidden
      >
        ▼
      </p>
    </div>
  );
}
