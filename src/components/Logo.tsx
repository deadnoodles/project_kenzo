import { Link } from "@tanstack/react-router";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const text = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-xl";
  const dot = size === "lg" ? "h-9 w-9" : size === "sm" ? "h-7 w-7" : "h-8 w-8";
  return (
    <Link to="/" className="inline-flex items-center gap-2 group">
      <span
        className={`${dot} rounded-2xl bg-primary grid place-items-center shadow-cozy transition-transform group-hover:rotate-[-6deg]`}
      >
        <span className="text-base">🦆</span>
      </span>
      <span className={`${text} font-display font-semibold tracking-tight`}>
        Kenzo Buddy
      </span>
    </Link>
  );
}
