export function LandingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Visible soft grid */}
      <div
        className="
          absolute inset-0
          opacity-[0.18]
          bg-[linear-gradient(to_right,#8FB8F8_1px,transparent_1px),linear-gradient(to_bottom,#8FB8F8_1px,transparent_1px)]
          bg-[size:72px_72px]
        "
      />

      {/* Soft blue glow blobs */}
      <div className="animate-float-slow absolute left-[8%] top-[22%] h-72 w-72 rounded-full bg-[#8FB8F8]/20 blur-3xl" />
      <div className="animate-float-slow absolute right-[12%] top-[42%] h-80 w-80 rounded-full bg-[#AFCDFB]/16 blur-3xl" />
      <div className="animate-pulse-slow absolute left-[42%] bottom-[12%] h-64 w-64 rounded-full bg-[#6F8EAF]/14 blur-3xl" />

      {/* Floating code symbols */}
      <span className="animate-float-slow absolute left-[14%] top-[36%] font-mono text-5xl text-[#AFCDFB]/20">
        {"</>"}
      </span>

      <span className="animate-pulse-slow absolute right-[24%] top-[18%] font-mono text-4xl text-[#AFCDFB]/20">
        {"const"}
      </span>

      <span className="animate-float-slow absolute left-[48%] bottom-[24%] font-mono text-6xl text-[#AFCDFB]/16">
        {"{}"}
      </span>

      <span className="animate-pulse-slow absolute right-[10%] bottom-[18%] font-mono text-4xl text-[#AFCDFB]/18">
        {"fix"}
      </span>

      <span className="animate-float-slow absolute left-[28%] top-[12%] font-mono text-3xl text-[#AFCDFB]/16">
        {"AI"}
      </span>
    </div>
  );
}