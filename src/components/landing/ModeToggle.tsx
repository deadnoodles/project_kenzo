import { motion } from "framer-motion";
import { ScanSearch, MessagesSquare } from "lucide-react";

export type HeroMode = "review" | "chat";

type Props = {
  mode: HeroMode;
  onChange: (mode: HeroMode) => void;
};

const options = [
  { id: "review" as const, label: "Review", icon: ScanSearch },
  { id: "chat" as const, label: "Chat", icon: MessagesSquare },
];

export function ModeToggle({ mode, onChange }: Props) {
  const activeIndex = mode === "review" ? 0 : 1;

  return (
    <div
      className="relative inline-grid grid-cols-2 rounded-full border border-border bg-card/80 p-1 shadow-cozy"
      role="tablist"
      aria-label="Preview mode"
    >
      <motion.div
        className="absolute inset-y-1 rounded-full bg-gold/35 ring-1 ring-gold/40"
        style={{ width: "calc(50% - 4px)", left: 4 }}
        animate={{ x: activeIndex === 0 ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 400, damping: 34 }}
      />
      {options.map(({ id, label, icon: Icon }) => {
        const active = mode === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(id)}
            className={`relative z-10 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
