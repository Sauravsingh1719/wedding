"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function CinematicReveal({ 
  children, 
  delay = 0,
  direction = "up" 
}: { 
  children: ReactNode, 
  delay?: number,
  direction?: "up" | "down" | "left" | "right" | "none"
}) {
  const yOffset = direction === "up" ? 30 : direction === "down" ? -30 : 0;
  const xOffset = direction === "left" ? 30 : direction === "right" ? -30 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 1.2,
        delay: delay,
        ease: [0.25, 1, 0.5, 1], // The luxury slow-deceleration curve
      }}
    >
      {children}
    </motion.div>
  );
}