'use client';

import posthog, { type PostHogConfig } from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function PostHogPageView({ ready }: { ready: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!ready) return;
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams?.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture('$pageview', { $current_url: url });
    }
  }, [pathname, searchParams, ready]);

  return null;
}

function initPostHog(setReady: (ready: boolean) => void) {
  console.log('[PH] initPostHog called');
  const phInternal = posthog as unknown as { __loaded?: boolean };
  if (phInternal.__loaded) {
    console.log('[PH] posthog already loaded');
    setReady(true);
    return;
  }

  // Debug logging removed for security. Enable with NEXT_PUBLIC_ALLOW_POSTHOG_DEBUG=true when needed.

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://psthgeu.reduzer.tech',

    // Pageviews fired manually in PostHogPageView
    capture_pageview: false,

    // Capture UTM params on first visit
    capture_utmparams: true,

    // Performance metrics
    capture_performance: true,

    // Keep analytics limited to explicit, reviewed capture calls.
    autocapture: false,
    autocapture_opt_out: true,

    // Disable session recording in production to reduce PII exposure on the application form.
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

    // Mask all element attributes to prevent PII leaking
    mask_all_element_attributes: true,

    // Persist identity across sessions
    persistence: 'localStorage+cookie',

    loaded: (ph) => {
      // Tag every event with the environment for dashboard filtering
      const env =
        window.location.hostname === 'school.reduzer.tech'
          ? 'production'
          : window.location.hostname.includes('pages.dev')
            ? 'staging'
            : 'development';

      ph.register({ environment: env });

      if (process.env.NODE_ENV === 'development') {
        try {
          ph.debug();
        } catch {
          /* ignore */
        }
      }
      console.log('[PH] posthog loaded, env=', env);
    },
  } as Partial<PostHogConfig>);
  setReady(true);
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  const [posthogReady, setPosthogReady] = useState(false);

  const initPostHogWithState = useCallback(() => {
    initPostHog(setPosthogReady);
  }, [setPosthogReady]);
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleAccept = () => {
      const cookiebot = window.Cookiebot;

      console.log(
        '[PH] handleAccept; statistics=',
        cookiebot?.consent?.statistics
      );

      if (cookiebot?.consent?.statistics) {
        initPostHogWithState();
      }
    };

    const handleDecline = () => {
      const posthogClient = posthog as {
        __loaded?: boolean;
        opt_out_capturing?: () => void;
      };

      console.log('[PH] handleDecline; posthogLoaded=', posthogClient.__loaded);

      if (posthogClient.__loaded) {
        posthogClient.opt_out_capturing?.();
      }
    };

    // Case 1: Returning visitor — Cookiebot already has consent stored
    handleAccept();

    // Case 2: First visit — wait for Cookiebot consent event
    window.addEventListener('CookiebotOnAccept', handleAccept);
    window.addEventListener('CookiebotOnDecline', handleDecline);

    return () => {
      window.removeEventListener('CookiebotOnAccept', handleAccept);
      window.removeEventListener('CookiebotOnDecline', handleDecline);
    };
  }, [initPostHogWithState]);
  return (
    <PostHogProvider client={posthog}>
      {/* Suspense required by Next.js App Router for useSearchParams() */}
      <Suspense fallback={null}>
        <PostHogPageView ready={posthogReady} />
      </Suspense>
      {children}
    </PostHogProvider>
  );
}
