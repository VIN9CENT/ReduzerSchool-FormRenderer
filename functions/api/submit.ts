/**
 * Cloudflare Pages Function — POST /api/submit
 *
 * Required environment variables (set in Cloudflare Pages → Settings → Environment Variables):
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL  — e.g. my-sa@my-project.iam.gserviceaccount.com
 *   GOOGLE_PRIVATE_KEY            — the full PEM private key from the service account JSON
 *                                   (copy the entire "private_key" value, including -----BEGIN/END-----)
 *   GOOGLE_SPREADSHEET_ID         — the ID from the Google Sheets URL
 *                                   https://docs.google.com/spreadsheets/d/<ID>/edit
 *
 * Google Sheets setup:
 *   1. Create a Google Cloud project and enable the Google Sheets API.
 *   2. Create a Service Account, download the JSON key.
 *   3. Share your spreadsheet with the service account email (Editor access).
 *   4. Add a header row to Sheet1 matching the columns below (row 1).
 *
 * Expected columns (A→AC):
 *   A  Timestamp          B  Full Name          C  Email
 *   D  Phone              E  City               F  Country
 *   G  Occupation         H  Education          I  Has Tech Experience
 *   J  Tech Exp Details   K  Has Laptop         L  Learning Mode
 *   M  Why Reduzer        N  Biggest Obstacle   O  Time Failed
 *   P  If Fall Behind     Q  Req Changes        R  Work Style
 *   S  Heard From         T  Additional Info    U  Event Log
 *   V  Session (s)        W  S1 (s)             X  S2 (s)
 *   Y  S3 (s)             Z  S4 (s)             AA S5 (s)
 *   AB Copy Attempts      AC Validation Fails
 */

/// <reference types="@cloudflare/workers-types" />

import { checkRateLimit, RATE_LIMIT } from './_lib/RateLimiter';
import { verifyRecaptcha } from './_lib/RecaptchaVerifier';
import { getAccessToken } from './_lib/GoogleAuthService';
import { str, serverValidate } from './_lib/ServerValidator';
import { formatEventLog, analyzeEvents } from './_lib/EventLogProcessor';
import { buildRow } from './_lib/RowBuilder';
import { emailExists, appendRow } from './_lib/SheetsClient';

interface Env {
  GOOGLE_SERVICE_ACCOUNT_EMAIL: string;
  GOOGLE_PRIVATE_KEY: string;
  GOOGLE_SPREADSHEET_ID: string;
  RECAPTCHA_SECRET_KEY: string;
  RATE_LIMIT_KV: KVNamespace;
}

function json(
  body: unknown,
  status = 200,
  extraHeaders: Record<string, string> = {}
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  });
}

type PagesFunction<E> = (ctx: {
  request: Request;
  env: E;
}) => Response | Promise<Response>;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // 1. Content-length guard
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength) > 150_000) {
    return json({ error: 'Request too large' }, 413);
  }

  // 2. Rate limiting
  const ip = request.headers.get('CF-Connecting-IP') ?? '';
  if (!ip) {
    console.warn('Missing CF-Connecting-IP header — rate limiting skipped');
  } else if (!env.RATE_LIMIT_KV) {
    console.warn('RATE_LIMIT_KV binding is missing — rate limiting is disabled');
  } else {
    const { allowed } = await checkRateLimit(env.RATE_LIMIT_KV, ip);
    if (!allowed) {
      return json(
        { error: 'Too many submissions from your network. Please try again in 10 minutes.' },
        429,
        {
          'Retry-After': String(RATE_LIMIT.windowSeconds),
          'X-RateLimit-Limit': String(RATE_LIMIT.maxRequests),
          'X-RateLimit-Remaining': '0',
        }
      );
    }
  }

  // 3. JSON parse
  let raw: Record<string, unknown>;
  try {
    raw = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: 'Something went wrong. Please try again.' }, 400);
  }

  // 4. reCAPTCHA v3
  if (!env.RECAPTCHA_SECRET_KEY) {
    console.error('RECAPTCHA_SECRET_KEY is missing');
    return json({ error: '[DEBUG] RECAPTCHA_SECRET_KEY env var is not set on the server.' }, 500);
  }
  const recaptchaToken =
    typeof raw.recaptchaToken === 'string' ? raw.recaptchaToken.trim() : '';
  if (!recaptchaToken) {
    return json({ error: 'Missing CAPTCHA token. Please refresh and try again.' }, 400);
  }
  const captcha = await verifyRecaptcha(recaptchaToken, env.RECAPTCHA_SECRET_KEY);
  if (!captcha.ok) {
    console.warn(`reCAPTCHA rejected for IP ${ip}: ${captcha.reason}`);
    return json({ error: 'CAPTCHA verification failed. Please refresh and try again.' }, 403);
  }

  // 5. Field validation
  const validationError = serverValidate(raw);
  if (validationError) {
    console.warn(`Validation failed for IP ${ip}: ${validationError}`);
    return json({ error: 'Please check all required fields and try again.' }, 422);
  }

  // 6. Environment variable check
  const {
    GOOGLE_SERVICE_ACCOUNT_EMAIL: gEmail,
    GOOGLE_PRIVATE_KEY: gKey,
    GOOGLE_SPREADSHEET_ID: sheetId,
  } = env;
  if (!gEmail || !gKey || !sheetId) {
    const missing = [
      !gEmail && 'GOOGLE_SERVICE_ACCOUNT_EMAIL',
      !gKey && 'GOOGLE_PRIVATE_KEY',
      !sheetId && 'GOOGLE_SPREADSHEET_ID',
    ]
      .filter(Boolean)
      .join(', ');
    console.error('Submit error: missing Google environment variables:', missing);
    return json({ error: 'Something went wrong on our end. Please try again later.' }, 500);
  }

  // 7. Build row
  const rawEventLog = str(raw.eventLog, 50_000);
  const row = buildRow(raw, formatEventLog(rawEventLog), analyzeEvents(rawEventLog));

  // 8. Write to Sheets
  try {
    const token = await getAccessToken(gEmail, gKey);

    if (await emailExists(sheetId, token, str(raw.email, 200))) {
      return json(
        { error: 'An application with this email address has already been submitted. If you believe this is an error, please contact us.' },
        409
      );
    }

    await appendRow(sheetId, token, row);
    return json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Submit error:', message);
    return json({ error: 'Failed to save application. Please try again.' }, 500);
  }
};
