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
    if (!siteKey || !window.grecaptcha) return '';

    try {
      return await Promise.race([
        new Promise<string>((resolve, reject) => {
          window.grecaptcha.ready(() => {
            window.grecaptcha
              .execute(siteKey, { action: 'submit' })
              .then(resolve)
              .catch(reject);
          });
        }),
        new Promise<string>((_, reject) =>
          setTimeout(() => reject(new Error('timeout')), 10_000)
        ),
      ]);
    } catch (err) {
      console.error('[reCAPTCHA] token request failed:', err);
      return '';
    }
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
