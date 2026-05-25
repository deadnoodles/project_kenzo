import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Mode = "review" | "chat";

const WORD: Record<Mode, string> = {
  review: "review",
  chat: "chat",
};

function delay(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

type Props = {
  mode: Mode;
};

export function TypewriterHeading({ mode }: Props) {
  const target = WORD[mode];
  const reducedMotion = usePrefersReducedMotion();
  const [word, setWord] = useState(target);

  useEffect(() => {
    if (reducedMotion) {
      setWord(target);
      return;
    }

    let cancelled = false;

    (async () => {
      let current = word;
      if (current === target) return;

      while (current.length > 0 && !cancelled) {
        await delay(38);
        current = current.slice(0, -1);
        setWord(current);
      }
      for (let i = 1; i <= target.length && !cancelled; i++) {
        await delay(52);
        setWord(target.slice(0, i));
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, reducedMotion]);

  return (
    <h1 className="font-display text-4xl leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-6xl">
      Let&apos;s{" "}
      <span className="inline-block min-w-[5.5ch] text-left text-gold">
        {word}
        <span
          className="ml-0.5 inline-block w-[2px] animate-pulse bg-gold align-middle"
          style={{ height: "0.85em" }}
          aria-hidden
        />
      </span>{" "}
      together
    </h1>
  );
}
