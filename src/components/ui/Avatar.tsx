"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { LuX, LuZoomIn } from "react-icons/lu";

/**
 * The source photo is warm sepia, which clashes with the navy palette, so it is
 * desaturated and re-tinted through a blend overlay to sit in the same family
 * as the rest of the page. Clicking opens the full, untinted photo.
 */
export default function Avatar({
  className = "h-24 w-24 sm:h-28 sm:w-28",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="View larger portrait"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.97 }}
        className={`group relative shrink-0 cursor-pointer ${className}`}
      >
        <div className="absolute -inset-2.5 rounded-full bg-cyan/20 blur-xl transition-colors duration-500 group-hover:bg-cyan/40" />

        <motion.div
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-[2.5px] rounded-full bg-[conic-gradient(from_0deg,#22d3ee,#4f7cff,#a78bfa,#22d3ee)]"
        />
        <div className="absolute inset-0 rounded-full bg-navy-900" />

        <div className="relative h-full w-full overflow-hidden rounded-full">
          <Image
            src="/profile-avatar.jpg"
            alt="Portrait of Kunal Naskar"
            fill
            sizes="(min-width: 640px) 80px, 64px"
            priority={priority}
            className="scale-[1.06] object-cover grayscale contrast-105 transition-all duration-500 ease-out group-hover:scale-[1.35] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-electric/40 via-transparent to-cyan/25 mix-blend-color transition-opacity duration-500 group-hover:opacity-0" />
          <div className="absolute inset-0 rounded-full ring-1 ring-ice/15 ring-inset" />

          <span className="absolute inset-0 grid place-items-center bg-navy-950/50 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100">
            <LuZoomIn aria-hidden className="text-xl text-ice" />
          </span>
        </div>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Portrait of Kunal Naskar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[95] grid place-items-center bg-navy-950/85 p-6 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-md"
            >
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-cyan/20 via-electric/10 to-violet/20 blur-2xl" />
              <Image
                src="/profile-full.jpg"
                alt="Portrait of Kunal Naskar"
                width={852}
                height={852}
                sizes="(min-width: 640px) 448px, 90vw"
                className="relative w-full rounded-2xl ring-1 ring-ice/15"
              />
            </motion.div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close portrait"
              className="absolute top-6 right-6 grid h-11 w-11 place-items-center rounded-full border border-ice/15 bg-ice/[0.04] text-ice transition-colors duration-300 hover:border-cyan/50 hover:bg-cyan/10"
            >
              <LuX aria-hidden />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
