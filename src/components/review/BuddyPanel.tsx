import { KenzoMascot } from "@/components/KenzoMascot";
import { BuddySpeechBubble } from "./BuddySpeechBubble";
import { useAppSettings } from "@/hooks/use-app-settings";

type Props = {
  message?: string;
};

export function BuddyPanel({ message = "" }: Props) {
  const { settings } = useAppSettings();
  const showBubble = settings.showKenzoHelperBubble && message.trim().length > 0;

  return (
    <div className="flex w-full min-h-[min(78vh,920px)] flex-col rounded-2xl border border-border bg-card/80 p-4 shadow-cozy backdrop-blur">
      <h2 className="shrink-0 font-display text-base font-semibold">Kenzo</h2>

      <div className="relative mt-4 flex min-h-[480px] flex-1 flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-primary/15 to-background px-2 py-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-3 bottom-8 h-20 rounded-full bg-primary/20 blur-2xl animate-buddy-glow"
        />
        <div className="flex flex-1 items-end justify-center pb-6">
          <KenzoMascot size="md" className="h-64 w-64 animate-float-soft" />
        </div>
      </div>

      {showBubble ? (
        <div className="mt-4 shrink-0">
          <BuddySpeechBubble text={message} />
        </div>
      ) : null}
    </div>
  );
}
