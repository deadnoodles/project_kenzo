import duckBg from "@/assets/duck-bg.jpg";

/**
 * Faint decorative duck silhouette + animated code particles.
 * Very low opacity — sits behind main content, not distracting.
 */
export function DuckBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />

      <img
        src={duckBg}
        alt=""
        width={1536}
        height={1536}
        className="absolute -right-32 -bottom-24 w-[min(110vw,1400px)] opacity-[0.07] mix-blend-multiply select-none animate-drift dark:opacity-[0.05] dark:mix-blend-soft-light"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse at 55% 50%, rgba(0,0,0,0.9) 25%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0) 72%)",
          maskImage:
            "radial-gradient(ellipse at 55% 50%, rgba(0,0,0,0.9) 25%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0) 72%)",
        }}
      />

      {/* Soft blooms — dusty blue & cream, not saturated yellow */}
      <div className="absolute -top-48 -left-40 h-[480px] w-[480px] rounded-full bg-dusty-blue/25 blur-3xl animate-pulse-slow" />
      <div
        className="absolute top-1/4 -right-40 h-[400px] w-[400px] rounded-full bg-cream/40 blur-3xl dark:bg-brown/15 animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />

      {/* Faint code doodle marks */}
      <svg
        className="absolute left-[8%] top-[18%] h-32 w-32 opacity-[0.04] text-foreground dark:opacity-[0.06] animate-float-slow"
        viewBox="0 0 120 80"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M10 20h40M10 35h28M10 50h36" strokeLinecap="round" />
        <path d="M70 15c12 0 22 10 22 22s-10 22-22 22" />
      </svg>

      {/* Floating code particles */}
      <div
        className="absolute right-[15%] top-[10%] text-2xl opacity-[0.03] dark:opacity-[0.05] animate-float-slow font-mono text-primary"
        style={{ animationDelay: "0.5s" }}
      >
        {'{ }'}
      </div>
      <div
        className="absolute left-[12%] bottom-[30%] text-2xl opacity-[0.03] dark:opacity-[0.05] animate-float-slow font-mono text-primary"
        style={{ animationDelay: "1s" }}
      >
        &lt;/&gt;
      </div>
      <div
        className="absolute right-[8%] bottom-[15%] text-2xl opacity-[0.03] dark:opacity-[0.05] animate-float-slow font-mono text-primary"
        style={{ animationDelay: "2.5s" }}
      >
        const
      </div>
      <div
        className="absolute left-[20%] top-[25%] text-2xl opacity-[0.03] dark:opacity-[0.05] animate-float-slow font-mono text-primary"
        style={{ animationDelay: "3.5s" }}
      >
        debug
      </div>
    </div>
  );
}
