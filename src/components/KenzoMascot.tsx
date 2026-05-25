import buddy from "@/assets/buddy.png";

export type KenzoMascotSize = "sm" | "md" | "lg";

const sizeClasses: Record<KenzoMascotSize, string> = {
  sm: "h-24 w-24",
  md: "h-40 w-40",
  lg: "h-56 w-56",
};

type Props = {
  size?: KenzoMascotSize;
  className?: string;
  /** Override with a custom PNG/GIF path when ready */
  imageSrc?: string;
  /** Future: pass a video src to render MP4 instead of image */
  videoSrc?: string;
  alt?: string;
};

/**
 * Kenzo mascot — swap assets without touching layout shells.
 * Default: src/assets/buddy.png
 */
export function KenzoMascot({
  size = "md",
  className = "",
  imageSrc,
  videoSrc,
  alt = "Kenzo the duck buddy",
}: Props) {
  const dimension = sizeClasses[size];

  if (videoSrc) {
    return (
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className={`${dimension} object-contain drop-shadow-[0_12px_20px_rgba(59,42,34,0.2)] ${className}`}
        aria-label={alt}
      />
    );
  }

  return (
    <img
      src={imageSrc ?? buddy}
      alt={alt}
      width={768}
      height={768}
      loading="lazy"
      className={`${dimension} object-contain drop-shadow-[0_12px_20px_rgba(59,42,34,0.2)] ${className}`}
    />
  );
}
