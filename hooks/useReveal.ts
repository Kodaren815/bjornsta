'use client';

import { useEffect, useRef } from 'react';

/**
 * Adds the `visible` class to the element when it scrolls into view.
 * Works with the `.reveal`, `.reveal-left`, `.reveal-right` CSS classes
 * defined in globals.css.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(margin = '-100px') {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { rootMargin: margin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return ref;
}
