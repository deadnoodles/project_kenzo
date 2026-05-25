export type IssueSeverity = "low" | "medium" | "high";

export type ReviewIssue = {
  id: string;
  startLine: number;
  endLine: number;
  severity: IssueSeverity;
  type: string;
  title: string;
  explanation: string;
  suggestion: string;
  buddyMessage: string;
};

export type ReviewData = {
  code: string;
  issues: ReviewIssue[];
  buddyBubble?: string;
};

type BackendIssue = {
  line?: number;
  startLine?: number;
  endLine?: number;
  severity?: string;
  type?: string;
  message?: string;
  suggestion?: string;
  title?: string;
  explanation?: string;
  buddyMessage?: string;
};

type BackendReviewResponse = {
  reply?: string;
  issues?: BackendIssue[];
  buddyBubble?: string;
};

const SEVERITY_RANK: Record<IssueSeverity, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

function normalizeSeverity(value?: string): IssueSeverity {
  const v = (value ?? "low").toLowerCase();
  if (v === "high" || v === "medium") return v;
  return "low";
}

/** Map one backend issue into frontend shape; returns null if line data is invalid. */
export function mapBackendIssue(
  raw: BackendIssue,
  index: number,
  lineCount: number,
): ReviewIssue | null {
  const startLine = raw.startLine ?? raw.line;
  if (startLine == null || !Number.isFinite(startLine)) return null;

  const start = Math.round(startLine);
  const endRaw = raw.endLine ?? start;
  const end = Math.max(start, Math.round(endRaw));

  if (start < 1 || start > lineCount || end < 1 || end > lineCount) return null;

  const message = (raw.message ?? raw.title ?? "").trim();
  const suggestion = (raw.suggestion ?? "").trim();
  if (!message && !suggestion) return null;

  return {
    id: `issue-${index}-${start}`,
    startLine: start,
    endLine: end,
    severity: normalizeSeverity(raw.severity),
    type: (raw.type ?? "maintainability").trim(),
    title: message || suggestion,
    explanation: (raw.explanation ?? message).trim(),
    suggestion,
    buddyMessage: (raw.buddyMessage ?? message).trim(),
  };
}

/** Drop issues that only point at empty lines; keep issues with at least one non-empty line. */
export function filterIssuesForCode(code: string, issues: ReviewIssue[]): ReviewIssue[] {
  const lines = code.split("\n");
  return issues.filter((issue) => {
    for (let ln = issue.startLine; ln <= issue.endLine; ln++) {
      const text = lines[ln - 1];
      if (text?.trim()) return true;
    }
    return false;
  });
}

export function pickPrimaryIssue(issues: ReviewIssue[]): ReviewIssue | undefined {
  if (issues.length === 0) return undefined;
  return [...issues].sort(
    (a, b) => SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity],
  )[0];
}

export function countBySeverity(issues: ReviewIssue[]) {
  return issues.reduce(
    (acc, issue) => {
      acc[issue.severity] += 1;
      return acc;
    },
    { low: 0, medium: 0, high: 0 },
  );
}

const REVIEW_API = "http://localhost:3001/api/review";

export type FetchReviewResult =
  | { ok: true; data: ReviewData }
  | { ok: false; error: string };

export async function fetchCodeReview(code: string): Promise<FetchReviewResult> {
  const trimmed = code.trim();
  if (!trimmed) {
    return { ok: false, error: "Paste some code first." };
  }

  const lineCount = trimmed.split("\n").length;

  try {
    const response = await fetch(REVIEW_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reviewMode: true,
        message:
          "Review Mode: review the pasted code only. Return issues with accurate 1-based line numbers for the Code block.",
        code: trimmed,
        chatHistory: [],
      }),
    });

    const data = (await response.json()) as BackendReviewResponse;

    if (!response.ok) {
      return {
        ok: false,
        error:
          data.reply ??
          "Kenzo couldn't reach the review server. Is the backend running on port 3001?",
      };
    }

    const mapped = (data.issues ?? [])
      .map((raw, i) => mapBackendIssue(raw, i, lineCount))
      .filter((issue): issue is ReviewIssue => issue !== null);

    const issues = filterIssuesForCode(trimmed, mapped);

    return {
      ok: true,
      data: {
        code: trimmed,
        issues,
        buddyBubble: data.buddyBubble,
      },
    };
  } catch {
    return {
      ok: false,
      error:
        "Something went wrong while Kenzo was reviewing. Check that the backend is running and try again.",
    };
  }
}
