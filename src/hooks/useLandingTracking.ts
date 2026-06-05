'use client';

import posthog from 'posthog-js';
import { useCallback } from 'react';

export type CTALocation = 'header' | 'hero' | 'footer' | 'pricing'|'problem-section'|'admission-process'|'program-overview'|'why-us';

export function useLandingTracking() {
  const trackCTAClick = useCallback((location: CTALocation) => {
    posthog.capture('cta_clicked', {
      cta_location: location,
    });
  }, []);

  const trackFAQClick = useCallback((question: string) => {
    const topic = classifyFAQ(question);
    posthog.capture('faq_clicked', {
      faq_question: question,
      faq_topic: topic,
    });
  }, []);

  const trackScrollDepth = useCallback((depth: 25 | 50 | 75 | 90) => {
    posthog.capture('scroll_depth_reached', { depth_percent: depth });
  }, []);

  return {
    trackCTAClick,
    trackFAQClick,
    trackScrollDepth,
  };
}

function classifyFAQ(
  question: string
): 'cost' | 'location' | 'housing' | 'other' {
  const q = question.toLowerCase();
  if (
    q.includes('cost') ||
    q.includes('fee') ||
    q.includes('price') ||
    q.includes('pay')
  )
    return 'cost';
  if (
    q.includes('location') ||
    q.includes('kisii') ||
    q.includes('nairobi') ||
    q.includes('where')
  )
    return 'location';
  if (
    q.includes('housing') ||
    q.includes('accommodation') ||
    q.includes('stay')
  )
    return 'housing';
  return 'other';
}
