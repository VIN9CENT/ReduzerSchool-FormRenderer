import { GoogleSheetsRepository } from './GoogleSheetsRepository';
import { serverValidate } from './validators';

export interface SubmissionPayload {
  email: string;
  posthog_id: string;
  recaptchaToken?: string;
  [key: string]: unknown;
}

export class ApplicationSubmissionService {
  private sheets = new GoogleSheetsRepository();

  async submit(payload: SubmissionPayload): Promise<{ alreadyApplied: boolean }> {
    if (payload.recaptchaToken) {
      await this.verifyRecaptcha(payload.recaptchaToken);
    }

    const validationError = serverValidate(payload as Record<string, unknown>);
    if (validationError) {
      throw new Error(`Validation failed: ${validationError}`);
    }

    const exists = await this.sheets.emailExists(payload.email);
    if (exists) return { alreadyApplied: true };

    await this.sheets.insertRow(payload, payload.posthog_id);
    return { alreadyApplied: false };
  }

  private async verifyRecaptcha(token: string): Promise<void> {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) return;

    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    });

    const data = (await res.json()) as { success: boolean; score?: number };
    if (!data.success || (data.score !== undefined && data.score < 0.5)) {
      throw new Error('reCAPTCHA verification failed');
    }
  }
}
