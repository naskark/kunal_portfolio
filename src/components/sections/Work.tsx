"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { PortfolioData } from "@/data/portfolio";
import SectionShell from "@/components/ui/SectionShell";
import { CardReveal } from "@/components/ui/Reveal";

const SWIPE_THRESHOLD = 70;

export default function Work({ data }: { data: PortfolioData }) {
  const { apps } = data;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = (step: number) => {
    setDirection(step);
    setIndex((current) => (current + step + apps.length) % apps.length);
  };

  const active = apps[index];

  return (
    <SectionShell
      id="work"
      index="03"
      eyebrow="Live products"
      title={
        <>
          Apps in production on{" "}
          <span className="text-gradient">Play Store & App Store.</span>
        </>
      }
      description="Drag the card, use the arrows, or tap a dot. Every one of these is live and used by real customers."
    >
      <CardReveal className="relative">
        <div
          className="relative h-[380px] select-none sm:h-[340px]"
          style={{ perspective: "1400px" }}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={active.id}
              custom={direction}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => {
                if (info.offset.x < -SWIPE_THRESHOLD) paginate(1);
                else if (info.offset.x > SWIPE_THRESHOLD) paginate(-1);
              }}
              initial={{
                opacity: 0,
                x: direction * 320,
                rotateY: direction * -22,
                scale: 0.9,
              }}
              animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
              exit={{
                opacity: 0,
                x: direction * -320,
                rotateY: direction * 22,
                scale: 0.9,
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileDrag={{ cursor: "grabbing", scale: 0.98 }}
              className="absolute inset-0 cursor-grab"
              data-cursor-hover
            >
              <div className="glass relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-7 sm:p-10">
                <div
                  className="pointer-events-none absolute -top-32 -left-20 h-80 w-80 rounded-full blur-3xl"
                  style={{ background: `${active.accent}30` }}
                />
                <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span
                        className="grid h-14 w-14 place-items-center rounded-2xl border font-mono text-lg font-bold text-ice"
                        style={{
                          borderColor: `${active.accent}66`,
                          background: `${active.accent}22`,
                        }}
                      >
                        {active.name
                          .split(" ")
                          .map((word) => word[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                      <div>
                        <h3 className="text-2xl font-semibold tracking-tight text-ice sm:text-4xl">
                          {active.name}
                        </h3>
                        <p className="mt-1 font-mono text-[11px] tracking-[0.2em] text-cyan/80 uppercase">
                          {active.platform === "both"
                            ? "Android · iOS"
                            : active.platform === "ios"
                              ? "iOS"
                              : "Android"}
                        </p>
                      </div>
                    </div>
                    <p className="mt-6 max-w-lg text-base leading-relaxed text-mist/75 sm:text-lg">
                      {active.subtitle}
                    </p>
                  </div>
                  <span className="hidden font-mono text-6xl leading-none text-ice/8 sm:block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative mt-8 flex flex-wrap items-center gap-3">
                  {active.links.map((link) => (
                    <motion.a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      className="group flex items-center gap-2 rounded-full border border-ice/20 bg-ice/[0.04] px-5 py-3 text-sm font-semibold text-ice transition-colors duration-300 hover:border-cyan/50 hover:bg-cyan/10"
                    >
                      {link.label}
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        ↗
                      </span>
                    </motion.a>
                  ))}
                  <span className="ml-auto hidden font-mono text-[10px] tracking-[0.2em] text-mist/40 uppercase sm:block">
                    Drag to explore
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-2.5">
            {apps.map((app, dotIndex) => (
              <button
                key={app.id}
                onClick={() => {
                  setDirection(dotIndex > index ? 1 : -1);
                  setIndex(dotIndex);
                }}
                aria-label={`Show ${app.name}`}
                className="group relative py-2"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-400 ${
                    dotIndex === index ? "w-12" : "w-5 bg-ice/20 group-hover:bg-ice/45"
                  }`}
                  style={dotIndex === index ? { background: app.accent } : undefined}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {[
              { label: "Previous product", step: -1, glyph: "←" },
              { label: "Next product", step: 1, glyph: "→" },
            ].map((control) => (
              <motion.button
                key={control.label}
                onClick={() => paginate(control.step)}
                aria-label={control.label}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="grid h-12 w-12 place-items-center rounded-full border border-ice/18 bg-ice/[0.04] text-ice transition-colors duration-300 hover:border-cyan/55 hover:bg-cyan/10"
              >
                {control.glyph}
              </motion.button>
            ))}
          </div>
        </div>
      </CardReveal>
    </SectionShell>
  );
}
