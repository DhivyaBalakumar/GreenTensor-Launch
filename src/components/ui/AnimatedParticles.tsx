"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import DotGrid from "@/components/ui/DotGrid";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: "green" | "blue";
}

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function createParticle(width: number, height: number): Particle {
  const color = Math.random() > 0.45 ? "green" : "blue";
  const speed = randomBetween(0.3, 0.8);
  const angle = Math.random() * Math.PI * 2;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: randomBetween(1.5, 2.5),
    color,
  };
}

export default function AnimatedParticles() {
  const shouldReduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const PARTICLE_COUNT = 60;
    const CONNECTION_DISTANCE = 120;

    let particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function init() {
      if (!canvas) return;
      particles = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(canvas!.width, canvas!.height)
      );
    }

    function draw() {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE);
            if (a.color === "green" || b.color === "green") {
              ctx.strokeStyle = `rgba(34,197,94,${(0.08 * opacity).toFixed(3)})`;
            } else {
              ctx.strokeStyle = `rgba(59,130,246,${(0.06 * opacity).toFixed(3)})`;
            }
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (p.color === "green") {
          ctx.fillStyle = "rgba(34,197,94,0.4)";
        } else {
          ctx.fillStyle = "rgba(59,130,246,0.3)";
        }
        ctx.fill();
      }
    }

    function update() {
      if (!canvas) return;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x - p.radius < 0) {
          p.x = p.radius;
          p.vx = Math.abs(p.vx);
        } else if (p.x + p.radius > canvas.width) {
          p.x = canvas.width - p.radius;
          p.vx = -Math.abs(p.vx);
        }

        if (p.y - p.radius < 0) {
          p.y = p.radius;
          p.vy = Math.abs(p.vy);
        } else if (p.y + p.radius > canvas.height) {
          p.y = canvas.height - p.radius;
          p.vy = -Math.abs(p.vy);
        }
      }
    }

    function loop() {
      update();
      draw();
      animationId = requestAnimationFrame(loop);
    }

    resize();
    init();
    loop();

    const observer = new ResizeObserver(() => {
      resize();
      // Re-clamp existing particles to new bounds
      if (canvas) {
        for (const p of particles) {
          p.x = Math.min(p.x, canvas.width);
          p.y = Math.min(p.y, canvas.height);
        }
      }
    });
    observer.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) {
    return <DotGrid />;
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
