import { Settings } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useAppSettings } from "@/hooks/use-app-settings";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";

type Props = {
  triggerClassName?: string;
};

function SettingRow({
  id,
  label,
  description,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-muted/40 px-5 py-4">
      <div className="min-w-0 flex-1">
        <Label htmlFor={id} className="text-base font-semibold">
          {label}
        </Label>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

export function SettingsDialog({ triggerClassName = "" }: Props) {
  const { settings, setSetting } = useAppSettings();
  const { theme } = useTheme();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={`grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground/80 shadow-cozy transition hover:text-foreground hover:shadow-float ${triggerClassName}`}
          aria-label="Open settings"
          title="Settings"
        >
          <Settings className="h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md border-border bg-card sm:rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Settings</DialogTitle>
          <DialogDescription className="text-base">
            Customize Kenzo Buddy. Your choices are saved on this device.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-3">
          <SettingRow
            id="learning-streak"
            label="Show Learning Streak"
            description="Display the streak card in the chat sidebar."
            checked={settings.showLearningStreak}
            onCheckedChange={(v) => setSetting("showLearningStreak", v)}
          />
          <SettingRow
            id="daily-challenge"
            label="Show Daily Bug Challenge"
            description="Show the mini-game panel on the chat page."
            checked={settings.showDailyBugChallenge}
            onCheckedChange={(v) => setSetting("showDailyBugChallenge", v)}
          />
          <SettingRow
            id="kenzo-bubble"
            label="Show Kenzo helper bubble"
            description="Show speech-bubble text under the Kenzo mascot in chat."
            checked={settings.showKenzoHelperBubble}
            onCheckedChange={(v) => setSetting("showKenzoHelperBubble", v)}
          />
          <SettingRow
            id="spacious-layout"
            label="Spacious layout"
            description="Use wider spacing and roomier panels across the app."
            checked={settings.spaciousLayout}
            onCheckedChange={(v) => setSetting("spaciousLayout", v)}
          />
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-border bg-muted/40 px-4 py-3">
          <div>
            <p className="text-base font-semibold">Theme</p>
            <p className="text-sm text-muted-foreground capitalize">
              Currently {theme} mode
            </p>
          </div>
          <ThemeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
}
