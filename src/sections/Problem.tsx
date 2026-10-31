"use client";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { ButtonLink, Display, Kicker, Reveal, Section } from "./design";
import { cn } from "@/lib/utils";

const LINES = [
  { side: "them" as const, time: "11:34 pm", text: "Hi, are you open tomorrow morning? Need a cut around 10." },
  { side: "us" as const, time: "11:34 pm", text: "Hi! Yes — 10:15 with Arjun is free. Shall I book it?" },
  { side: "them" as const, time: "11:35 pm", text: "Yes please, that works." },
  { side: "us" as const, time: "11:35 pm", text: "Done. You're in for 10:15 tomorrow. I'll ping you a reminder Sunday 6 pm." },
];

function BubbleFrame({
  side,
  time,
  children,
}: {
  side: "them" | "us";
  time: string;
  children: ReactNode;
}) {
  const us = side === "us";
  return (
    <div className={cn("flex flex-col", us ? "items-end" : "items-start")}>
      <div
        className={cn(
          "max-w-[82%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed ring-1",
          us
            ? "rounded-br-sm bg-indigo-500/10 text-neutral-900 ring-indigo-500/20 dark:bg-indigo-400/10 dark:text-neutral-100"
            : "rounded-bl-sm bg-neutral-900/5 text-neutral-800 ring-black/5 dark:bg-neutral-100/10 dark:text-neutral-200 dark:ring-white/10",
        )}
      >
        {children}
        <span className="mt-1 block text-right font-mono text-[9px] tracking-widest text-neutral-400 dark:text-neutral-500">
          {time}
        </span>
      </div>
    </div>
  );
}

export function Problem() {
  const reduce = useReducedMotion();
  const threadRef = useRef<HTMLDivElement>(null);

  // The thread unfolds line-by-line as you scroll through it — like a real
  // WhatsApp conversation, driven by scroll (no click). Line 0 appears with
  // the card; lines 1–3 fade + rise as the card travels up the viewport.
  const { scrollYProgress } = useScroll({
    target: threadRef,
    offset: ["start 70%", "end 30%"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const op1 = useTransform(smooth, [0.15, 0.38], [0, 1]);
  const op2 = useTransform(smooth, [0.42, 0.62], [0, 1]);
  const op3 = useTransform(smooth, [0.66, 0.88], [0, 1]);
  const y1 = useTransform(smooth, [0.15, 0.38], [14, 0]);
  const y2 = useTransform(smooth, [0.42, 0.62], [14, 0]);
  const y3 = useTransform(smooth, [0.66, 0.88], [14, 0]);
  const scrollOps = [op1, op2, op3];
  const scrollYs = [y1, y2, y3];

  return (
    <Section id="problem" className="pt-28 sm:pt-32">
      <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:items-center">
        {/* Copy */}
        <div>
          <Reveal>
            <Kicker>The problem</Kicker>
          </Reveal>
          <Reveal delay={0.06}>
            <Display className="mt-6 text-4xl sm:text-6xl">
              The 11 pm booking is the one you never take.
            </Display>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[44ch] text-base sm:text-lg font-light leading-relaxed text-neutral-600 dark:text-neutral-400">
              Every salon, clinic, studio and restaurant runs on the same
              leak: customers write after hours, and the slot is gone by the
              time you see it. Codelet answers in seconds, books into your
              real calendar, and keeps the no-shows off the books.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <ButtonLink href="#waitlist" className="mt-8">
              Get on the waitlist
              <span aria-hidden className="font-mono">→</span>
            </ButtonLink>
          </Reveal>
        </div>

        {/* 11 pm WhatsApp conversation */}
        <Reveal delay={0.1} className="lg:justify-self-end w-full max-w-[360px]">
          <div className="rounded-2xl bg-neutral-200/60 dark:bg-neutral-900/60 ring-1 ring-black/10 dark:ring-white/10 shadow-2xl shadow-neutral-950/10 dark:shadow-black/40 p-3">
            {/* header */}
            <div className="flex items-center gap-3 border-b border-black/5 dark:border-white/10 pb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 dark:bg-white/10">
                <span className="font-mono text-[11px] font-semibold text-white dark:text-neutral-900">MR</span>
              </div>
              <div>
                <p className="text-[13px] font-medium text-neutral-900 dark:text-neutral-100">Mantra Salon</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400">answers in seconds</p>
              </div>
            </div>

            {/* thread — builds line by line on scroll */}
            <div ref={threadRef} className="flex flex-col gap-2.5 bg-white/60 dark:bg-neutral-950/40 rounded-xl p-3 pt-4">
              <p className="mb-1 text-center font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500">
                Today
              </p>
              {LINES.map((l, i) => {
                const first = i === 0;
                return (
                  <motion.div
                    key={i}
                    style={!first && !reduce ? { opacity: scrollOps[i - 1], y: scrollYs[i - 1] } : undefined}
                    initial={!first || reduce ? undefined : { opacity: 0, y: 14 }}
                    whileInView={!first || reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={
                      !first && !reduce
                        ? { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                        : undefined
                    }
                  >
                    <BubbleFrame side={l.side} time={l.time}>
                      {l.text}
                    </BubbleFrame>
                  </motion.div>
                );
              })}
              <p className="mt-1 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
                booked while nobody was at the desk
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
