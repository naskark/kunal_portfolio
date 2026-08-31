"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const FILL_STEP_MS = 130;
const SLIDE_MS = 850;

export default function Preloader({ name }: { name: string }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((value) => (value >= 100 ? 100 : Math.min(100, value + 22)));
    }, FILL_STEP_MS);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress < 100) return;
    const slide = setTimeout(() => setLeaving(true), 350);
    // The overlay unmounts on a timer rather than on animation completion, so a
    // throttled or skipped animation can never leave the page covered.
    const unmount = setTimeout(() => setRemoved(true), 350 + SLIDE_MS);
    return () => {
      clearTimeout(slide);
      clearTimeout(unmount);
    };
  }, [progress]);

  if (removed) return null;

  return (
    <motion.div
      aria-hidden
      initial={{ y: 0 }}
      animate={{ y: leaving ? "-100%" : 0 }}
      transition={{ duration: SLIDE_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed inset-0 z-[90] flex flex-col items-center justify-center bg-navy-950 ${
        leaving ? "pointer-events-none" : ""
      }`}
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-25" />
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-2xl font-semibold tracking-tight text-ice sm:text-3xl"
      >
        {name}
      </motion.p>
      <div className="relative mt-6 h-px w-52 overflow-hidden bg-ice/12">
        <div
          className="h-full bg-gradient-to-r from-cyan to-violet transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="relative mt-4 font-mono text-[10px] tracking-[0.3em] text-cyan/70 uppercase">
        {Math.round(progress)}% — Initialising
      </p>
    </motion.div>
  );
}
