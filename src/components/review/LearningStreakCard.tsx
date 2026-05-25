import { Flame } from "lucide-react";
import { WidgetHideMenu } from "@/components/WidgetHideMenu";
import { useAppSettings } from "@/hooks/use-app-settings";

export function LearningStreakCard() {
  const { settings, setSetting } = useAppSettings();

  if (!settings.showLearningStreak) return null;

  return (
    <div className="relative rounded-3xl border border-border bg-primary/10 p-4">
      <div className="absolute right-2 top-2">
        <WidgetHideMenu
          onHide={() => setSetting("showLearningStreak", false)}
          label="Hide Learning Streak"
        />
      </div>
      <div className="flex items-center gap-2 pr-8 text-base font-semibold">
        <Flame className="h-4 w-4 text-primary" /> Learning streak
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        5 days in a row — nice progress!
      </p>
      <div className="mt-3 flex gap-1.5">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full ${
              i < 5 ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
