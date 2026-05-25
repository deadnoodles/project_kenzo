import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedBackground } from "@/components/landing/AnimatedBackground";
import { AppNav } from "@/components/AppNav";
import { TypewriterHeading } from "@/components/landing/TypewriterHeading";
import { ModeToggle, type HeroMode } from "@/components/landing/ModeToggle";
import { HeroPreview } from "@/components/landing/HeroPreview";
import { LandingBackground } from "@/components/LandingBackground";


import {
  ScanSearch,
  MousePointerClick,
  MessagesSquare,
  Sparkles,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kenzo Buddy — Review code with your duck reviewer" },
      {
        name: "description",
        content:
          "Paste code, inspect highlights, or chat through your next fix with Kenzo Buddy.",
      },
      { property: "og:title", content: "Kenzo Buddy — Review code with your duck reviewer" },
      {
        property: "og:description",
        content:
          "Visual code review and relaxed chat — clear AI feedback for developers and students.",
      },
    ],
  }),
  component: LandingPage,
});

const features = [
  {
    icon: ScanSearch,
    title: "Visual code review",
    body: "Paste code and see Kenzo mark what matters — no chat noise first.",
  },
  {
    icon: MousePointerClick,
    title: "Clickable highlights",
    body: "Tap a flagged line and get a focused explanation in the inspector.",
  },
  {
    icon: MessagesSquare,
    title: "Chat follow-ups",
    body: "Jump to Chat Mode when you want a back-and-forth on the fix.",
  },
  {
    icon: Sparkles,
    title: "Mascot feedback",
    body: "Kenzo's smug, helpful voice — confident duck energy, not baby talk.",
  },
  {
    icon: ImageIcon,
    title: "Screenshot support",
    body: "Coming soon in chat — drop a screenshot and Kenzo reads it.",
  },
];

const heroCopy: Record<
  HeroMode,
  { subtitle: string; primary: { to: string; label: string }; secondary: { to: string; label: string } }
> = {
  review: {
    subtitle:
      "Paste code, see highlighted lines, and hear what Kenzo thinks — one click at a time.",
    primary: { to: "/review", label: "Start Review Mode" },
    secondary: { to: "/app", label: "Open Chat Mode" },
  },
  chat: {
    subtitle:
      "Ask follow-ups, debug together, and chat through your next fix with Kenzo.",
    primary: { to: "/app", label: "Open Chat Mode" },
    secondary: { to: "/review", label: "Start Review Mode" },
  },
};

function LandingPage() {
  const [mode, setMode] = useState<HeroMode>("review");
  const copy = heroCopy[mode];

  return (
<div className="relative min-h-screen overflow-hidden bg-background">
  <LandingBackground />

  <div className="relative z-10">
        <AppNav showAuth />

        <section className="relative pt-16 pb-40 md:pt-20 md:pb-48">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="animate-fade-up max-w-2xl">
                <ModeToggle mode={mode} onChange={setMode} />

                <div className="mt-12">
                  <TypewriterHeading mode={mode} />
                </div>

                <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground transition-opacity duration-300">
                  {copy.subtitle}
                </p>

                <div className="mt-14 flex flex-wrap items-center gap-6 transition-opacity duration-300">
                  <Link to={copy.primary.to} className="btn-primary group">
                    {copy.primary.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link to={copy.secondary.to} className="btn-secondary">
                    {copy.secondary.label}
                  </Link>
                </div>

                <p className="mt-10 text-base text-muted-foreground">
                  Kenzo Buddy — review code visually or chat about it.
                </p>
              </div>

              <div className="animate-pop-in animate-float-slow">
                <HeroPreview mode={mode} />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="relative pt-12 pb-44">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="mb-20">
              <h2 className="font-display text-3xl md:text-4xl">What Kenzo does</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Minimal cards, maximum clarity.
              </p>
            </div>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {features.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="group rounded-3xl border border-border bg-card/90 p-10 shadow-cozy sketch-border backdrop-blur transition hover:-translate-y-1 hover:border-primary/25 hover:shadow-float"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-pale/80 text-primary ring-1 ring-primary/20 transition group-hover:bg-blue-pale">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="relative pt-12 pb-12 text-center text-sm text-muted-foreground">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            Kenzo Buddy — calm creative coding workspace.
          </div>
        </footer>
      </div>
    </div>
  );
}
