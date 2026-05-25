import { KenzoMascot, type KenzoMood } from "@/components/KenzoMascot";

type Props = {
  mood?: KenzoMood;
};

export function BuddyPanel({ mood = "happy" }: Props) {
  return (
    <div className="flex h-[78vh] max-h-[760px] w-full flex-col rounded-3xl border border-border bg-card/80 p-4 shadow-cozy backdrop-blur">
      <h2 className="shrink-0 font-display text-lg font-semibold">
        Kenzo
      </h2>

      <div className="mt-4 flex min-h-0 flex-1 items-center justify-center rounded-3xl bg-gradient-to-b from-primary/10 to-background p-1">
        <KenzoMascot
          mood={mood}
          size="lg"
          className="scale-[1.65] animate-float-soft"
        />
      </div>
    </div>
  );
}