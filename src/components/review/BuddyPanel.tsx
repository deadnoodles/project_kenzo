import { useAppSettings } from "@/hooks/use-app-settings";

interface BuddyPanelProps {
  message?: string;
}

export function BuddyPanel({ message }: BuddyPanelProps) {
  const { settings } = useAppSettings();

  return (
    <div className="flex flex-col gap-3">
      {/* Mascot */}
      <div className="flex justify-center">
        <img
          src="/kenzo-mascot.png"
          alt="Kenzo"
          className="h-32 w-32 object-contain"
        />
      </div>

      {/* Message bubble */}
      {message && (
        <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
          {message}
        </div>
      )}
    </div>
  );
}
