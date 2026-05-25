export function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />

      {/* Faint animated grid - more visible */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.15]"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Soft glow blobs - more visible */}
      <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/25 blur-3xl opacity-40 animate-pulse-slow" />
      <div
        className="absolute bottom-1/3 right-1/3 h-[400px] w-[400px] rounded-full bg-primary/15 blur-3xl opacity-35 animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 right-1/4 h-[350px] w-[350px] rounded-full bg-primary/20 blur-3xl opacity-30 animate-pulse-slow"
        style={{ animationDelay: "4s" }}
      />

      {/* Floating code symbols - clearly visible */}
      <div className="absolute top-[10%] left-[5%] text-5xl font-mono text-primary opacity-[0.20] animate-float-slow">
        {`{ }`}
      </div>
      <div
        className="absolute top-[30%] right-[10%] text-4xl font-mono text-primary opacity-[0.18] animate-float-slow"
        style={{ animationDelay: "1.5s" }}
      >
        {'</>'}
      </div>
      <div
        className="absolute bottom-[32%] left-[12%] text-4xl font-mono text-primary opacity-[0.16] animate-float-slow"
        style={{ animationDelay: "3s" }}
      >
        const
      </div>
      <div
        className="absolute top-[60%] right-[8%] text-3xl font-mono text-primary opacity-[0.18] animate-float-slow"
        style={{ animationDelay: "2.5s" }}
      >
        fix
      </div>
      <div
        className="absolute bottom-[20%] right-[15%] text-4xl font-mono text-primary opacity-[0.17] animate-float-slow"
        style={{ animationDelay: "4.5s" }}
      >
        bug
      </div>
      <div
        className="absolute top-[45%] left-[8%] text-3xl font-mono text-primary opacity-[0.16] animate-float-slow"
        style={{ animationDelay: "1s" }}
      >
        AI
      </div>
    </div>
  );
}