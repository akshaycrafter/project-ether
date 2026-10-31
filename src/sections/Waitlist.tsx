"use client";
import { useState } from "react";
import { Display, Kicker, Reveal, Section, ctaClasses } from "./design";
import { cn } from "@/lib/utils";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <Section id="waitlist">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl bg-neutral-200/60 dark:bg-neutral-900/50 p-8 sm:p-14 ring-1 ring-black/10 dark:ring-white/10 shadow-2xl shadow-neutral-950/10 dark:shadow-black/40">
          {/* the same dot-grid the hero paints, faded into the panel */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_30%,transparent_80%)] opacity-40 dark:opacity-40" />

          <div className="relative mx-auto max-w-xl text-center">
            <Kicker className="mx-auto">Waitlist</Kicker>
            <Display className="mt-5 text-3xl sm:text-5xl">
              First 500 numbers get onboarded free.
            </Display>
            <p className="mt-4 text-[15px] sm:text-base font-light leading-relaxed text-neutral-600 dark:text-neutral-400">
              We set up a handful of salons, clinics and studios a week.
              Tell us where to reach you — we'll run the first day with you.
            </p>

            {sent ? (
              <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
                You're on the list — we'll write first.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setSent(true);
                }}
                className="mx-auto mt-8 flex max-w-md flex-col gap-2.5 sm:flex-row"
              >
                <label htmlFor="waitlist-email" className="sr-only">
                  Work email
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourshop.com"
                  className="w-full rounded-2xl bg-white/70 dark:bg-neutral-950/50 px-5 py-3 text-[15px] text-neutral-900 ring-1 ring-black/10 dark:text-neutral-100 dark:ring-white/15 outline-none transition-shadow focus:ring-2 focus:ring-indigo-500/60 placeholder:text-neutral-400"
                />
                <button type="submit" className={cn(ctaClasses("primary"), "shrink-0")}>
                  Join the waitlist
                </button>
              </form>
            )}
            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500">
              no card · no spam · leave any time
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
