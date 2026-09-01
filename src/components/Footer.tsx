"use client";

import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import type { PortfolioData } from "@/data/portfolio";
import { scrollToSection } from "@/components/SmoothScroll";
import { NAV_LINKS, type NavLink } from "@/components/Navbar";

export default function Footer({ data }: { data: PortfolioData }) {
  const { profile } = data;
  const pathname = usePathname();
  const router = useRouter();

  const go = (link: NavLink) => {
    if (link.href) {
      router.push(link.href);
      return;
    }
    if (pathname !== "/") {
      router.push(`/#${link.id}`);
      return;
    }
    scrollToSection(link.id);
  };

  return (
    <footer className="relative border-t border-ice/8 px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-tight text-ice">
            {profile.name}
          </p>
          <p className="mt-1 text-sm text-mist/55">
            {profile.title} · {profile.location}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => go(link)}
              className="text-sm text-mist/60 transition-colors duration-300 hover:text-cyan"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <motion.button
          onClick={() => go({ id: "home", label: "Home" })}
          whileHover={{ y: -4 }}
          className="flex w-fit items-center gap-2 rounded-full border border-ice/15 px-5 py-2.5 text-sm font-medium text-ice transition-colors duration-300 hover:border-cyan/50 hover:bg-cyan/10"
        >
          Back to top ↑
        </motion.button>
      </div>

      <p className="mx-auto mt-10 max-w-7xl font-mono text-[10px] tracking-[0.2em] text-mist/30 uppercase">
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  );
}
