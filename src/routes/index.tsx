import { createFileRoute, Link } from "@tanstack/react-router";
import { DuckBackground } from "@/components/DuckBackground";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sparkles,
  BookOpen,
  Image as ImageIcon,
  Brain,
  Puzzle,
  Heart,
  Send,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kenzo Buddy — Review code in a relaxed chat" },
      {
        name: "description",
        content:
          "Paste code, ask questions, upload screenshots, and get clear AI feedback in a relaxed chat experience with Kenzo Buddy.",
      },
      { property: "og:title", content: "Kenzo Buddy — Review code in a relaxed chat" },
      {
        property: "og:description",
        content:
          "Clear, friendly AI code reviews for students, developers, freelancers, and teams.",
      },
    ],
  }),
  component: LandingPage,
});

const features = [
  { icon: Sparkles, title: "Chat-based code reviews", body: "Conversational feedback that meets you where you are." },
  { icon: BookOpen, title: "Clear improvement suggestions", body: "Specific, actionable notes — not vague critiques." },
  { icon: ImageIcon, title: "Screenshot support", body: "Drop a screenshot and Kenzo reads the code for you." },
  { icon: Brain, title: "Memory-aware feedback", body: "Remembers what you're working on and grows with you." },
  { icon: Puzzle, title: "Daily code challenge", body: "A small puzzle a day to keep your skills sharp." },
  { icon: Heart, title: "Buddy reactions", body: "Kenzo cheers, wonders, and celebrates with you." },
];

function LandingPage() {
  return (
    <div className="relative min-h-screen">
      <DuckBackground />

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#how" className="hover:text-foreground transition">How it works</a>
          <a href="#demo" className="hover:text-foreground transition">Demo</a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/auth"
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition"
          >
            Log in
          </Link>
          <Link
            to="/auth"
            className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90 transition shadow-cozy"
          >
            Sign up
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 pt-10 pb-20 md:pt-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-mint/60 px-3 py-1 text-xs font-medium text-accent-foreground">
              <Sparkles className="h-3.5 w-3.5" /> AI code review, the calm way
            </span>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] tracking-tight text-foreground md:text-6xl">
              Review code with<br />
              Kenzo Buddy
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Paste code, ask questions, upload screenshots, and get clear AI
              feedback in a relaxed chat experience.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/app"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-cozy hover:shadow-float transition"
              >
                Start reviewing
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur hover:bg-card transition"
              >
                See demo
              </a>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              For students, developers, freelancers, and teams.
            </p>
          </div>

          <div id="demo" className="animate-pop-in">
            <ChatPreview />
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { n: "01", t: "Paste your code", b: "Drop in a function, file, or screenshot." },
            { n: "02", t: "Chat with Kenzo", b: "Ask anything and get clear explanations." },
            { n: "03", t: "Learn & level up", b: "Track tiny wins on your learning streak." },
          ].map((s) => (
            <div
              key={s.n}
              className="rounded-3xl border border-border bg-card/80 p-6 shadow-cozy backdrop-blur"
            >
              <div className="text-xs font-mono text-muted-foreground">{s.n}</div>
              <h3 className="mt-2 text-lg font-semibold">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl md:text-4xl">Everything Kenzo can do</h2>
          <p className="mt-3 text-muted-foreground">Small things, done well.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group rounded-3xl border border-border bg-card/80 p-6 shadow-cozy backdrop-blur transition hover:-translate-y-1 hover:shadow-float"
            >
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-secondary text-secondary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 pb-10 text-center text-xs text-muted-foreground">
        Made with 🦆 — Kenzo Buddy.
      </footer>
    </div>
  );
}

function ChatPreview() {
  return (
    <div className="relative rounded-[2rem] border border-border bg-card/90 p-5 shadow-float backdrop-blur">
      <div className="flex items-center gap-2 pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-blush" />
        <span className="h-2.5 w-2.5 rounded-full bg-butter" />
        <span className="h-2.5 w-2.5 rounded-full bg-mint" />
        <span className="ml-2 text-xs text-muted-foreground">kenzo.chat</span>
      </div>
      <div className="space-y-3">
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-md bg-user-bubble px-4 py-2.5 text-sm text-user-bubble-foreground">
          Can you review this function?
        </div>
        <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-assistant-bubble px-4 py-2.5 text-sm text-assistant-bubble-foreground">
          Sure — it's clean overall. One small thing: try splitting validation
          out so this function stays focused.
        </div>
        <pre className="rounded-2xl bg-code-bg p-4 text-xs text-code-fg overflow-x-auto">
{`function login(user) {
  if (!user.email) return null;
  return api.post("/login", user);
}`}
        </pre>
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2">
        <input
          disabled
          placeholder="Paste code or ask Kenzo Buddy anything…"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <button className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
