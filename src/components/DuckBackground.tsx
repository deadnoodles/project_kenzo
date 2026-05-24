import duckBg from "@/assets/duck-bg.jpg";

/**
 * Soft decorative duck silhouette behind page content.
 * Faded, large, non-distracting — sits at low opacity, low z-index.
 * Replace src/assets/duck-bg.jpg with another soft duck artwork to swap.
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
        className="absolute -right-40 -bottom-32 w-[min(120vw,1500px)] opacity-70 mix-blend-multiply dark:mix-blend-soft-light dark:opacity-30 select-none animate-drift"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse at 60% 55%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 80%)",
          maskImage:
            "radial-gradient(ellipse at 60% 55%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 80%)",
        }}
      />
      {/* Soft pastel light bloom */}
      <div className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full bg-sky/40 blur-3xl" />
      <div className="absolute top-1/3 -right-32 h-[440px] w-[440px] rounded-full bg-mint/30 blur-3xl" />
    </div>
  );
}
