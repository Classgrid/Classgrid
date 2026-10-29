"use client";

import { motion, useAnimationControls, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
};

// Fade-in on scroll. The page HTML is sent fully visible (so Google and AI tools that do not run the page's
// code can read every section); only in the browser, a section still below the screen is hidden and then
// fades in when it scrolls into view, the same as before.
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 36,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [armed, setArmed] = useState(false);

  const dirMap = {
    up:    { y: distance, x: 0 },
    down:  { y: -distance, x: 0 },
    left:  { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    none:  { x: 0, y: 0 },
  };

  const variants = {
    hidden: { opacity: 0, ...dirMap[direction] },
    visible: { opacity: 1, x: 0, y: 0 }
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Already on screen when the page opens: it stays as it is (no flash)
    if (el.getBoundingClientRect().top < window.innerHeight - 80) return;
    controls.set("hidden");
    setArmed(true);
  }, [controls]);

  useEffect(() => {
    if (armed && isInView) controls.start("visible");
  }, [armed, isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={variants}
      initial={false}
      animate={controls}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
