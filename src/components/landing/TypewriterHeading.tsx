import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Mode = "review" | "chat";

const PHRASE: Record<Mode, string> = {
  chat: "Let's chat together",
  review: "Let's review together",
};

function delay(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function renderPhrase(text: string) {
  const match = text.match(/^Let's (\w+) together$/);
  if (!match) {
    return (
      <>
        {text}
        <Cursor />
      </>
    );
  }
  return (
    <>
      Let&apos;s{" "}
      <span className="text-primary">{match[1]}</span> together
      <Cursor />
    </>
  );
}

function Cursor() {
  return (
    <span
      className="ml-0.5 inline-block w-[2px] animate-pulse bg-primary align-middle"
      style={{ height: "0.85em" }}
      aria-hidden
    />
  );
}

type Props = {
  mode: Mode;
};

export function TypewriterHeading({ mode }: Props) {
  const target = PHRASE[mode];
  const reducedMotion = usePrefersReducedMotion();
  const [text, setText] = useState(target);

  useEffect(() => {
    if (reducedMotion) {
      setText(target);
      return;
    }

    let cancelled = false;

    (async () => {
      let current = text;
      if (current === target) return;

      while (current.length > 0 && !cancelled) {
        await delay(32);
        current = current.slice(0, -1);
        setText(current);
      }
      for (let i = 1; i <= target.length && !cancelled; i++) {
        await delay(42);
        setText(target.slice(0, i));
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, reducedMotion]);

  return (
    <h1 className="font-display text-4xl leading-[1.12] tracking-tight text-foreground md:text-5xl lg:text-6xl">
      {renderPhrase(text)}
    </h1>
  );
}
