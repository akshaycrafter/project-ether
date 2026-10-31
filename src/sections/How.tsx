"use client";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Display, Kicker, Reveal, Section } from "./design";

const STEPS = [
  {
    n: "01",
    title: "Connect the number you already have",
    body: "Point Codelet at your existing WhatsApp Business line. Nothing to migrate, no new number, no forwarding. It joins where your customers already write.",
  },
  {
    n: "02",
    title: "Give it your hours, services, calendar",
    body: "Drop in opening times and a service list. Point it at Google or Outlook calendar so the slots it offers are the slots you actually have.",
  },
  {
    n: "03",
    title: "It runs the front desk",
    body: "Replies in seconds, books, reminds, guards the no-show. You watch the day fill up instead of chasing it. When something's odd, it hands off to you.",
  },
];

export function How() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Progress down the spine as the section scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 35%"],
  });
  const scaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Each node "pops" as the fill line reaches it. Fixed 3 steps, so the
  // transforms are unrolled (hooks can't live in the map below).
  const nodeScale0 = useTransform(scrollYProgress, [0, 0.15], [0.6, 1]);
  const nodeScale1 = useTransform(scrollYProgress, [0.35, 0.5], [0.6, 1]);
  const nodeScale2 = useTransform(scrollYProgress, [0.65, 0.85], [0.6, 1]);
  const nodeScales = [nodeScale0, nodeScale1, nodeScale2];

  return (
    <Section id="how">
      <Reveal>
        <Kicker>How it works</Kicker>
      </Reveal>
      <Reveal delay={0.06}>
        <Display className="mt-6 max-w-[20ch] text-4xl sm:text-6xl">
          Three steps, then it works while you don't.
        </Display>
      </Reveal>

      <div ref={ref} className="relative mt-16">
        {/* the spine a line travels down */}
        <div className="absolute left-[27px] top-0 bottom-0 w-px bg-black/10 dark:bg-white/10 sm:left-[31px]" />
        {/* the fill that grows with scroll */}
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="absolute left-[27px] top-0 bottom-0 w-px bg-indigo-500 dark:bg-indigo-400 sm:left-[31px]"
        />

        <ol className="flex flex-col gap-14 sm:gap-20">
          {STEPS.map((s, i) => (
            <li key={s.n} className="relative pl-16 sm:pl-20">
              {/* node on the spine */}
              <motion.span
                style={{ scale: reduce ? 1 : nodeScales[i] }}
                className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-200/70 dark:bg-neutral-900/60 ring-1 ring-black/10 dark:ring-white/10 sm:h-[62px] sm:w-[62px]"
              >
                <span className="font-mono text-[13px] font-semibold text-indigo-600 dark:text-indigo-400">
                  {s.n}
                </span>
              </motion.span>

              <Reveal key={`r-${i}`} delay={i * 0.05}>
                <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-2xl">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-[46ch] text-[15px] font-light leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {s.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
