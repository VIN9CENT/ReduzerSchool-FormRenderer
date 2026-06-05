const RECAPTCHA_MIN_SCORE = 0.5;
const RECAPTCHA_EXPECTED_ACTION = 'submit';

export async function verifyRecaptcha(
  token: string,
  secret: string
): Promise<{ ok: boolean; reason?: string }> {
  let res: Response;
  try {
    res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    });
  } catch {
    return { ok: false, reason: 'Network error contacting reCAPTCHA' };
  }

  if (!res.ok) {
    return { ok: false, reason: `reCAPTCHA API returned ${res.status}` };
  }

  const data = (await res.json()) as {
    success: boolean;
    score: number;
    action: string;
    'error-codes'?: string[];
  };

  if (!data.success) {
    return {
      ok: false,
      reason: `reCAPTCHA failed: ${(data['error-codes'] ?? []).join(', ')}`,
    };
  }
  if (data.action !== RECAPTCHA_EXPECTED_ACTION) {
    return { ok: false, reason: `Unexpected reCAPTCHA action: ${data.action}` };
  }
  if (data.score < RECAPTCHA_MIN_SCORE) {
    return { ok: false, reason: `Score too low: ${data.score}` };
  }

  return { ok: true };
}
