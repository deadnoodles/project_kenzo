import { KenzoMascot } from "@/components/KenzoMascot";
import { BuddySpeechBubble } from "./BuddySpeechBubble";

/**
 * BuddyPanel — Kenzo's cozy little room.
 *
 * 🔧 To replace the buddy asset:
 *   - Drop a new file in src/assets/ (png, gif, or mp4)
 *   - For PNG/GIF: swap the import below.
 *   - For MP4: replace the <img/> with:
 *       <video src={buddyMp4} autoPlay loop muted playsInline className="h-full w-auto" />
 */
export function BuddyPanel({ message }: { message: string }) {
  return (
    <div className="flex h-full flex-col rounded-[2rem] border border-border bg-card/80 p-5 shadow-cozy backdrop-blur">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg">Kenzo Buddy</h2>
        <span className="rounded-full bg-mint/60 px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
          online
        </span>
      </div>

      {/* Cozy room */}
      <div className="relative mt-4 flex-1 overflow-hidden rounded-3xl bg-gradient-to-b from-sky/50 to-background p-4">
        {/* Warm glow behind the buddy */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-12 bottom-6 h-32 rounded-full bg-primary/30 blur-3xl animate-buddy-glow"
        />

        {/* Floating decorations */}
        <Decor className="left-4 top-4" delay="0s">✨</Decor>
        <Decor className="right-5 top-8" delay="1.2s">⭐</Decor>
        <Decor className="left-8 bottom-24" delay="2.4s">·</Decor>
        <Decor className="right-10 bottom-32" delay="0.6s">○</Decor>
        <Decor className="right-2 top-1/2" delay="1.8s">✦</Decor>

        {/* Buddy display area — replace with png/gif/mp4 */}
        <div className="absolute inset-x-0 bottom-2 grid place-items-center">
          <div className="animate-float-soft">
            <KenzoMascot size="lg" className="h-72 w-72" />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <BuddySpeechBubble text={message} />
      </div>
    </div>
  );
}

function Decor({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: string;
}) {
  return (
    <span
      className={`pointer-events-none absolute text-base text-foreground/30 animate-float-soft ${className}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </span>
  );
}
