'use client';

import posthog, { type PostHogConfig } from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { Suspense, useEffect} from 'react';
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

const POSTHOG_API_KEY =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN || 'phc_y4TaBFcnzsx2WX4846wjqyKmtEsw4L6rrNFRnY5m6uAH';
const POSTHOG_API_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://psthgeu.reduzer.tech';

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
      ph.register({
        environment: getEnvironment(),
      });

   
      ph.opt_out_capturing();

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


function applyConsent() {
  const cb = window.Cookiebot;

  if (!cb) return;

  const hasConsent = cb.consent?.statistics;

  if (!posthogInitialized) {
    initPostHog();
  }

  if (hasConsent) {
    posthog.opt_in_capturing();
  } else {
    posthog.opt_out_capturing();
  }
}


export function PHProvider({ children }: { children: React.ReactNode }) {


  useEffect(() => {
    if (typeof window === 'undefined') return;

  
    initPostHog();

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
      events.forEach((event) =>
        window.removeEventListener(event, applyConsent)
      );
    };
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView ready={true} />
      </Suspense>
      {children}
    </PostHogProvider>
  );
}