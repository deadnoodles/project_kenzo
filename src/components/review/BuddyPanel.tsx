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
    <div className="flex h-full w-full min-w-0 flex-col rounded-2xl border border-border bg-card/80 p-3 shadow-cozy backdrop-blur">
      <h2 className="shrink-0 px-1 pt-1 font-display text-base font-semibold">
        Kenzo
      </h2>

      <div className="relative mt-3 flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-primary/10 to-background px-2 py-4">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-4 bottom-10 h-20 rounded-full bg-primary/15 blur-2xl animate-buddy-glow"
        />

        <div className="flex min-h-0 flex-1 items-end justify-center pb-8">
          <KenzoMascot size="md" className="h-52 w-52 animate-float-soft" />
        </div>
      </div>

      {showBubble ? (
        <div className="mt-3 shrink-0">
          <BuddySpeechBubble text={message} />
        </div>
      ) : null}
    </div>
  );
}