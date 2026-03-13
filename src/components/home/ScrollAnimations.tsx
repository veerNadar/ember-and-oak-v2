"use client";

import { useEffect } from "react";

/**
 * ScrollAnimations — invisible client component.
 * Sets up:
 *  1. Intersection Observer to reveal elements with class "animate-on-scroll"
 *     (reads data-delay for per-element stagger)
 *  2. requestAnimationFrame parallax on the hero background element
 *     with id="hero-parallax-bg"
 */
export default function ScrollAnimations() {
  useEffect(() => {
    // ── 1. Intersection Observer ─────────────────────────────────────────────
    const elements = document.querySelectorAll<HTMLElement>(".animate-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay ?? "0";
            el.style.transitionDelay = `${delay}s`;
            el.classList.add("is-visible");
            // Unobserve once revealed — no re-animation on scroll back
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.12,      // trigger when 12% of element is in view
        rootMargin: "0px 0px -40px 0px", // slight bottom offset for natural feel
      }
    );

    elements.forEach((el) => observer.observe(el));

    // ── 2. Hero parallax ────────────────────────────────────────────────────
    const parallaxBg = document.getElementById("hero-parallax-bg");

    let rafId: number;
    const onScroll = () => {
      if (!parallaxBg) return;
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        // Move at 0.5x scroll speed — creates depth without dizziness
        parallaxBg.style.transform = `translateY(${scrollY * 0.5}px)`;
      });
    };

    if (parallaxBg) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
