"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Magnetic from "@/components/ui/Magnetic";

export default function BlogsComingSoon() {
  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden px-5 pt-28 pb-20 sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.08),transparent_55%)]" />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-[11px] tracking-[0.22em] text-cyan uppercase"
        >
          Blogs
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-ice"
        >
          Coming soon
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-md text-base leading-relaxed text-mist/70 sm:text-lg"
        >
          Notes on engineering, product craft, and building for web and mobile —
          landing here shortly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.36 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <Link
              href="/"
              className="group relative inline-flex overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-navy-900"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan via-ice to-cyan bg-[length:200%_auto] transition-[background-position] duration-700 group-hover:bg-right" />
              <span className="relative">Back to portfolio</span>
            </Link>
          </Magnetic>

          <Link
            href="/#contact"
            className="rounded-full border border-ice/15 px-6 py-3 text-sm font-medium text-ice transition-colors duration-300 hover:border-cyan/50 hover:bg-cyan/10"
          >
            Get in touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
