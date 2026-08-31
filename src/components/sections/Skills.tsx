"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { PortfolioData } from "@/data/portfolio";
import SectionShell from "@/components/ui/SectionShell";
import { StaggerGroup, staggerItem } from "@/components/ui/Reveal";
import { SkillIcon } from "@/components/ui/skill-icons";

const MARQUEE = [
  "TypeScript",
  "React Native",
  "Next.js",
  "Node.js",
  "Expo",
  "Nest.js",
  "Tailwind CSS",
  "OpenAI",
  "AWS",
  "Redux",
  "Jest",
  "Firebase",
  "Socket.IO",
];

export default function Skills({ data }: { data: PortfolioData }) {
  const { skills } = data;
  const [activeGroup, setActiveGroup] = useState(skills[0].id);

  return (
    <SectionShell
      id="skills"
      index="04"
      eyebrow="Toolkit"
      title={
        <>
          The stack behind the{" "}
          <span className="text-gradient">shipped work.</span>
        </>
      }
      description="Hover a chip to light it up. Pick a category to filter the toolkit."
    >
      <div className="mb-10 flex flex-wrap gap-2.5">
        {skills.map((group) => (
          <button
            key={group.id}
            onClick={() => setActiveGroup(group.id)}
            className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
              activeGroup === group.id ? "text-navy-900" : "text-mist/70 hover:text-ice"
            }`}
          >
            {activeGroup === group.id ? (
              <motion.span
                layoutId="skill-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan to-ice"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            ) : (
              <span className="absolute inset-0 rounded-full border border-ice/12" />
            )}
            <span className="relative z-10">{group.label}</span>
          </button>
        ))}
      </div>

      {skills
        .filter((group) => group.id === activeGroup)
        .map((group) => (
          <StaggerGroup
            key={group.id}
            stagger={0.045}
            className="flex flex-wrap gap-3"
          >
            {group.items.map((item) => (
              <motion.span
                key={item}
                variants={staggerItem}
                whileHover={{ y: -5, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
                className="glass flex cursor-default items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium text-ice/90 transition-colors duration-300 hover:border-cyan/45 hover:text-ice"
                data-cursor-hover
              >
                <SkillIcon name={item} className="text-lg" />
                {item}
              </motion.span>
            ))}
          </StaggerGroup>
        ))}

      <div className="relative mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
          {[...MARQUEE, ...MARQUEE].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex items-center gap-3 font-mono text-sm whitespace-nowrap text-mist/55"
            >
              <SkillIcon name={item} className="text-base opacity-80" />
              {item}
              <span className="ml-1 text-cyan/40">◆</span>
            </span>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
