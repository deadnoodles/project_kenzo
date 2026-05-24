export type MockMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  code?: string;
  attachment?: { type: "image"; name: string };
  timestamp: number;
};

const codeReviewReplies = [
  "Not bad. I've seen worse. Two small things though: this function is juggling more than one job — pull the validation out — and the names could use a sharper edge.",
  "Clean enough. Still, I'd extract the inner logic into a helper so this stays focused on its real intent.",
  "Hmm. This works… but we can make it smarter. Add an early return for the error case and let the happy path breathe.",
  "I do admire the confidence here. Now let's improve the code too: type the parameters strictly and handle the empty-input edge case.",
];

const bugReplies = [
  "You're close. Let's tighten this up — that variable is being used before it's declared. Move the init just above the loop.",
  "Classic off-by-one. I'll let you guess which side. Check the loop bounds and the final return.",
  "The error is hiding in an unhandled async case. Wrap the call in try/catch and actually surface what went wrong.",
];

const conversationalReplies = [
  "Alright, I'm listening. Tell me what you're building and I'll walk you through it.",
  "Could you paste the snippet? I do my best work when I can actually see the code.",
  "Sure. What part feels off — or are we just here for the vibes?",
  "What outcome are you aiming for? Once I know the goal, I'll point you at the cleanest path.",
];

const greetingReplies = [
  "Hey. Ready when you are — paste something and let's see what we're working with.",
  "Hi. What are we reviewing today? Try to impress me.",
];

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function generateAssistantReply(userText: string, attachment?: { type: "image" }): string {
  if (attachment?.type === "image") {
    return "Thanks for the screenshot! Image-based code reading is coming soon. For now, paste the code as text and I'll give it a proper review.";
  }

  const text = userText.toLowerCase().trim();
  if (!text) return pick(conversationalReplies, Date.now());

  const seed = hash(text);

  if (/^(hi|hey|hello|yo|sup|gm|good (morning|evening))/.test(text)) {
    return pick(greetingReplies, seed);
  }

  if (/bug|error|broken|not working|fix|crash|throw/.test(text)) {
    return pick(bugReplies, seed);
  }

  if (/function|const|let|class|=>|return|import|export|```/.test(text) || /\n/.test(userText)) {
    return pick(codeReviewReplies, seed);
  }

  return pick(conversationalReplies, seed);
}

export function extractCode(text: string): string | undefined {
  const fenced = text.match(/```[\w]*\n?([\s\S]*?)```/);
  if (fenced) return fenced[1].trim();
  if (/\n/.test(text) && /[{};=]|function |const |let |class /.test(text)) {
    return text;
  }
  return undefined;
}

export function deriveTitle(text: string): string {
  const clean = text.replace(/```[\s\S]*?```/g, "").trim();
  const firstLine = clean.split("\n")[0] || "New review";
  return firstLine.length > 40 ? firstLine.slice(0, 40) + "…" : firstLine;
}
