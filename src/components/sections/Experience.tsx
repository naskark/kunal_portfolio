"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { PortfolioData } from "@/data/portfolio";
import SectionShell from "@/components/ui/SectionShell";
import { CardReveal } from "@/components/ui/Reveal";

export default function Experience({ data }: { data: PortfolioData }) {
  const { experiences } = data;
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const active = experiences[activeIndex];

  const select = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  return (
    <SectionShell
      id="experience"
      index="02"
      eyebrow="Experience"
      title={
        <>
          Six years, three teams,{" "}
          <span className="text-gradient">one standard.</span>
        </>
      }
      description="Move through the slides to see the scope, impact and stack of each role."
    >
      <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-12">
        <div
          className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
          role="tablist"
          aria-label="Work experience"
        >
          {experiences.map((experience, index) => (
            <button
              key={experience.id}
              role="tab"
              aria-selected={index === activeIndex}
              onClick={() => select(index)}
              className={`group relative shrink-0 rounded-2xl border p-4 text-left transition-all duration-400 lg:w-full ${
                index === activeIndex
                  ? "border-cyan/45 bg-cyan/[0.07]"
                  : "border-ice/10 bg-ice/[0.02] hover:border-ice/25"
              }`}
            >
              {index === activeIndex ? (
                <motion.span
                  layoutId="experience-marker"
                  className="absolute top-4 bottom-4 -left-px w-0.5 rounded-full bg-gradient-to-b from-cyan to-violet"
                  transition={{ type: "spring", stiffness: 340, damping: 30 }}
                />
              ) : null}
              <p className="font-mono text-[10px] tracking-[0.2em] text-cyan/80 uppercase">
                {experience.start} — {experience.end}
              </p>
              <p className="mt-2 max-w-[220px] text-sm font-semibold text-ice">
                {experience.company}
              </p>
              <p className="mt-0.5 max-w-[220px] text-xs text-mist/60">
                {experience.role}
              </p>
            </button>
          ))}
        </div>

        <CardReveal delay={0.1} className="relative min-h-[520px] sm:min-h-[460px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.article
              key={active.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: direction * -50, filter: "blur(8px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="glass relative overflow-hidden rounded-3xl p-6 sm:p-9"
            >
              <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-electric/15 blur-3xl" />

              <header className="relative flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-ice sm:text-3xl">
                    {active.role}
                  </h3>
                  <p className="mt-2 text-base text-cyan">
                    {active.company} · {active.location}
                  </p>
                </div>
                <span className="rounded-full border border-ice/15 px-4 py-1.5 font-mono text-xs text-mist/75">
                  {active.period}
                </span>
              </header>

              <p className="relative mt-6 max-w-2xl text-sm leading-relaxed text-mist/70 sm:text-base">
                {active.context}
              </p>

              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
                className="relative mt-7 space-y-3.5"
              >
                {active.highlights.map((highlight) => (
                  <motion.li
                    key={highlight}
                    variants={{
                      hidden: { opacity: 0, x: 22 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                    className="flex gap-3.5"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-cyan to-violet" />
                    <span className="text-sm leading-relaxed text-mist/80">
                      {highlight}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="relative mt-8 flex flex-wrap gap-2">
                {active.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-cyan/20 bg-cyan/[0.06] px-3 py-1.5 font-mono text-xs text-cyan/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex gap-2">
              {experiences.map((experience, index) => (
                <button
                  key={experience.id}
                  onClick={() => select(index)}
                  aria-label={`Show ${experience.company}`}
                  className={`h-1.5 rounded-full transition-all duration-400 ${
                    index === activeIndex
                      ? "w-10 bg-cyan"
                      : "w-4 bg-ice/20 hover:bg-ice/40"
                  }`}
                />
              ))}
            </div>
            <span className="font-mono text-xs text-mist/45">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(experiences.length).padStart(2, "0")}
            </span>
          </div>
        </CardReveal>
      </div>
    </SectionShell>
  );
}
