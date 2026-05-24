export function BuddySpeechBubble({ text }: { text: string }) {
  return (
    <div
      key={text}
      className="relative animate-pop-in rounded-3xl bg-primary/60 px-4 py-3 text-sm font-medium text-foreground shadow-cozy"
    >
      <span
        aria-hidden
        className="absolute -top-2 left-8 h-4 w-4 rotate-45 rounded-sm bg-primary/60"
      />
      {text}
    </div>
  );
}
