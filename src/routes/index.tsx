import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { DuckBackground } from "@/components/DuckBackground";
import { AppNav } from "@/components/AppNav";
import { TypewriterHeading } from "@/components/landing/TypewriterHeading";
import { ModeToggle, type HeroMode } from "@/components/landing/ModeToggle";
import { HeroPreview } from "@/components/landing/HeroPreview";
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
    <div className="relative min-h-screen">
      <DuckBackground />
      <AppNav showAuth />

      <section className="mx-auto max-w-6xl px-4 pt-6 pb-16 sm:px-6 md:pt-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="animate-fade-up">
            <ModeToggle mode={mode} onChange={setMode} />

            <div className="mt-6">
              <TypewriterHeading mode={mode} />
            </div>

            <motion.p
              key={mode}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-5 max-w-lg text-lg text-muted-foreground"
            >
              {copy.subtitle}
            </motion.p>

            <motion.div
              key={`cta-${mode}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                to={copy.primary.to}
                className="group inline-flex items-center gap-2 rounded-full bg-brown px-6 py-3 text-sm font-semibold text-cream shadow-cozy transition hover:-translate-y-0.5 hover:opacity-95 hover:shadow-float"
              >
                {copy.primary.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to={copy.secondary.to}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:-translate-y-0.5 hover:bg-card hover:shadow-cozy"
              >
                {copy.secondary.label}
              </Link>
            </motion.div>

            <p className="mt-5 text-sm text-muted-foreground">
              Kenzo Buddy — review code visually or chat about it.
            </p>
          </div>

          <div id="preview" className="animate-pop-in">
            <HeroPreview mode={mode} />
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="mb-8">
          <h2 className="font-display text-2xl md:text-3xl">What Kenzo does</h2>
          <p className="mt-2 text-muted-foreground">Minimal cards, maximum clarity.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-3xl border border-border bg-card/80 p-5 shadow-cozy sketch-border backdrop-blur transition hover:-translate-y-0.5"
            >
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-dusty-blue/40 text-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-4 pb-10 text-center text-xs text-muted-foreground sm:px-6">
        Kenzo Buddy — calm creative coding workspace.
      </footer>
    </div>
  );
}
