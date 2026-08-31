"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { PortfolioData } from "@/data/portfolio";
import SectionShell from "@/components/ui/SectionShell";
import Reveal, { CardReveal } from "@/components/ui/Reveal";

export default function About({ data }: { data: PortfolioData }) {
  const { profile, education, awards } = data;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const orbRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <SectionShell
      id="about"
      index="01"
      eyebrow="About"
      title={
        <>
          Engineer who owns the problem,{" "}
          <span className="text-gradient">not just the ticket.</span>
        </>
      }
    >
      <div ref={ref} className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div className="space-y-6">
          <Reveal>
            <p className="text-lg leading-relaxed text-mist/80">{profile.summary}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-mono text-xs tracking-[0.24em] text-cyan uppercase">
                How I work
              </h3>
              <ul className="mt-5 space-y-4">
                {[
                  "Ship fast without breaking trust — measurable performance budgets on every release.",
                  "Design the flow before the component; UX decisions drive the architecture.",
                  "Lead by unblocking — mentoring, reviews and clear technical direction.",
                  "Own it in production: analytics, crash reporting and iteration loops.",
                ].map((line, index) => (
                  <li key={line} className="flex gap-4">
                    <span className="mt-0.5 font-mono text-xs text-cyan/70">
                      0{index + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-mist/75">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="space-y-5">
          <CardReveal>
            <motion.div
              style={{ y: orbY }}
              className="glass relative overflow-hidden rounded-2xl p-6"
            >
            <motion.div
              style={{ rotate: orbRotate }}
              className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[conic-gradient(from_0deg,#22d3ee33,#a78bfa33,#4f7cff33,#22d3ee33)] blur-2xl"
            />
            <h3 className="relative font-mono text-xs tracking-[0.24em] text-cyan uppercase">
              Education
            </h3>
            {education.map((item) => (
              <div key={item.institute} className="relative mt-4">
                <p className="text-base font-semibold text-ice">{item.degree}</p>
                <p className="text-sm text-cyan/85">{item.field}</p>
                <p className="mt-2 text-sm leading-snug text-mist/60">
                  {item.institute}
                </p>
                <p className="text-xs text-mist/45">{item.location}</p>
              </div>
            ))}
            </motion.div>
          </CardReveal>

          <Reveal direction="left" delay={0.15}>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-mono text-xs tracking-[0.24em] text-cyan uppercase">
                Recognition
              </h3>
              <div className="mt-4 space-y-3">
                {awards.map((award) => (
                  <motion.div
                    key={award.title}
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-3 rounded-xl border border-ice/8 bg-ice/[0.02] px-4 py-3"
                  >
                    <span className="text-lg" aria-hidden>
                      ★
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ice">{award.title}</p>
                      {award.organisation ? (
                        <p className="text-xs text-mist/55">{award.organisation}</p>
                      ) : null}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.25}>
            <div className="glass flex items-center justify-between rounded-2xl p-6">
              <div>
                <p className="font-mono text-xs tracking-[0.24em] text-cyan uppercase">
                  Based in
                </p>
                <p className="mt-2 text-lg font-semibold text-ice">{profile.location}</p>
              </div>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="grid h-14 w-14 place-items-center rounded-full border border-dashed border-cyan/40 text-lg"
                aria-hidden
              >
                ◉
              </motion.span>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
