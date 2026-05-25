import { createFileRoute, Link } from "@tanstack/react-router";
import { DuckBackground } from "@/components/DuckBackground";
import { AppNav } from "@/components/AppNav";
import { KenzoMascot } from "@/components/KenzoMascot";
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

function LandingPage() {
  return (
    <div className="relative min-h-screen">
      <DuckBackground />
      <AppNav showAuth />

      <section className="mx-auto max-w-6xl px-4 pt-6 pb-16 sm:px-6 md:pt-12">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-dusty-blue/40 px-3 py-1 text-xs font-medium text-foreground">
              <ScanSearch className="h-3.5 w-3.5" /> Two modes — review or chat
            </span>
            <h1 className="mt-5 font-display text-4xl leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Review code with<br />
              Kenzo Buddy
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Paste code, inspect highlights, or chat through your next fix.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/review"
                className="group inline-flex items-center gap-2 rounded-full bg-brown px-6 py-3 text-sm font-semibold text-cream shadow-cozy transition hover:opacity-90"
              >
                Start Review Mode
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/app"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:bg-card"
              >
                Open Chat Mode
              </Link>
            </div>
          </div>

          <div id="preview" className="relative animate-pop-in">
            <ProductPreview />
            <div className="pointer-events-none absolute -right-4 -bottom-8 hidden opacity-90 sm:block">
              <KenzoMascot size="sm" className="animate-float-soft" />
            </div>
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

function ProductPreview() {
  return (
    <div className="rounded-[2rem] border border-border bg-card/90 p-5 shadow-float sketch-border backdrop-blur">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <span className="rounded-full bg-dusty-blue/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide">
          Review
        </span>
        <span className="text-xs text-muted-foreground">kenzo.review</span>
      </div>
      <pre className="mt-3 overflow-x-auto rounded-2xl bg-code-bg p-4 font-mono text-xs leading-relaxed text-code-fg">
        <span className="block text-code-fg/40"> 1</span>
        <span className="block rounded bg-severity-medium/80 px-1 text-severity-medium-fg">
          {" "}2  function login(user) {"{"}
        </span>
        <span className="block text-code-fg/40"> 3</span>
        <span className="block rounded bg-severity-high/80 px-1 text-severity-high-fg">
          {" "}4    if (!user.email) return null;
        </span>
        <span className="block text-code-fg/40"> 5</span>
        <span className="block"> 6    return api.post("/login", user);</span>
      </pre>
      <div className="mt-3 rounded-2xl border border-border bg-assistant-bubble px-3 py-2 text-xs text-assistant-bubble-foreground">
        <span className="font-semibold">Kenzo:</span> That guard clause? Bold of you to skip it.
      </div>
      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        Click a highlight → inspector explains → chat when you&apos;re ready
      </p>
    </div>
  );
}
