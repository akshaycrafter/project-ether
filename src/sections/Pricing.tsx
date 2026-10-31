"use client";
import { Display, Kicker, Reveal, Section, ctaClasses } from "./design";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Free",
    price: "₹0",
    per: "forever",
    blurb: "Try it on one number, no card.",
    features: [
      "1 WhatsApp number",
      "50 auto-replies / month",
      "10 bookings / month",
      "Your hours & service list",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Pro",
    price: "₹1,499",
    per: "a month",
    blurb: "The whole front desk, for one busy number.",
    features: [
      "Unlimited replies & bookings",
      "Reminders + no-show guard",
      "Calendar sync (Google / Outlook)",
      "Custom tone & FAQ",
      "Answers 24/7",
    ],
    cta: "Get Pro",
    featured: true,
  },
  {
    name: "Team",
    price: "₹3,999",
    per: "a month",
    blurb: "More than one location or number.",
    features: [
      "Everything in Pro",
      "Unlimited seats & numbers",
      "Shared calendar & view",
      "Onboarding call",
    ],
    cta: "Talk to us",
    featured: false,
  },
];

export function Pricing() {
  return (
    <Section id="pricing">
      <Reveal>
        <Kicker>Pricing</Kicker>
      </Reveal>
      <Reveal delay={0.06}>
        <Display className="mt-6 max-w-[24ch] text-4xl sm:text-6xl">
          Less than what one missed no-show costs you a week.
        </Display>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="mt-5 max-w-[48ch] text-base sm:text-lg font-light leading-relaxed text-neutral-600 dark:text-neutral-400">
          No setup fee. No per-message meter. You pick a shelf and change it
          when your queue gets bigger.
        </p>
      </Reveal>

      <div className="mt-14 grid items-stretch gap-5 sm:gap-6 md:grid-cols-3">
        {PLANS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08} className={cn(p.featured && "md:-mt-4 md:mb-4")}>
            <div
              className={cn(
                "flex h-full flex-col rounded-2xl bg-neutral-200/60 dark:bg-neutral-900/50 p-6 ring-1 ring-black/10 dark:ring-white/10 shadow-2xl shadow-neutral-950/10 dark:shadow-black/40",
                p.featured &&
                  "ring-2 ring-indigo-500/70 dark:ring-indigo-400/70 shadow-indigo-500/20 md:scale-[1.03]",
              )}
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">
                  {p.name}
                </p>
                {p.featured && (
                  <span className="rounded-full bg-indigo-500/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-indigo-600 ring-1 ring-indigo-500/30 dark:text-indigo-300">
                    most picked
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-end gap-2">
                <span className="text-4xl font-bold tracking-tighter text-neutral-900 dark:text-white">
                  {p.price}
                </span>
                <span className="mb-1 font-mono text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                  {p.per}
                </span>
              </div>

              <p className="mt-4 min-h-[38px] text-[14px] font-light text-neutral-500 dark:text-neutral-400">
                {p.blurb}
              </p>

              <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-[14px] text-neutral-700 dark:text-neutral-300"
                  >
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#waitlist"
                className={cn(
                  "mt-7",
                  ctaClasses(p.featured ? "primary" : "ghost"),
                  "w-full",
                )}
              >
                {p.cta}
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
