import kenzoSad from "@/assets/kenzo_sad_fullbody.png";
import kenzoHappy from "@/assets/kenzo_happy_fullbody.png";
import kenzoObserving from "@/assets/kenzo_observing_fullbody.png";
import kenzoAngry from "@/assets/kenzo_angry_fullbody.png";

export type KenzoMood = "happy" | "sad" | "observing" | "angry";

type Props = {
  mood?: KenzoMood;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const moodImage: Record<KenzoMood, string> = {
  happy: kenzoHappy,
  sad: kenzoSad,
  observing: kenzoObserving,
  angry: kenzoAngry,
};

const sizeClass = {
  sm: "h-32 w-32",
  md: "h-64 w-64",
  lg: "h-[420px] w-[420px]",
};

export function KenzoMascot({
  mood = "happy",
  size = "md",
  className = "",
}: Props) {
  return (
    <img
      src={moodImage[mood]}
      alt="Kenzo"
      draggable={false}
      className={`${sizeClass[size]} object-contain ${className}`}
    />
  );
}