import { ScanSearch } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onReview: () => void;
  isReviewing?: boolean;
  disabled?: boolean;
  error?: string | null;
};

export function ReviewInput({
  value,
  onChange,
  onReview,
  isReviewing = false,
  disabled = false,
  error = null,
}: Props) {
  return (
    <div className="rounded-3xl border border-border bg-card/90 p-5 shadow-cozy sketch-border backdrop-blur">
      <label htmlFor="review-code" className="font-display text-lg text-foreground">
        Paste your code
      </label>
      <p className="mt-1 text-sm text-muted-foreground">
        Kenzo runs a real AI review — then click highlights for line-by-line dialogue.
      </p>
      {error ? (
        <p className="mt-3 rounded-2xl border border-blush/50 bg-blush/20 px-3 py-2 text-sm text-foreground">
          {error}
        </p>
      ) : null}
      <textarea
        id="review-code"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || isReviewing}
        rows={14}
        placeholder={`function login(user) {
  if (!user.email) return null;
  validateUser(user);
  return api.post("/login", user);
}`}
        className="mt-4 w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 font-mono text-sm leading-relaxed text-foreground outline-none ring-ring placeholder:text-muted-foreground focus:ring-2 disabled:opacity-60"
      />
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onReview}
          disabled={disabled || !value.trim() || isReviewing}
          className="btn-primary py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
        >
          <ScanSearch className="h-4 w-4" />
          {isReviewing ? "Kenzo is reviewing…" : "Review"}
        </button>
        {isReviewing ? (
          <span className="text-sm text-muted-foreground animate-pulse">
            Talking to the backend…
          </span>
        ) : null}
      </div>
    </div>
  );
}
