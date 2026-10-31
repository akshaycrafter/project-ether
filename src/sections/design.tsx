"use client";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type {
  AnchorHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

// One easing, same decelerating curve the tunnel's title reveal uses.
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Hero micro-label — the "Warp Drive Sequence" line, reused everywhere. */
export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-[11px] uppercase tracking-[0.4em] text-indigo-600 dark:text-indigo-400", className)}>
      {children}
    </p>
  );
}

/** Section shell — generous rhythm, consistent gutter. */
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-6xl px-6 sm:px-8 py-24 sm:py-32", className)}>
      {children}
    </section>
  );
}

/** Big tight display heading with the hero's ink→fade gradient fill. */
export function Display({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "font-bold tracking-tighter leading-[0.95] bg-gradient-to-b from-neutral-950 via-neutral-800 to-neutral-400 dark:from-white dark:via-white dark:to-white/40 bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Fade + rise on scroll into view. Honours prefers-reduced-motion. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** The fixed ambient field under every section — the hero's dot-grid +
 * indigo wash, so the handoff from the tunnel has the same background. */
export function Ambient() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,#000_50%,transparent_100%)] opacity-50 dark:opacity-45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(99,102,241,0.12)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_12%,rgba(99,102,241,0.14)_0%,transparent_65%)]" />
    </div>
  );
}

// The hero has no button of its own, so this sets the language: solid ink,
// rounded-2xl, thin ring, indigo ring on hover (mirrors the hero card hover).
export function ctaClasses(variant: "primary" | "ghost" = "primary") {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium ring-1 transition-all duration-500";
  return variant === "primary"
    ? cn(
        base,
        "bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 ring-black/10 dark:ring-white/15 shadow-lg shadow-neutral-950/10 dark:shadow-black/40 hover:ring-indigo-500/70 dark:hover:ring-indigo-400/70 hover:shadow-indigo-500/25",
      )
    : cn(
        base,
        "bg-transparent text-neutral-900 dark:text-neutral-100 ring-black/10 dark:ring-white/15 hover:ring-indigo-500/70 dark:hover:ring-indigo-400/70",
      );
}

export function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: {
  variant?: "primary" | "ghost";
  className?: string;
  children: ReactNode;
} & HTMLMotionProps<"button">) {
  const reduce = useReducedMotion();
  return (
    <motion.button
      whileTap={reduce ? undefined : { scale: 0.97 }}
      className={cn(ctaClasses(variant), className)}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...rest
}: {
  variant?: "primary" | "ghost";
  className?: string;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cn(ctaClasses(variant), className)} {...rest}>{children}</a>;
}
