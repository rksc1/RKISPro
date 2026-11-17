"use client";

import React, { useRef, useState, type ReactNode } from "react";

interface Perspective3DCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function Perspective3DCard({
  children,
  className = "",
  maxTilt = 7,
}: Perspective3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -maxTilt;
    const tiltY = ((x - centerX) / centerX) * maxTilt;

    setTilt({ x: tiltX, y: tiltY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.12,
    });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  }

  return (
    <div
      style={{ perspective: 1000 }}
      className="h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.15s cubic-bezier(0.2, 0, 0.2, 1), box-shadow 0.15s ease",
          transformStyle: "preserve-3d",
        }}
        className={`relative h-full overflow-hidden transition-all duration-200 ${className}`}
      >
        {/* Dynamic Specular Sheen */}
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(0, 196, 204, ${glare.opacity}) 0%, transparent 60%)`,
          }}
        />
        {children}
      </div>
    </div>
  );
}
