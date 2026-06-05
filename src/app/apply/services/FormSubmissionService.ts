import { FormData, EventEntry } from '../formTypes';

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export class FormSubmissionService {
  private static async getRecaptchaToken(): Promise<string> {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) {
      console.error('[reCAPTCHA] NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set.');
      throw new Error('Something went wrong. Please refresh and try again.');
    }

    return Promise.race([
      new Promise<string>((resolve, reject) => {
        if (!window.grecaptcha) {
          console.error(
            '[reCAPTCHA] window.grecaptcha is undefined — script not loaded.'
          );
          reject(
            new Error('reCAPTCHA has not loaded. Please refresh and try again.')
          );
          return;
        }
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(siteKey, { action: 'submit' })
            .then(resolve)
            .catch((err: unknown) => {
              console.error('[reCAPTCHA] grecaptcha.execute() rejected:', err);
              reject(
                new Error('reCAPTCHA check failed. Please refresh and try again.')
              );
            });
        });
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => {
          console.error('[reCAPTCHA] Token request timed out after 10s.');
          reject(
            new Error('reCAPTCHA timed out. Please refresh and try again.')
          );
        }, 10_000)
      ),
    ]);
  }

  static async submit(
    data: FormData,
    events: EventEntry[],
    posthogId: string
  ): Promise<{ alreadyApplied: boolean }> {
    const recaptchaToken = await this.getRecaptchaToken();

    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        eventLog: JSON.stringify([
          ...events,
          { type: 'submit_attempt', ts: new Date().toISOString() },
        ]),
        recaptchaToken,
        posthog_id: posthogId,
      }),
    });

    if (res.status === 409) return { alreadyApplied: true };

    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      console.error(`[Submit] Server rejected — HTTP ${res.status}:`, body);
      throw new Error(body.error ?? 'Something went wrong. Please try again.');
    }

    return { alreadyApplied: false };
  }
}
