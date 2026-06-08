'use client';

import posthog, { type PostHogConfig } from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const POSTHOG_API_KEY =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
  process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_API_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://psthgeu.reduzer.tech';

function getEnvironment() {
  if (typeof window === 'undefined') return 'development';
  if (window.location.hostname === 'school.reduzer.tech') return 'production';
  if (window.location.hostname.includes('pages.dev')) return 'staging';
  return 'development';
}

function initPostHog(setReady: (ready: boolean) => void) {
  const phInternal = posthog as unknown as { __loaded?: boolean };
  if (phInternal.__loaded) {
    setReady(true);
    return;
  }

  if (!POSTHOG_API_KEY) {
    console.warn(
      'Missing NEXT_PUBLIC_POSTHOG_KEY, skipping PostHog initialization.'
    );
    return;
  }

  posthog.init(POSTHOG_API_KEY, {
    api_host: POSTHOG_API_HOST,
    capture_pageview: false,
    capture_utmparams: true,
    capture_performance: true,
    autocapture: false,
    autocapture_opt_out: true,
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
    persistence: 'localStorage+cookie',
    loaded: (ph) => {
      ph.register({ environment: getEnvironment() });
      if (process.env.NODE_ENV === 'development') {
        try {
          ph.debug();
        } catch {
          /* ignore */
        }
      }
    },
  } as Partial<PostHogConfig>);

  setReady(true);
}

function PostHogPageView({ ready }: { ready: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!ready || !pathname) return;

    let url = window.origin + pathname;
    if (searchParams?.toString()) {
      url = `${url}?${searchParams.toString()}`;
    }

    posthog.capture('$pageview', {
      $current_url: url,
    });
  }, [pathname, searchParams, ready]);

  return null;
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  const [posthogReady, setPosthogReady] = useState(false);

  const initPostHogWithState = useCallback(() => {
    initPostHog(setPosthogReady);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleAccept = () => {
      const cookiebot = window.Cookiebot;
      if (cookiebot?.consent?.statistics) {
        initPostHogWithState();
      }
    };

    const handleDecline = () => {
      const posthogClient = posthog as {
        __loaded?: boolean;
        opt_out_capturing?: () => void;
      };
      if (posthogClient.__loaded) {
        posthogClient.opt_out_capturing?.();
      }
    };

    if (window.Cookiebot?.consent?.statistics) {
      initPostHogWithState();
    }

    window.addEventListener('CookiebotOnAccept', handleAccept);
    window.addEventListener('CookiebotOnDecline', handleDecline);

    const pollInterval = setInterval(() => {
      if (window.Cookiebot?.consent?.statistics) {
        initPostHogWithState();
        clearInterval(pollInterval);
      }
    }, 500);

    const pollTimeout = setTimeout(() => clearInterval(pollInterval), 10000);

    return () => {
      window.removeEventListener('CookiebotOnAccept', handleAccept);
      window.removeEventListener('CookiebotOnDecline', handleDecline);
      clearInterval(pollInterval);
      clearTimeout(pollTimeout);
    };
  }, [initPostHogWithState]);

  return (
    <PostHogProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView ready={posthogReady} />
      </Suspense>
      {children}
    </PostHogProvider>
  );
}
