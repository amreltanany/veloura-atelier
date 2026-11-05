import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

/**
 * Lenis smooth scroll synced with GSAP, plus fade-up reveals for each <section>.
 * The app swaps views (home / catalog / studio) without page loads, so new
 * sections are picked up by watching the DOM.
 */
export function startSmoothScroll() {
  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    // Let drawers and modals scroll natively.
    prevent: (node) => !!node.closest?.('[role="dialog"], .overflow-y-auto'),
  });
  window.lenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  const seen = new WeakSet<Element>();
  const reveal = () => {
    document.querySelectorAll('main section').forEach((section, i) => {
      if (seen.has(section)) return;
      seen.add(section);
      if (i === 0 && section.getBoundingClientRect().top < window.innerHeight) return; // hero is already on screen
      gsap.from(section.children, {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.08,
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: section, start: 'top 85%' },
      });
    });
    ScrollTrigger.refresh();
  };
  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; reveal(); });
  }).observe(document.getElementById('root')!, { childList: true, subtree: true });
  reveal();
}

/** Scroll to the top through Lenis when it's running. */
export function scrollToTop() {
  if (window.lenis) window.lenis.scrollTo(0, { duration: 0.8 });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

/** Scroll to an element through Lenis when it's running. */
export function scrollToElement(el: Element | null) {
  if (!el) return;
  if (window.lenis) window.lenis.scrollTo(el as HTMLElement, { offset: -72 });
  else el.scrollIntoView({ behavior: 'smooth' });
}
