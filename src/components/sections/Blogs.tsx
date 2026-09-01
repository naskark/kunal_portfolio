"use client";

import Link from "next/link";
import { motion } from "motion/react";
import SectionShell from "@/components/ui/SectionShell";
import Magnetic from "@/components/ui/Magnetic";
import { CardReveal } from "@/components/ui/Reveal";
import { LuArrowUpRight } from "react-icons/lu";

export default function Blogs() {
  return (
    <SectionShell
      id="blogs"
      index="05"
      eyebrow="Writing"
      title={
        <>
          Thoughts, notes, and{" "}
          <span className="text-gradient">engineering write-ups.</span>
        </>
      }
      description="Longer-form pieces will live here. Open the blogs page to peek at what's coming."
    >
      <CardReveal>
        <Link
          href="/blogs"
          className="group relative block overflow-hidden rounded-3xl border border-ice/10 bg-ice/[0.03] p-8 transition-colors duration-500 hover:border-cyan/35 hover:bg-cyan/[0.04] sm:p-10"
        >
          <div className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-cyan/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="font-mono text-[11px] tracking-[0.2em] text-cyan uppercase">
                New page
              </p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-ice sm:text-4xl">
                Coming soon
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mist/65 sm:text-base">
                Open the blogs screen for the dedicated writing space — content
                will land here soon.
              </p>
            </div>

            <Magnetic strength={0.25}>
              <motion.span
                whileHover={{ x: 2, y: -2 }}
                className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-5 py-2.5 text-sm font-medium text-cyan"
              >
                Open blogs
                <LuArrowUpRight className="h-4 w-4" />
              </motion.span>
            </Magnetic>
          </div>
        </Link>
      </CardReveal>
    </SectionShell>
  );
}
