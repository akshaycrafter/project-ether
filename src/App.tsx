import PerspectiveTunnelHero from "@/components/ui/perspective-tunnel-hero";
import { Ambient } from "./sections/design";
import { useScrollHandoff } from "./sections/handoff";
import { Problem } from "./sections/Problem";
import { Features } from "./sections/Features";
import { How } from "./sections/How";
import { Pricing } from "./sections/Pricing";
import { Waitlist } from "./sections/Waitlist";
import { Faq } from "./sections/Faq";
import { Footer } from "./sections/Footer";

export default function App() {
  useScrollHandoff();

  return (
    <>
      {/* Hero — READ-ONLY. Only rendered, never modified. */}
      <PerspectiveTunnelHero />

      {/* Everything below the tunnel, in the hero's own design language. */}
      <div className="relative bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white antialiased">
        <Ambient />
        <main className="relative">
          <Problem />
          <Features />
          <How />
          <Pricing />
          <Waitlist />
          <Faq />
          <Footer />
        </main>
      </div>
    </>
  );
}
