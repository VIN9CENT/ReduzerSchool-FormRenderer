'use client';

import { useEffect, useRef } from 'react';
import { useLandingTracking } from './useLandingTracking';

export function useScrollDepth() {
  const { trackScrollDepth } = useLandingTracking();
  const triggered = useRef(new Set<number>());

  useEffect(() => {
    const checkScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const percent = (scrolled / total) * 100;

      const thresholds = [25, 50, 75, 90] as const;
      for (const t of thresholds) {
        if (percent >= t && !triggered.current.has(t)) {
          triggered.current.add(t);
          trackScrollDepth(t);
        }
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, [trackScrollDepth]);
}
