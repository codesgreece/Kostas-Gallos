"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type LeafSprite = {
  img: HTMLImageElement;
  w: number;
  h: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  sprite: number;
  phase: number;
  flutter: number;
  flip: number;
  vFlip: number;
  opacity: number;
  life: number;
  maxLife: number;
};

const LEAF_SRCS = [
  "/leaves/leaf-1.webp",
  "/leaves/leaf-2.webp",
  "/leaves/leaf-3.webp",
];

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function ScrollFallingLeaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const wrapEl = wrapRef.current;
    if (!canvasEl || !wrapEl) return;

    if (prefersReducedMotion()) {
      wrapEl.dataset.motion = "reduced";
      return;
    }

    const context = canvasEl.getContext("2d", { alpha: true });
    if (!context) return;

    const canvas: HTMLCanvasElement = canvasEl;
    const wrap: HTMLDivElement = wrapEl;
    const ctx: CanvasRenderingContext2D = context;

    const sprites: LeafSprite[] = [];
    const particles: Particle[] = [];
    let raf = 0;
    let running = true;
    let lastTs = 0;
    let lastScrollY = window.scrollY;
    let scrollBoost = 0;
    let wind = -0.18;
    let windTarget = -0.18;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const isMobile = () => width < 768;

    const maxParticles = () => {
      if (width < 480) return 14;
      if (width < 900) return 22;
      return 36;
    };

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function canopyOrigin() {
      // Right-side canopy — tighter on phones so leaves still read
      const treeWidth = isMobile()
        ? Math.min(width * 0.42, 170)
        : Math.min(width * 0.22, 280);
      const canopyLeft = width - treeWidth * 0.98;
      const canopyRight = width - treeWidth * 0.02;
      const canopyTop = height * (isMobile() ? 0.12 : 0.05);
      const canopyBottom = height * (isMobile() ? 0.48 : 0.4);
      return {
        x: canopyLeft + Math.random() * Math.max(20, canopyRight - canopyLeft),
        y: canopyTop + Math.random() * (canopyBottom - canopyTop),
      };
    }

    function spawn(count: number, burst = false) {
      if (!sprites.length) return;
      const cap = maxParticles();
      const mobile = isMobile();
      for (let i = 0; i < count && particles.length < cap; i++) {
        const origin = canopyOrigin();
        const sprite = Math.floor(Math.random() * sprites.length);
        const size = mobile
          ? 14 + Math.random() * 20
          : 16 + Math.random() * 26;
        particles.push({
          x: origin.x,
          y: origin.y,
          vx: -0.35 - Math.random() * (mobile ? 1.1 : 1.5) - (burst ? 0.6 : 0),
          vy: 0.12 + Math.random() * 0.5,
          rot: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.08,
          size,
          sprite,
          phase: Math.random() * Math.PI * 2,
          flutter: 0.6 + Math.random() * 1.2,
          flip: Math.random() * Math.PI * 2,
          vFlip: 0.02 + Math.random() * 0.05,
          opacity: 0.7 + Math.random() * 0.28,
          life: 0,
          maxLife: 4000 + Math.random() * 3500,
        });
      }
    }

    function tick(ts: number) {
      if (!running) return;
      const dt = Math.min(32, lastTs ? ts - lastTs : 16);
      lastTs = ts;

      if (Math.random() < 0.012) {
        windTarget = -0.55 + Math.random() * 0.35;
      }
      wind += (windTarget - wind) * 0.012;
      scrollBoost *= 0.92;

      const g = 0.00052 * dt;
      const drag = Math.pow(0.986, dt / 16);

      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;

        const flutterX =
          Math.sin(p.life * 0.00215 * p.flutter + p.phase) * p.flutter * 0.6;
        const flutterY =
          Math.cos(p.life * 0.00155 * p.flutter + p.phase) * 0.14;

        p.vx = (p.vx + wind * 0.014 + flutterX * 0.022) * drag;
        p.vy = (p.vy + g + flutterY * 0.01) * drag;
        if (p.vy > 1.8) p.vy = 1.8;

        p.x += p.vx * (dt * 0.06);
        p.y += p.vy * (dt * 0.06);
        p.rot += p.vr * dt * 0.06 + flutterX * 0.012;
        p.flip += p.vFlip * dt * 0.06;
        p.vr *= 0.998;

        const age = p.life / p.maxLife;
        let alpha = p.opacity;
        if (age > 0.7) alpha *= 1 - (age - 0.7) / 0.3;
        if (age < 0.07) alpha *= age / 0.07;

        if (
          p.life > p.maxLife ||
          p.y > height + 70 ||
          p.x < -90 ||
          p.x > width + 90
        ) {
          particles.splice(i, 1);
          continue;
        }

        const sprite = sprites[p.sprite];
        if (!sprite) continue;

        const scaleX = Math.cos(p.flip);
        const drawW = p.size;
        const drawH = (sprite.h / sprite.w) * p.size;
        const signed =
          (Math.max(0.2, Math.abs(scaleX)) || 0.2) * (scaleX < 0 ? -1 : 1);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(signed, 1);
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.shadowColor = "rgba(20, 40, 20, 0.16)";
        ctx.shadowBlur = 5;
        ctx.shadowOffsetY = 2;
        ctx.drawImage(sprite.img, -drawW / 2, -drawH / 2, drawW, drawH);
        ctx.restore();
      }

      if (window.scrollY > height * 0.2 && particles.length < (isMobile() ? 5 : 8)) {
        if (Math.random() < (isMobile() ? 0.04 : 0.028)) spawn(1);
      }

      raf = requestAnimationFrame(tick);
    }

    function onScroll() {
      const y = window.scrollY;
      const dy = y - lastScrollY;
      lastScrollY = y;

      if (dy > 0) {
        scrollBoost = Math.min(9, scrollBoost + dy * (isMobile() ? 0.07 : 0.05));
        const count = Math.min(isMobile() ? 4 : 6, Math.floor(scrollBoost));
        if (count > 0 && Math.random() < 0.92) {
          spawn(count, dy > 18);
          scrollBoost *= 0.32;
        }
      }

      const progress = Math.min(1, y / (height * 0.45));
      const base = isMobile() ? 0.42 : 0.34;
      const span = isMobile() ? 0.38 : 0.42;
      wrap.style.setProperty("--leaf-tree-opacity", String(base + progress * span));
    }

    let loaded = 0;
    const images = LEAF_SRCS.map((src, index) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = src;
      img.onload = () => {
        sprites[index] = { img, w: img.naturalWidth, h: img.naturalHeight };
        loaded += 1;
        if (loaded === LEAF_SRCS.length) {
          resize();
          spawn(isMobile() ? 3 : 2);
          lastTs = 0;
          raf = requestAnimationFrame(tick);
        }
      };
      img.onerror = () => {
        loaded += 1;
        if (loaded === LEAF_SRCS.length) {
          resize();
          raf = requestAnimationFrame(tick);
        }
      };
      return img;
    });

    resize();
    wrap.style.setProperty("--leaf-tree-opacity", isMobile() ? "0.5" : "0.4");
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none fixed inset-0 z-[40] overflow-hidden"
      aria-hidden
      data-motion="active"
    >
      <div
        className="absolute inset-y-0 right-0 w-[42vw] max-w-[170px] select-none sm:w-[min(28vw,240px)] sm:max-w-none xl:w-[min(24vw,300px)]"
        style={{
          opacity: "var(--leaf-tree-opacity, 0.45)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 18%, black 52%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 18%, black 52%, black 100%)",
        }}
      >
        <Image
          src="/tree/autumn-tree.webp"
          alt=""
          width={688}
          height={900}
          priority={false}
          sizes="(max-width: 640px) 160px, (max-width: 1280px) 220px, 280px"
          className="absolute right-[-10%] bottom-[-2%] h-[min(62vh,520px)] w-auto max-w-[min(40vw,160px)] object-contain object-right-bottom drop-shadow-[0_16px_36px_rgba(20,53,40,0.14)] transition-opacity duration-700 sm:right-[-8%] sm:h-[min(70vh,640px)] sm:max-w-[min(26vw,220px)] xl:right-[-6%] xl:h-[min(78vh,720px)] xl:max-w-[min(22vw,280px)]"
        />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
