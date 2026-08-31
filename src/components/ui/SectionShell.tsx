"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

export default function SectionShell({
  id,
  index,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 lg:mb-16"
      >
        <div className="flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-cyan uppercase">
          <span className="text-mist/50">{index}</span>
          <span className="h-px w-10 bg-gradient-to-r from-cyan to-transparent" />
          <span>{eyebrow}</span>
        </div>
        <h2 className="mt-5 max-w-3xl text-3xl leading-[1.1] font-semibold tracking-tight text-balance text-ice sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist/75 sm:text-lg">
            {description}
          </p>
        ) : null}
      </motion.div>
      {children}
    </section>
  );
}
