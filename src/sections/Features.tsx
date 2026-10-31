"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { Display, Kicker, Reveal, Section } from "./design";
import { EASE } from "./design";
import { cn } from "@/lib/utils";

function FloatCard({
  tilt = 0,
  className,
  children,
}: {
  tilt?: number;
  className?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? undefined : { rotate: tilt, opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { rotate: tilt / 2, opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={reduce ? undefined : { duration: 0.8, ease: EASE }}
      className={cn(
        "relative h-full overflow-hidden rounded-2xl bg-neutral-200/60 dark:bg-neutral-900/50 ring-1 ring-black/10 dark:ring-white/10 shadow-2xl shadow-neutral-950/10 dark:shadow-black/40 p-5 sm:p-6",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-indigo-500 dark:text-indigo-400">
      {children}
    </p>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-3 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
      {children}
    </h3>
  );
}

/* Mini visual: a week strip where a slot fills itself in. */
function CalendarMini({ animate }: { animate: boolean }) {
  const slots = [
    { d: "M", t: "10:15", name: "Arjun", filled: true },
    { d: "T", t: "11:00", name: "Meera", filled: true },
    { d: "W", t: "09:30", name: "Sana", filled: false },
    { d: "T", t: "16:45", name: "Dev", filled: true },
    { d: "F", t: "10:15", name: "—", filled: false },
  ];
  return (
    <div className="mt-5 flex flex-col gap-1.5">
      {slots.map((s, i) => (
        <motion.div
          key={i}
          initial={animate ? { opacity: 0, x: 12 } : false}
          animate={animate ? { opacity: 1, x: 0 } : {}}
          transition={animate ? { duration: 0.5, delay: i * 0.08, ease: EASE } : undefined}
          className={cn(
            "flex items-center justify-between rounded-lg px-3 py-2 font-mono text-[11px] ring-1",
            s.filled
              ? "bg-neutral-950/[0.04] text-neutral-800 ring-black/5 dark:bg-white/5 dark:text-neutral-200 dark:ring-white/10"
              : "text-neutral-400 ring-black/5 dark:ring-white/10",
          )}
        >
          <span className="tracking-widest text-neutral-400 dark:text-neutral-500">
            {s.d} · {s.t}
          </span>
          <span className={s.filled ? "text-indigo-600 dark:text-indigo-300" : ""}>
            {s.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* Mini visual: an auto-reply card with the timestamp receipt. */
function ReplyMini() {
  return (
    <div className="mt-5 flex flex-col gap-2">
      <div className="max-w-[92%] rounded-xl rounded-bl-sm bg-neutral-900/5 px-3 py-2 text-[12px] text-neutral-800 ring-1 ring-black/5 dark:bg-neutral-100/10 dark:text-neutral-200 dark:ring-white/10">
        “Are you open Sunday?”
      </div>
      <div className="ml-auto max-w-[92%] rounded-xl rounded-br-sm bg-indigo-500/10 px-3 py-2 text-[12px] text-neutral-900 ring-1 ring-indigo-500/25 dark:text-neutral-100">
        Yes, 11 to 4. Saturday 2 pm is free too, want me to hold it?
      </div>
      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-indigo-500/80 dark:text-indigo-400/80">
        answered in 1.8 s · no one was watching
      </p>
    </div>
  );
}

/* Mini visual: a reminder + no-show guard card. */
function ReminderMini() {
  return (
    <div className="mt-5 flex flex-col gap-2">
      <div className="flex items-center justify-between rounded-lg bg-neutral-950/[0.04] px-3 py-2.5 text-[12px] ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10">
        <span className="font-mono text-[10px] uppercase tracking-widest text-indigo-600 dark:text-indigo-300">
          Sun · 6:00 pm
        </span>
        <span className="text-neutral-700 dark:text-neutral-300">
          reminder to Meera — Sat 2 pm with Arjun
        </span>
      </div>
      <div className="flex items-center justify-between rounded-lg bg-neutral-950/[0.04] px-3 py-2.5 text-[12px] ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10">
        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          Sat · 2:15 pm
        </span>
        <span className="text-neutral-700 dark:text-neutral-300">
          no-show guard — slot released, offer next open slot
        </span>
      </div>
    </div>
  );
}

export function Features() {
  const reduce = useReducedMotion();
  const animate = !reduce;

  return (
    <Section id="features">
      <Reveal>
        <Kicker>What it does</Kicker>
      </Reveal>
      <Reveal delay={0.06}>
        <Display className="mt-6 max-w-[22ch] text-4xl sm:text-6xl">
          It answers, books, and remembers. So you don't have to.
        </Display>
      </Reveal>

      {/* Bento: one tall card, two stacked — not three clones. */}
      <div className="mt-14 grid gap-5 sm:gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <FloatCard tilt={-1.4} className="lg:row-span-2">
          <Tag>01 · Bookings</Tag>
          <Heading>The booking writes itself into your calendar.</Heading>
          <p className="mt-2 text-[14px] font-light leading-relaxed text-neutral-500 dark:text-neutral-400">
            It checks real availability, rounds the time, drops the slot in
            with the customer's name, and marks the buffer. Nothing else to
            do at the desk.
          </p>
          <CalendarMini animate={animate} />
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
            week strip · slots fill as replies land
          </p>
        </FloatCard>

        <div className="grid gap-5 sm:gap-6">
          <FloatCard tilt={1.6}>
            <Tag>02 · Auto-reply</Tag>
            <Heading>Answers in its own voice, 24/7.</Heading>
            <ReplyMini />
          </FloatCard>
          <FloatCard tilt={-1.2}>
            <Tag>03 · Reminders</Tag>
            <Heading>Cuts no-shows before they cost you.</Heading>
            <ReminderMini />
          </FloatCard>
        </div>
      </div>
    </Section>
  );
}
