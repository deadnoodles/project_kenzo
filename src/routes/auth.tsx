import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { DuckBackground } from "@/components/DuckBackground";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Welcome back — Kenzo Buddy" },
      { name: "description", content: "Log in or sign up to your Kenzo Buddy account." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mocked auth — go to the app
    navigate({ to: "/app" });
  };

  return (
    <div className="relative min-h-screen">
      <DuckBackground />
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Logo />
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back home
        </Link>
      </header>

      <main className="mx-auto flex max-w-md flex-col px-6 pt-10 pb-20">
        <div className="rounded-[2rem] border border-border bg-card/90 p-8 shadow-float backdrop-blur animate-pop-in">
          <h1 className="font-display text-2xl">
            {mode === "login" ? "Welcome back, friend 👋" : "Hi! Let's get you set up 🌱"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "login"
              ? "Kenzo missed you."
              : "Kenzo is ready to meet you."}
          </p>

          <form onSubmit={submit} className="mt-6 space-y-3">
            {mode === "signup" && (
              <Field label="Name" placeholder="Ada Lovelace" type="text" />
            )}
            <Field label="Email" placeholder="you@hello.dev" type="email" />
            <Field label="Password" placeholder="••••••••" type="password" />

            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-cozy hover:shadow-float transition"
            >
              {mode === "login" ? "Log in" : "Create account"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            or
            <div className="h-px flex-1 bg-border" />
          </div>

          <Link
            to="/app"
            className="block w-full rounded-full border border-border bg-card py-3 text-center text-sm font-medium hover:bg-muted transition"
          >
            Continue as guest
          </Link>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "login" ? "New here? " : "Already have an account? "}
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="font-semibold text-foreground hover:underline"
            >
              {mode === "login" ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        {...props}
        className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40"
      />
    </label>
  );
}
