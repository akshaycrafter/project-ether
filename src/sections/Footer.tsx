"use client";
import { Kicker, Reveal } from "./design";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="relative mx-auto w-full max-w-6xl px-6 pb-10 sm:px-8">
      <Reveal>
        <div className="flex flex-col gap-10 border-t border-black/10 dark:border-white/10 pt-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-2xl font-bold tracking-tighter text-neutral-900 dark:text-white">
              Codelet
            </p>
            <Kicker className="mt-2">Runs the hours you can't</Kicker>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-14 gap-y-3 sm:grid-cols-3">
            {(
              [
                ["Product", ["Features", "How it works", "Pricing"]],
                ["Company", ["About", "Contact"]],
                ["Legal", ["Privacy", "Terms"]],
              ] as [string, string[]][]
            ).map(([label, links]) => (
              <div key={label}>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500">
                  {label}
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className={cn(
                          "text-[14px] text-neutral-600 transition-colors hover:text-neutral-900",
                          "dark:text-neutral-400 dark:hover:text-neutral-100",
                        )}
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
            © 2025 Codelet · built for small, busy places
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
            11 pm, handled · nobody's on shift
          </p>
        </div>
      </Reveal>
    </footer>
  );
}
