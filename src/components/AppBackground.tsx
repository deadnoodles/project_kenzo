import { useEffect, useMemo, useState } from "react";

type GlowBlob = {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  strength: number;
};

export function AppBackground() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  const blobs = useMemo<GlowBlob[]>(
    () => [
      {
        id: "top-center",
        x: 56,
        y: 22,
        size: 320,
        color: "#8FB8F8",
        opacity: 0.14,
        strength: 14,
      },
      {
        id: "bottom-left",
        x: 12,
        y: 82,
        size: 280,
        color: "#AFCDFB",
        opacity: 0.12,
        strength: 12,
      },
      {
        id: "bottom-right",
        x: 86,
        y: 84,
        size: 260,
        color: "#8FB8F8",
        opacity: 0.1,
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

  function getRepelledTransform(blob: GlowBlob) {
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
      {/* base grid */}
      <div className="absolute inset-0 opacity-[0.10] bg-[linear-gradient(to_right,#8FB8F8_1px,transparent_1px),linear-gradient(to_bottom,#8FB8F8_1px,transparent_1px)] bg-[size:72px_72px]" />

      {/* cursor light only on grid */}
      <div
        className="absolute inset-0 opacity-[0.55] bg-[linear-gradient(to_right,#AFCDFB_1px,transparent_1px),linear-gradient(to_bottom,#AFCDFB_1px,transparent_1px)] bg-[size:72px_72px]"
        style={{
          WebkitMaskImage: `radial-gradient(circle 180px at ${mouse.x}% ${mouse.y}%, black 0%, transparent 72%)`,
          maskImage: `radial-gradient(circle 180px at ${mouse.x}% ${mouse.y}%, black 0%, transparent 72%)`,
        }}
      />

      {/* soft pushed blobs */}
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
            opacity: blob.opacity,
            transform: getRepelledTransform(blob),
          }}
        />
      ))}

      {/* soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_50%,rgba(0,0,0,0.22)_100%)]" />
    </div>
  );
}