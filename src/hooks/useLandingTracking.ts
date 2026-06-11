'use client';

import posthog from 'posthog-js';
import { useCallback } from 'react';

export type CTALocation = 'header' | 'hero' | 'footer' | 'pricing'|'problem-section'|'admission-process'|'program-overview'|'why-us'|'final-cta';

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
): 'what_is_reduzer' | 'differentiation' | 'format' | 'curriculum' | 'projects' | 'career' | 'requirements' | 'other' {
  const q = question.toLowerCase();

  if (q.includes('what is reduzer'))
    return 'what_is_reduzer';
  if (q.includes('different') || q.includes('unique') || q.includes('makes'))
    return 'differentiation';
  if (q.includes('online') || q.includes('hybrid') || q.includes('in-person') || q.includes('remote') || q.includes('global'))
    return 'format';
  if (q.includes('technolog') || q.includes('learn') || q.includes('curriculum') || q.includes('project'))
    return 'curriculum';
  if (q.includes('real project') || q.includes('work on'))
    return 'projects';
  if (q.includes('job') || q.includes('career') || q.includes('graduating') || q.includes('graduate'))
    return 'career';
  if (q.includes('require') || q.includes('join') || q.includes('qualify') || q.includes('eligible'))
    return 'requirements';

  return 'other';
}