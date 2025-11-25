'use client';

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

// Concept-specific gradient frame to avoid cross-route style bleed with the homepage panel.
export function ConceptGlowPanel({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  const variants = {
    initial: { backgroundPosition: "0 50%" },
    animate: { backgroundPosition: ["0 50%", "100% 50%", "0 50%"] },
  };
  const radiusClass = "rounded-[2rem]";

  return (
    <div className={cn("relative p-[4px] group", containerClassName)} key="concept-glow-panel">
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        style={{ backgroundSize: "400% 400%" }}
        className={cn(
          "absolute inset-0 z-[1] bg-[radial-gradient(circle_farthest-side_at_0_100%,#3c415c,transparent),radial-gradient(circle_farthest-side_at_100%_0,#565b7a,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#c69344,transparent),radial-gradient(circle_farthest-side_at_0_0,#eacc84,#11131f)] opacity-60 blur-xl transition duration-500 group-hover:opacity-100",
          radiusClass,
        )}
      />
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        style={{ backgroundSize: "400% 400%" }}
        className={cn(
          "absolute inset-0 z-[1] bg-[radial-gradient(circle_farthest-side_at_0_100%,#3c415c,transparent),radial-gradient(circle_farthest-side_at_100%_0,#565b7a,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#c69344,transparent),radial-gradient(circle_farthest-side_at_0_0,#eacc84,#11131f)]",
          radiusClass,
        )}
      />
      <div className={cn("relative z-10 overflow-hidden", radiusClass, className)}>{children}</div>
    </div>
  );
}
