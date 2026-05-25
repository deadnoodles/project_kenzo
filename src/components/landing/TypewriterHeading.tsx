import { useEffect, useState } from "react";
import type { HeroMode } from "./ModeToggle";

type Props = {
  mode: HeroMode;
};

const getTargetText = (mode: HeroMode) => {
  return mode === "review" ? "review together" : "code together";
};

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });

export function TypewriterHeading({ mode }: Props) {
  const targetText = getTargetText(mode);
  const [displayedText, setDisplayedText] = useState(targetText);

  useEffect(() => {
    let cancelled = false;

    const animate = async () => {
      // erase everything after "Let's"
      let current = displayedText;

      while (current.length > 0 && !cancelled) {
        current = current.slice(0, -1);
        setDisplayedText(current);
        await wait(35);
      }

      // type new phrase after "Let's"
      let next = "";

      for (const char of targetText) {
        if (cancelled) return;

        next += char;
        setDisplayedText(next);
        await wait(55);
      }
    };

    if (displayedText !== targetText) {
      animate();
    }

    return () => {
      cancelled = true;
    };
  }, [targetText]);

  const [blueWord = "", ...restWords] = displayedText.split(" ");
  const restText = restWords.join(" ");

  return (
    <h1 className="font-display text-5xl leading-tight tracking-tight text-foreground md:text-6xl">
      <span>Let&apos;s </span>

      {blueWord ? <span className="text-primary">{blueWord}</span> : null}

      {restText ? <span> {restText}</span> : null}

      <span className="ml-1 text-primary">|</span>
    </h1>
  );
}