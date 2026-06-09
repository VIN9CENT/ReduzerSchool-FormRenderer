'use client';

import posthog, { type PostHogConfig } from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { Suspense, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function PostHogPageView({ ready }: { ready: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!ready || !pathname) return;
    const url =
      window.location.origin +
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    posthog.capture('$pageview', { $current_url: url });
  }, [pathname, searchParams, ready]);

  return null;
}

function getEnvironment() {
  if (typeof window === 'undefined') return 'server';
  if (window.location.hostname === 'school.reduzer.tech') return 'production';
  if (window.location.hostname.includes('pages.dev')) return 'staging';
  return 'development';
}

let posthogInitialized = false;

function initPostHog() {
  if (typeof window === 'undefined') return;
  if (posthogInitialized) return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
    console.warn('[PostHog] Missing API key');
    return;
  }

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN, {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://psthgeu.reduzer.tech',
    defaults: '2026-01-30',
    capture_pageview: false,
    capture_utmparams: true,
    capture_performance: true,
    autocapture: {
      element_allowlist: ['a', 'button'],
      css_selector_denylist: ['[data-cta-location]', 'nav a'],
    },
    persistence: 'localStorage+cookie',
    disable_session_recording: process.env.NODE_ENV === 'production',
    session_recording: {
      maskAllInputs: true,
      maskInputOptions: {
        password: true,
        email: true,
        text: true,
        textarea: true,
      },
    },
    mask_all_element_attributes: true,
    loaded: (ph) => {
      ph.register({ environment: getEnvironment() });
      ph.opt_out_capturing();
      if (process.env.NODE_ENV === 'development') {
        ph.debug();
        console.info('[PostHog] initialized:', ph.get_distinct_id(), getEnvironment());
      }
      console.log('[PH] posthog loaded, env=', getEnvironment());
    },
  } as Partial<PostHogConfig>);

  posthogInitialized = true;
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  const [posthogReady, setPosthogReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    initPostHog();

    function applyConsent() {
      const cb = window.Cookiebot;
      if (!posthogInitialized) initPostHog();
      if (cb?.consent?.statistics) {
        posthog.opt_in_capturing();
        setPosthogReady(true);
      } else {
        posthog.opt_out_capturing();
        setPosthogReady(false);
      }
    }

    applyConsent();

    const events = [
      'CookiebotOnAccept',
      'CookiebotOnDecline',
      'CookiebotOnLoad',
      'CookiebotOnChange',
    ];

    let attempts = 0;
    const poll = setInterval(() => {
      attempts++;
      if (window.Cookiebot?.consent !== undefined) {
        applyConsent();
        clearInterval(poll);
      }
      if (attempts >= 20) clearInterval(poll);
    }, 500);

    events.forEach((event) => window.addEventListener(event, applyConsent));

    return () => {
      clearInterval(poll);
      events.forEach((event) => window.removeEventListener(event, applyConsent));
    };
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView ready={posthogReady} />
      </Suspense>
      {children}
    </PostHogProvider>
  );
}
