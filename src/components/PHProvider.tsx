'use client';

import posthog, { type PostHogConfig } from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// ─── Page View Tracker ────────────────────────────────────────────────────────

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

// ─── Config ───────────────────────────────────────────────────────────────────

const POSTHOG_API_KEY =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
  'phc_y4TaBFcnzsx2WX4846wjqyKmtEsw4L6rrNFRnY5m6uAH';

const POSTHOG_API_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://psthgeu.reduzer.tech';

// ─── Environment Detection ────────────────────────────────────────────────────

function getEnvironment() {
  if (typeof window === 'undefined') return 'server';
  if (window.location.hostname === 'school.reduzer.tech') return 'production';
  if (window.location.hostname.includes('pages.dev')) return 'staging';
  return 'development';
}

// ─── PostHog Init ─────────────────────────────────────────────────────────────

let posthogInitialized = false;

function initPostHog() {
  if (typeof window === 'undefined') return;
  if (posthogInitialized) return;

  if (!POSTHOG_API_KEY) {
    console.warn('[PostHog] Missing API key');
    return;
  }

  posthog.init(POSTHOG_API_KEY, {
    api_host: POSTHOG_API_HOST,

    capture_pageview: false,
    capture_utmparams: true,
    capture_performance: true,

    autocapture: {
      element_allowlist: ['a', 'button'],
      css_selector_denylist: ['[data-cta-location]', 'nav a'],
    },

    persistence: 'localStorage+cookie',

    // Session recording: disabled in production, masked everywhere
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
      // Register environment super-property
      ph.register({
        environment: getEnvironment(),
      });

      // DO NOT call opt_out_capturing() here.
      // applyConsent() is the sole controller of opt-in/opt-out state.
      // Calling opt_out here would race against applyConsent() and win,
      // leaving PostHog permanently opted out even when consent is given.

      if (process.env.NODE_ENV === 'development') {
        ph.debug();
        console.info(
          '[PostHog] initialized:',
          ph.get_distinct_id(),
          getEnvironment()
        );
      }
    },
  } as Partial<PostHogConfig>);

  posthogInitialized = true;
}

// ─── Consent Handler ──────────────────────────────────────────────────────────

function applyConsent() {
  const cb = window.Cookiebot;

  // Cookiebot not loaded yet — polling will retry
  if (!cb || cb.consent === undefined) return;

  // Initialize PostHog if not already done
  if (!posthogInitialized) {
    initPostHog();
  }

  const hasConsent = cb.consent?.statistics;

  // Delay slightly to ensure posthog.init()'s `loaded` callback has
  // fired before we set opt-in/opt-out state. Without this, opt_out
  // inside `loaded` would overwrite the opt_in we set here.
  setTimeout(() => {
    if (hasConsent) {
      posthog.opt_in_capturing();
      if (process.env.NODE_ENV === 'development') {
        console.info('[PostHog] opted IN (statistics consent granted)');
      }
    } else {
      posthog.opt_out_capturing();
      if (process.env.NODE_ENV === 'development') {
        console.info('[PostHog] opted OUT (statistics consent not granted)');
      }
    }
  }, 150);
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize PostHog immediately
    initPostHog();

    // Apply consent state based on current Cookiebot status
    applyConsent();

    // Poll until Cookiebot is ready (handles slow-loading consent banner)
    let attempts = 0;
    const poll = setInterval(() => {
      attempts++;
      if (window.Cookiebot?.consent !== undefined) {
        applyConsent();
        clearInterval(poll);
      }
      if (attempts >= 20) clearInterval(poll); // give up after ~10s
    }, 500);

    // Re-apply consent on any Cookiebot consent change event
    const events = [
      'CookiebotOnAccept',
      'CookiebotOnDecline',
      'CookiebotOnLoad',
      'CookiebotOnChange',
    ];
    events.forEach((event) => window.addEventListener(event, applyConsent));

    // Cleanup — clear both the interval and event listeners
    return () => {
      clearInterval(poll);
      events.forEach((event) =>
        window.removeEventListener(event, applyConsent)
      );
    };
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView ready={posthogInitialized} />
      </Suspense>
      {children}
    </PostHogProvider>
  );
}