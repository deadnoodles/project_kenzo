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

      <section className="page-container pt-10 pb-28 md:pt-14 md:pb-32">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="animate-fade-up max-w-xl">
            <ModeToggle mode={mode} onChange={setMode} />

            <div className="mt-8">
              <TypewriterHeading mode={mode} />
            </div>

            <motion.p
              key={mode}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
            >
              {copy.subtitle}
            </motion.p>

            <motion.div
              key={`cta-${mode}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link to={copy.primary.to} className="btn-primary group">
                {copy.primary.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link to={copy.secondary.to} className="btn-secondary">
                {copy.secondary.label}
              </Link>
            </motion.div>

            <p className="mt-6 text-base text-muted-foreground">
              Kenzo Buddy — review code visually or chat about it.
            </p>
          </div>

          <div id="preview" className="animate-pop-in lg:pl-4">
            <HeroPreview mode={mode} />
          </div>
        </div>
      </section>

      <section id="features" className="page-container pb-28 pt-4">
        <div className="mb-12">
          <h2 className="font-display text-3xl md:text-4xl">What Kenzo does</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Minimal cards, maximum clarity.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {features.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group rounded-3xl border border-border bg-card/90 p-7 shadow-cozy sketch-border backdrop-blur transition hover:-translate-y-1 hover:border-primary/25 hover:shadow-float"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-pale/80 text-primary ring-1 ring-primary/20 transition group-hover:bg-blue-pale">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="page-container pb-12 text-center text-sm text-muted-foreground">
        Kenzo Buddy — calm creative coding workspace.
      </footer>
    </div>
  );
}
