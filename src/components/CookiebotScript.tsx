'use client';

import Script from 'next/script';

export default function CookiebotScript() {
  const cookiebotId = process.env.NEXT_PUBLIC_COOKIEBOT_ID;

  if (!cookiebotId) {
    console.warn('Cookiebot ID is missing');
    return null;
  }

  return (
    <Script
      id="Cookiebot"
      src="https://consent.cookiebot.com/uc.js"
      data-cbid={cookiebotId}
      data-cfasync="false"
    />
  );
}
