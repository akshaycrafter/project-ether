"use client";
import { useId, useState } from "react";
import { Display, Kicker, Reveal, Section } from "./design";
import { cn } from "@/lib/utils";

const QA = [
  {
    q: "Does the customer have to install anything?",
    a: "No. It lives on the WhatsApp number you already use. They write it like a person, and it never shows as a bot.",
  },
  {
    q: "Can it book you outside your hours?",
    a: "Only into slots your calendar actually has. At 3 am it can still take the booking and hold the time, but it can't invent hours you're closed.",
  },
  {
    q: "What happens when it can't answer something?",
    a: "It says so, passes the thread to a person, and logs it. It never guesses your policy.",
  },
  {
    q: "How does my calendar stay in sync?",
    a: "Two-way with Google or Outlook. A booking made by phone shows up to it; a cancellation frees the slot for the next person.",
  },
  {
    q: "Does it sound like a chatbot?",
    a: "You set the tone once. After that it stays in that voice, including the parts that are just a normal person being normal.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const raw = useId();

  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <Reveal>
            <Kicker>Questions</Kicker>
          </Reveal>
          <Reveal delay={0.06}>
            <Display className="mt-6 text-4xl sm:text-5xl">
              The honest answers.
            </Display>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-[32ch] text-[15px] font-light leading-relaxed text-neutral-500 dark:text-neutral-400">
              The ones people ask before handing over a number.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div>
            {QA.map((item, i) => {
              const isOpen = open === i;
              const panelId = `${raw}-p-${i}`;
              const btnId = `${raw}-b-${i}`;
              return (
                <div key={i} className="border-b border-black/10 dark:border-white/10">
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left outline-none"
                    >
                      <span
                        className={cn(
                          "text-[16px] sm:text-[18px] font-medium tracking-tight transition-colors",
                          isOpen
                            ? "text-neutral-900 dark:text-white"
                            : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100",
                        )}
                      >
                        {item.q}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full ring-1 ring-black/10 dark:ring-white/15 transition-colors",
                          isOpen && "bg-indigo-500 text-white dark:bg-indigo-400",
                        )}
                      >
                        <span className="absolute h-px w-3 bg-current" />
                        <span
                          className={cn(
                            "absolute h-3 w-px bg-current transition-transform duration-300",
                            isOpen && "scale-y-0",
                          )}
                        />
                      </span>
                    </button>
                  </h3>
                  {/* grid-rows 0fr→1fr = smooth height animation without measuring */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isOpen ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 pr-14 text-[15px] font-light leading-relaxed text-neutral-500 dark:text-neutral-400">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
