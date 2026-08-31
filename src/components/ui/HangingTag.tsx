"use client";

import { useRef, type ReactNode } from "react";
import { animate, motion, useMotionValue } from "motion/react";

const REST_CORD = 36;
const MIN_CORD = 26;
const MAX_CORD = 300;
const MAX_ANGLE = 72;
/** Movement beyond this many pixels counts as a swing, not a click. */
const DRAG_THRESHOLD = 6;

/**
 * A tag suspended from a fixed pivot. While dragging, the cord swings and
 * stretches so the card travels with the pointer; on release both spring back,
 * the angle underdamped so it oscillates to a stop like a real pendulum.
 */
export default function HangingTag({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const angle = useMotionValue(0);
  const cord = useMotionValue(REST_CORD);

  const pivotRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const pivot = useRef({ x: 0, y: 0 });
  /** Where inside the card the user grabbed, so it doesn't jump to the cursor. */
  const grabOffset = useRef({ x: 0, y: 0 });
  const start = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const moved = useRef(false);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const pivotRect = pivotRef.current?.getBoundingClientRect();
    const cardRect = cardRef.current?.getBoundingClientRect();
    if (!pivotRect || !cardRect) return;

    pivot.current = {
      x: pivotRect.left + pivotRect.width / 2,
      y: pivotRect.top,
    };
    grabOffset.current = {
      x: event.clientX - (cardRect.left + cardRect.width / 2),
      y: event.clientY - cardRect.top,
    };
    start.current = { x: event.clientX, y: event.clientY };
    dragging.current = true;
    moved.current = false;
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;

    if (!moved.current) {
      const travelled = Math.hypot(
        event.clientX - start.current.x,
        event.clientY - start.current.y
      );
      if (travelled <= DRAG_THRESHOLD) return;
      moved.current = true;
      // Captured only once a real swing starts; capturing on pointerdown would
      // retarget the click and stop the avatar button from ever firing.
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    // Track the card's top-centre, offset by wherever the user grabbed it.
    const targetX = event.clientX - grabOffset.current.x - pivot.current.x;
    const targetY = event.clientY - grabOffset.current.y - pivot.current.y;

    const length = Math.hypot(targetX, Math.max(targetY, 0));
    cord.set(Math.max(MIN_CORD, Math.min(MAX_CORD, length)));

    // Negated because a positive CSS rotation swings a hanging card leftwards.
    const next = -(Math.atan2(targetX, Math.max(targetY, 1)) * 180) / Math.PI;
    angle.set(Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, next)));
  };

  const release = () => {
    if (!dragging.current) return;
    dragging.current = false;

    // Low damping on the angle is what produces the back-and-forth settle.
    animate(angle, 0, {
      type: "spring",
      stiffness: 55,
      damping: 5.5,
      mass: 1.1,
      restDelta: 0.05,
    });
    // The cord retracts firmly rather than bouncing.
    animate(cord, REST_CORD, {
      type: "spring",
      stiffness: 140,
      damping: 14,
    });
  };

  return (
    <div className={`relative w-fit ${className}`}>
      <div
        ref={pivotRef}
        className="absolute top-0 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <span className="block h-2.5 w-2.5 rounded-full border border-cyan/70 bg-navy-950 shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
      </div>

      {/* Idle sway lives on its own element so it can't fight the drag angle. */}
      <div className="origin-top animate-sway">
        <motion.div
          style={{ rotate: angle }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={release}
          onPointerCancel={release}
          onClickCapture={(event) => {
            // A swing shouldn't also trigger the avatar's lightbox.
            if (moved.current) {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
          className="origin-top cursor-grab touch-pan-y pt-1 active:cursor-grabbing"
        >
          <motion.div
            aria-hidden
            style={{ height: cord }}
            className="relative mx-auto w-px bg-gradient-to-b from-cyan/80 to-ice/25"
          />
          <div ref={cardRef}>{children}</div>
        </motion.div>
      </div>
    </div>
  );
}
