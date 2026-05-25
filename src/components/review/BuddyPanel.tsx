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
    <div className="flex h-full flex-col rounded-[2rem] border border-border bg-card/80 p-6 shadow-cozy backdrop-blur">
      <h2 className="font-display text-xl">Kenzo</h2>

      <div className="relative mt-5 flex flex-1 flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-primary/15 to-background p-5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-10 bottom-8 h-28 rounded-full bg-primary/25 blur-3xl animate-buddy-glow"
        />
        <div className="flex flex-1 items-end justify-center pb-2">
          <KenzoMascot size="lg" className="h-72 w-72 animate-float-soft" />
        </div>
      </div>

      {showBubble ? (
        <div className="mt-5">
          <BuddySpeechBubble text={message} />
        </div>
      ) : null}
    </div>
  );
}
