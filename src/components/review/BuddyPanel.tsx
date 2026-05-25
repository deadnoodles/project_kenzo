import { KenzoMascot } from "@/components/KenzoMascot";
import { BuddySpeechBubble } from "./BuddySpeechBubble";
import { useAppSettings } from "@/hooks/use-app-settings";

type Props = {
  message?: string;
};


export function BuddyPanel() {
  return (
    <div className="flex h-[82vh] max-h-[720px] w-full flex-col rounded-2xl border border-border bg-card/80 p-4 shadow-cozy">
      <h2 className="font-display text-base font-semibold">Kenzo</h2>

      <div className="mt-4 flex flex-1 items-end justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-primary/10 to-background p-4">
        <KenzoMascot size="md" className="h-48 w-48 animate-float-soft" />
      </div>
    </div>
  );
}