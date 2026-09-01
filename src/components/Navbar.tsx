"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { scrollToSection } from "@/components/SmoothScroll";

export type NavLink = {
  id: string;
  label: string;
  /** When set, navigates to a route instead of scrolling a home section. */
  href?: string;
};

export const NAV_LINKS: NavLink[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "blogs", label: "Blogs", href: "/blogs" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const keepVisibleUntil = useRef(0);
  const onHome = pathname === "/";
  const highlighted = pathname?.startsWith("/blogs") ? "blogs" : active;

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 40);

    const delta = value - lastScrollY.current;
    // Ignore sub-pixel jitter and momentum wobble so the bar doesn't flicker.
    if (Math.abs(delta) < 8) return;

    lastScrollY.current = value;

    // A nav click scrolls downwards, which shouldn't read as "hide".
    if (Date.now() < keepVisibleUntil.current) {
      setHidden(false);
      return;
    }

    // Near the top the bar always stays put, so it can't hide over the hero.
    setHidden(value > 140 && delta > 0);
  });

  useEffect(() => {
    if (!onHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    for (const link of NAV_LINKS) {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [onHome]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const go = (link: NavLink) => {
    setMenuOpen(false);
    setHidden(false);
    keepVisibleUntil.current = Date.now() + 1600;

    if (link.href) {
      router.push(link.href);
      return;
    }

    if (!onHome) {
      router.push(`/#${link.id}`);
      return;
    }

    // Let the overlay unmount before Lenis takes over the scroll.
    requestAnimationFrame(() => scrollToSection(link.id));
  };

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{
          // The mobile menu needs its close button, so never hide while it's open.
          y: hidden && !menuOpen ? "-105%" : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 right-0 left-0 z-50"
      >
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? "border-b border-ice/10 bg-navy-950/70 backdrop-blur-xl"
              : "border-b border-transparent"
          }`}
        >
          <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
            <button
              onClick={() => go({ id: "home", label: "Home" })}
              className="group flex items-center gap-3"
              aria-label="Back to top"
            >
              <span className="relative grid h-10 w-10 place-items-center rounded-xl border border-cyan/40 bg-gradient-to-br from-electric/25 to-violet/20 font-mono text-sm font-bold text-ice">
                KN
                <span className="absolute inset-0 rounded-xl border border-cyan/60 opacity-0 transition-opacity duration-300 group-hover:animate-pulse-ring group-hover:opacity-100" />
              </span>
              <span className="hidden text-left sm:block">
                <span className="block text-sm font-semibold tracking-tight text-ice">
                  Kunal Naskar
                </span>
                <span className="block font-mono text-[10px] tracking-[0.2em] text-cyan/80 uppercase">
                  SWE III
                </span>
              </span>
            </button>

            <div className="hidden items-center gap-1 rounded-full border border-ice/10 bg-ice/[0.03] p-1.5 backdrop-blur-md lg:flex">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => go(link)}
                  className="relative rounded-full px-3.5 py-2 text-sm font-medium text-mist/75 transition-colors duration-300 hover:text-ice xl:px-4"
                >
                  {highlighted === link.id ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-electric/30 to-violet/25 ring-1 ring-cyan/30 ring-inset"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span
                    className={`relative z-10 ${highlighted === link.id ? "text-ice" : ""}`}
                  >
                    {link.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => go({ id: "contact", label: "Contact" })}
                className="group relative hidden overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold text-navy-900 sm:block"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-cyan via-ice to-cyan bg-[length:200%_auto] transition-[background-position] duration-700 group-hover:bg-right" />
                <span className="relative">Let&apos;s talk</span>
              </button>

              <button
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                className="relative grid h-11 w-11 place-items-center rounded-xl border border-ice/15 bg-ice/[0.04] lg:hidden"
              >
                <motion.span
                  className="absolute h-px w-5 bg-ice"
                  animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute h-px w-5 bg-ice"
                  animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            </div>
          </nav>
        </div>

        <motion.div
          style={{ scaleX: progress }}
          className="h-px origin-left bg-gradient-to-r from-cyan via-electric to-violet"
        />
      </motion.header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-navy-950/95 px-8 backdrop-blur-2xl lg:hidden"
          >
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />
            <nav className="relative space-y-2">
              {NAV_LINKS.map((link, index) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{
                    delay: 0.08 + index * 0.06,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => go(link)}
                  className="group flex w-full items-baseline gap-4 border-b border-ice/8 py-4 text-left"
                >
                  <span className="font-mono text-xs text-cyan/70">
                    0{index + 1}
                  </span>
                  <span
                    className={`text-3xl font-semibold tracking-tight transition-colors ${
                      highlighted === link.id ? "text-cyan" : "text-ice"
                    }`}
                  >
                    {link.label}
                  </span>
                </motion.button>
              ))}
            </nav>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative mt-10 font-mono text-xs tracking-[0.2em] text-mist/50 uppercase"
            >
              Pune, India
            </motion.p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
