"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import type { PortfolioData } from "@/data/portfolio";
import { scrollToSection } from "@/components/SmoothScroll";
import Magnetic from "@/components/ui/Magnetic";
import Avatar from "@/components/ui/Avatar";
import HangingTag from "@/components/ui/HangingTag";

const headline = ["Building", "products", "people", "actually", "love."];

export default function Hero({ data }: { data: PortfolioData }) {
  const { profile, metrics } = data;
  const [taglineIndex, setTaglineIndex] = useState(0);
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 700], [0, 120]);
  const contentOpacity = useTransform(scrollY, [0, 480], [1, 0]);

  useEffect(() => {
    const timer = setInterval(
      () => setTaglineIndex((index) => (index + 1) % profile.taglines.length),
      2600
    );
    return () => clearInterval(timer);
  }, [profile.taglines.length]);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pt-28 pb-16 sm:px-8"
    >
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto w-full max-w-7xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-cyan/25 bg-cyan/[0.06] px-4 py-2 font-mono text-[11px] tracking-[0.18em] text-cyan uppercase"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
          </span>
          {profile.location}
        </motion.div>

        <h1 className="mt-6 text-[clamp(2.25rem,6vw,4.75rem)] leading-[1] font-semibold tracking-[-0.03em]">
          {headline.map((word, index) => (
            <span key={word} className="mr-[0.22em] inline-block overflow-hidden">
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.95,
                  delay: 0.35 + index * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`inline-block ${
                  index === 2 || index === 4 ? "text-gradient" : "text-ice"
                }`}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-end"
        >
          <div>
            <HangingTag>
              <div className="glass relative flex w-[19rem] items-center gap-4 rounded-2xl px-5 py-4 select-none sm:w-[27rem]">
                {/* Punched hole the cord threads through. */}
                <span
                  aria-hidden
                  className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-ice/20 bg-navy-950"
                />
                <Avatar priority className="h-16 w-16 sm:h-20 sm:w-20" />
                <div className="min-w-0">
                  <p className="text-base font-semibold tracking-tight text-ice sm:text-lg">
                    {profile.name}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-mist/80 sm:text-sm">
                    {profile.title}
                  </p>
                </div>
              </div>
            </HangingTag>

            <div className="mt-4 flex h-7 items-center gap-2 font-mono text-sm text-cyan">
              <span className="text-mist/45">$</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={taglineIndex}
                  initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                  transition={{ duration: 0.45 }}
                >
                  {profile.taglines[taglineIndex]}
                </motion.span>
              </AnimatePresence>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.1, repeat: Infinity }}
                className="inline-block h-4 w-1.5 bg-cyan"
              />
            </div>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-mist/70">
              {profile.yearsOfExperience} years shipping scalable web and mobile
              products end to end — from architecture and design through
              deployment, performance and maintenance.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic strength={0.22}>
                <button
                  onClick={() => scrollToSection("work")}
                  className="group relative overflow-hidden rounded-full bg-ice px-7 py-3.5 text-sm font-semibold text-navy-900"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View my work
                    <motion.span
                      aria-hidden
                      className="inline-block"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                  <span className="absolute inset-0 z-0 translate-y-full bg-gradient-to-r from-cyan to-violet transition-transform duration-400 group-hover:translate-y-0" />
                </button>
              </Magnetic>

              <Magnetic strength={0.22}>
                <a
                  href={`mailto:${profile.email}`}
                  className="rounded-full border border-ice/20 px-7 py-3.5 text-sm font-semibold text-ice transition-colors duration-300 hover:border-cyan/60 hover:bg-cyan/10"
                >
                  Get in touch
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 1.1 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
                className="glass group relative overflow-hidden rounded-2xl p-5"
              >
                <div className="absolute -top-16 -right-10 h-32 w-32 rounded-full bg-cyan/10 blur-2xl transition-opacity duration-500 group-hover:bg-cyan/25" />
                <div className="relative font-mono text-2xl font-bold text-ice sm:text-3xl">
                  {metric.value}
                </div>
                <div className="relative mt-1.5 text-sm font-medium text-ice/90">
                  {metric.label}
                </div>
                <div className="relative mt-1 text-xs leading-snug text-mist/55">
                  {metric.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={() => scrollToSection("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        aria-label="Scroll to about section"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-mist/45 uppercase">
          Scroll
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-ice/15">
          <motion.span
            className="absolute inset-x-0 h-4 bg-cyan"
            animate={{ y: ["-100%", "300%"] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.button>

      <p className="absolute right-5 bottom-7 hidden font-mono text-[10px] tracking-[0.2em] text-mist/35 uppercase sm:right-8 lg:block">
        Drag · click · hover the background
      </p>
    </section>
  );
}
