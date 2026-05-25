import { useEffect, useMemo, useState } from "react";

type Blob = {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  strength: number;
};

export function LandingBackground() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

const blobs = useMemo<Blob[]>(
  () => [
    // glow sus, in zona goala dintre text si panel
    {
      id: "blob-top-center",
      x: 70,
      y: 15,
      size: 420,
      color: "#8FB8F8",
      strength: 14,
    },

    // glow jos-stanga
    {
      id: "blob-bottom-left",
      x: 12,
      y: 84,
      size: 280,
      color: "#AFCDFB",
      strength: 12,
    },

    // glow jos-dreapta
    {
      id: "blob-bottom-right",
      x: 86,
      y: 86,
      size: 240,
      color: "#8FB8F8",
      strength: 10,
    },
  ],
  [],
);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  function getRepelledTransform(blob: Blob) {
    const dx = blob.x - mouse.x;
    const dy = blob.y - mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const influenceRadius = 28;

    if (distance > influenceRadius) {
      return "translate3d(0px, 0px, 0px)";
    }

    const force = (1 - distance / influenceRadius) * blob.strength;
    const angle = Math.atan2(dy, dx);

    const moveX = Math.cos(angle) * force;
    const moveY = Math.sin(angle) * force;

    return `translate3d(${moveX}px, ${moveY}px, 0px)`;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base subtle grid */}
      <div className="absolute inset-0 opacity-[0.10] bg-[linear-gradient(to_right,#8FB8F8_1px,transparent_1px),linear-gradient(to_bottom,#8FB8F8_1px,transparent_1px)] bg-[size:72px_72px]" />

      {/* Cursor light ONLY on grid lines */}
      <div
        className="absolute inset-0 opacity-[0.55] bg-[linear-gradient(to_right,#AFCDFB_1px,transparent_1px),linear-gradient(to_bottom,#AFCDFB_1px,transparent_1px)] bg-[size:72px_72px]"
        style={{
          WebkitMaskImage: `radial-gradient(circle 180px at ${mouse.x}% ${mouse.y}%, black 0%, transparent 70%)`,
          maskImage: `radial-gradient(circle 180px at ${mouse.x}% ${mouse.y}%, black 0%, transparent 70%)`,
        }}
      />

      {/* Repelled glow blobs */}
      {blobs.map((blob) => (
        <div
          key={blob.id}
          className="absolute rounded-full blur-3xl transition-transform duration-300 ease-out animate-float-slow"
          style={{
            left: `${blob.x}%`,
            top: `${blob.y}%`,
            width: `${blob.size}px`,
            height: `${blob.size}px`,
            backgroundColor: blob.color,
            opacity: 0.14,
            transform: getRepelledTransform(blob),
          }}
        />
      ))}

      {/* Soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_48%,rgba(0,0,0,0.32)_100%)]" />
    </div>
  );
}