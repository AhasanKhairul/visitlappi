"use client";

import { useEffect, useRef } from "react";

/**
 * A lightweight canvas-drawn animated aurora effect — the default hero
 * background when no real video or photo has been set in WordPress.
 * No external assets, respects prefers-reduced-motion (renders one still
 * frame instead of animating), and pauses when off-screen/tab is hidden.
 */
export function AuroraBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    function resize() {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const bands = [
      { color: "rgba(47,190,150,0.55)", speed: 0.00028, amp: 0.16, freq: 1.6, yBase: 0.32 },
      { color: "rgba(31,143,112,0.45)", speed: 0.00021, amp: 0.12, freq: 2.1, yBase: 0.48 },
      { color: "rgba(47,190,150,0.3)", speed: 0.00035, amp: 0.1, freq: 1.2, yBase: 0.22 },
    ];

    let raf = 0;
    let running = true;

    function draw(t: number) {
      if (!ctx) return;
      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, "#081120");
      bg.addColorStop(1, "#0e1a2b");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      for (const band of bands) {
        ctx.beginPath();
        ctx.moveTo(0, height);
        const steps = 48;
        for (let i = 0; i <= steps; i++) {
          const x = (i / steps) * width;
          const wave =
            Math.sin(i * 0.35 + t * band.speed * (prefersReducedMotion ? 0 : 1) * 1000 * band.freq) *
            band.amp;
          const y = height * (band.yBase + wave * 0.3);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        const grad = ctx.createLinearGradient(0, height * band.yBase - 80, 0, height);
        grad.addColorStop(0, band.color);
        grad.addColorStop(1, "rgba(8,17,32,0)");
        ctx.fillStyle = grad;
        ctx.filter = "blur(18px)";
        ctx.fill();
        ctx.filter = "none";
      }

      if (!prefersReducedMotion && running) {
        raf = requestAnimationFrame(draw);
      }
    }

    raf = requestAnimationFrame(draw);

    function handleVisibility() {
      running = document.visibilityState === "visible";
      if (running && !prefersReducedMotion) {
        raf = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(raf);
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`block h-full w-full ${className}`}
    />
  );
}
