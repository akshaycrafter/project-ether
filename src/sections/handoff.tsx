"use client";

import { useEffect, useRef } from "react";

/**
 * The hero owns the mouse-wheel while it is on screen: it preventDefaults and
 * drives its 3D tunnel from `deltaY * 0.0008`, clamped to 0..1. Once the
 * tunnel is finished the page would be stuck — the hero keeps eating the wheel
 * but its progress is already clamped at 1, so wheeling down does nothing.
 *
 * This shim hands scroll back to the page WITHOUT touching the hero.
 *
 * Why it can track the hero without reading it: the hero's progress is mutated
 * by *nothing but its wheel handler*, and that handler integrates exactly
 * `deltaY * 0.0008` from an initial 0, clamped to [0, 1]. So mirroring the same
 * integral ourselves (same factor, capture phase, only while the hero is on
 * screen) keeps our mirror in lockstep with the hero's real progress.
 *
 * Three bands, all keyed to `window.scrollY` (the hero is `h-[100svh]`):
 *  1. scrollY === 0            → hero fully on screen. We only update the
 *                                mirror. Once the mirror crosses the finish
 *                                line on a downward tick we preventDefault and
 *                                start moving the page ourselves, so the handoff
 *                                happens on the very next tick with no dead zone.
 *  2. 0 < scrollY < vh        → hero is still covering the top of the viewport.
 *                                The hero would keep swallowing wheel events that
 *                                land on it, so for downward motion we take over
 *                                the scroll (preventDefault + scrollBy) and drive
 *                                the page ourselves. This makes the transition
 *                                independent of where the pointer is.
 *  3. scrollY >= vh          → hero has fully scrolled away. We stop
 *                                intervening; native scroll (and touch) handle the
 *                                rest of the landing.
 *
 * No Lenis / no smooth-scroll library — native scroll, so it can't fight the
 * hero. Upward motion is left to the hero (it rewinds the tunnel). Touch and
 * keyboard scrolling never dispatch wheel events, so they are untouched and the
 * page scrolls normally on a phone (the tunnel itself is wheel-driven — a
 * property of the hero, not something we change).
 */
export function useScrollHandoff() {
  // Mirrored hero progress (a pure function of the wheel integral).
  const progressRef = useRef(0);
  const FLOOR = 0.999; // "tunnel finished" threshold

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // Leave pinch-zoom alone.
      if (e.ctrlKey) return;

      // Native pixel delta (some older devices report lines — normalise).
      const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      const vh = window.innerHeight;

      // Band 1: hero fully on screen.
      if (window.scrollY === 0) {
        const p = Math.max(0, Math.min(1, progressRef.current + dy * 0.0008));
        progressRef.current = p;

        // Tunnel still travelling → the hero owns this tick.
        if (p < FLOOR) return;
        // Finished, wheeling down → begin the handoff on this very tick.
        if (dy < 0) return;
        e.preventDefault();
        window.scrollBy({ top: dy, behavior: "auto" });
        return;
      }

      // Band 3: hero has scrolled away — native scroll / touch take over.
      if (window.scrollY >= vh) return;

      // Band 2: hero still covers the top. Drive downward scroll ourselves so
      // the transition works no matter where the pointer is.
      if (dy > 0) {
        e.preventDefault();
        window.scrollBy({ top: dy, behavior: "auto" });
      }
      // Upward motion: let native scroll up; at the top the hero rewinds it.
    };

    // capture:true so we see every wheel event before the hero's own listener.
    document.addEventListener("wheel", onWheel, {
      capture: true,
      passive: false,
    });
    return () =>
      document.removeEventListener("wheel", onWheel, { capture: true });
  }, []);
}
