"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const FINE_POINTER = "(pointer: fine)";

function subscribeToPointer(onChange: () => void) {
  const query = window.matchMedia(FINE_POINTER);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** Server render has no pointer, so the cursor stays off until hydration. */
function useHasFinePointer() {
  return useSyncExternalStore(
    subscribeToPointer,
    useCallback(() => window.matchMedia(FINE_POINTER).matches, []),
    useCallback(() => false, [])
  );
}

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.4 });

  const enabled = useHasFinePointer();
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest("a, button, [data-cursor-hover]")));
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] h-2 w-2 rounded-full bg-cyan mix-blend-screen"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full border border-cyan/70 mix-blend-screen"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 54 : 30,
          height: hovering ? 54 : 30,
          opacity: pressed ? 1 : 0.6,
          scale: pressed ? 0.8 : 1,
          backgroundColor: hovering ? "rgba(34,211,238,0.12)" : "rgba(34,211,238,0)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      />
    </>
  );
}
