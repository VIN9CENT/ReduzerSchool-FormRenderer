'use client';
import Script from 'next/script';
import posthog from 'posthog-js';
import { useEffect } from 'react';

export default function CookiebotScript() {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      opt_out_capturing_by_default: true,
    });
    const handleAccept = () => {
      posthog.opt_in_capturing();
      posthog.capture('cookie_consent_accepted');
    };

    const handleDecline = () => {
      posthog.opt_out_capturing();
      posthog.capture('cookie_consent_declined');
    };
    window.addEventListener('CookiebotOnAccept', handleAccept);
    window.addEventListener('CookiebotOnDecline', handleDecline);

    return () => {
      window.removeEventListener('CookiebotOnAccept', handleAccept);
      window.removeEventListener('CookiebotOnDecline', handleDecline);
    };
  }, []);

  return (
    <Script
      id="Cookiebot"
      src="https://consent.cookiebot.com/uc.js"
      data-cbid="1d803704-ef37-4292-92d7-3280f6bffa19"
      data-blockingmode="auto"
      data-cfasync="false"
    />
  );
}
