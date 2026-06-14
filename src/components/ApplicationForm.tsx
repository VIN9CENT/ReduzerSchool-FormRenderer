'use client';
import posthog from 'posthog-js';

import { useRef, useEffect } from 'react';
import { useFormState } from '@/app/apply/hooks/useFormState';
import { AlreadyAppliedScreen } from '@/app/apply/components/screens/AlreadyAppliedScreen';
import { SuccessScreen } from '@/app/apply/components/screens/SuccessScreen';

export default function ApplicationForm() {
  const { submitted, setSubmitted, alreadyApplied, logEvent } = useFormState();

  const formRef = useRef<HTMLDivElement>(null);
  // Track funnel entry once on mount
  useEffect(() => {
    posthog.capture('funnel_started');
  }, []);

  // Track funnel entry once on mount
  useEffect(() => {
    posthog.capture('funnel_started');
  }, []);

  // Listen for Tally form submission via postMessage
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Verify the message is from Tally
      if (event.origin !== 'https://tally.so') return;

      if (event.data?.type === 'submission') {
        logEvent('submit_success');
        localStorage.setItem('reduzer_school_applied', 'true');
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [logEvent, setSubmitted]);

  if (alreadyApplied) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <AlreadyAppliedScreen />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <SuccessScreen />
      </div>
    );
  }

  return (
    <div
      ref={formRef}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
    >
      <iframe
        src="https://tally.so/embed/dWR6OA?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        width="100%"
        height="900px"
        style={{
          border: 'none',
          borderRadius: '0.875rem',
          minHeight: '900px',
        }}
        title="Reduzer School Application Form"
        onLoad={() => {
          logEvent('form_loaded');
        }}
      />
    </div>
  );
}
