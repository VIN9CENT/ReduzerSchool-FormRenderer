import Script from 'next/script';

export default function CookiebotScript() {
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
