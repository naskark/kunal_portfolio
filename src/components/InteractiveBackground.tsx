"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
  depth: number;
};

type Ripple = {
  x: number;
  y: number;
  radius: number;
  strength: number;
};

const PALETTE = [200, 214, 258, 168];
const LINK_DISTANCE = 132;
const POINTER_RADIUS = 190;

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    const ripples: Ripple[] = [];
    const pointer = { x: -9999, y: -9999, active: false, mode: 1 };
    let frame = 0;

    const particleCount = () => {
      const area = width * height;
      const base = Math.round(area / 15000);
      return Math.max(40, Math.min(base, window.innerWidth < 768 ? 55 : 130));
    };

    const spawn = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      radius: Math.random() * 1.7 + 0.5,
      hue: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      depth: Math.random() * 0.7 + 0.3,
    });

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = particleCount();
      if (particles.length === 0) {
        particles = Array.from({ length: target }, spawn);
      } else if (particles.length < target) {
        particles.push(...Array.from({ length: target - particles.length }, spawn));
      } else {
        particles.length = target;
      }
    };

    const draw = () => {
      frame = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, width, height);

      // Aurora blobs drifting behind the particle field.
      const t = performance.now() / 1000;
      const blobs = [
        { x: 0.2 + Math.sin(t * 0.12) * 0.06, y: 0.25 + Math.cos(t * 0.1) * 0.05, h: 220 },
        { x: 0.8 + Math.cos(t * 0.09) * 0.05, y: 0.7 + Math.sin(t * 0.13) * 0.06, h: 262 },
        { x: 0.55 + Math.sin(t * 0.07) * 0.08, y: 0.45 + Math.cos(t * 0.11) * 0.07, h: 188 },
      ];
      for (const blob of blobs) {
        const r = Math.max(width, height) * 0.42;
        const gradient = ctx.createRadialGradient(
          blob.x * width,
          blob.y * height,
          0,
          blob.x * width,
          blob.y * height,
          r
        );
        gradient.addColorStop(0, `hsla(${blob.h}, 90%, 60%, 0.13)`);
        gradient.addColorStop(1, "hsla(226, 90%, 50%, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        ripple.radius += 7;
        ripple.strength *= 0.94;
        if (ripple.strength < 0.02 || ripple.radius > Math.max(width, height)) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(190, 100%, 70%, ${ripple.strength * 0.35})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      for (const p of particles) {
        if (!reduceMotion) {
          p.x += p.vx * p.depth;
          p.y += p.vy * p.depth;
        }

        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < POINTER_RADIUS) {
            // mode 1 pushes particles away, mode -1 (held pointer) pulls them in.
            const force = ((POINTER_RADIUS - dist) / POINTER_RADIUS) * 0.85 * pointer.mode;
            p.vx += (dx / dist) * force * 0.12;
            p.vy += (dy / dist) * force * 0.12;
          }
        }

        for (const ripple of ripples) {
          const dx = p.x - ripple.x;
          const dy = p.y - ripple.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (Math.abs(dist - ripple.radius) < 34) {
            p.vx += (dx / dist) * ripple.strength * 0.6;
            p.vy += (dy / dist) * ripple.strength * 0.6;
          }
        }

        // Damping keeps interaction energy from accumulating forever.
        p.vx *= 0.97;
        p.vy *= 0.97;
        const speed = Math.hypot(p.vx, p.vy);
        if (speed > 2.4) {
          p.vx = (p.vx / speed) * 2.4;
          p.vy = (p.vy / speed) * 2.4;
        }

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 78%, ${0.35 + p.depth * 0.5})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq > LINK_DISTANCE * LINK_DISTANCE) continue;
          const alpha = (1 - Math.sqrt(distSq) / LINK_DISTANCE) * 0.34;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `hsla(${(a.hue + b.hue) / 2}, 90%, 72%, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      if (pointer.active) {
        for (const p of particles) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < POINTER_RADIUS) {
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `hsla(190, 100%, 75%, ${(1 - dist / POINTER_RADIUS) * 0.28})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const onPointerDown = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.mode = -1;
      ripples.push({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        radius: 0,
        strength: 1,
      });
    };

    const onPointerUp = () => {
      pointer.mode = 1;
    };

    resize();
    frame = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-navy-900" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="grid-lines absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,transparent_35%,#000a36_88%)]" />
    </div>
  );
}
