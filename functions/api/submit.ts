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
 * Expected columns (A→T):
 *   Timestamp | Full Name | Email | Phone | City | Country |
 *   Occupation | Education | Has Tech Experience | Tech Experience Details |
 *   Has Laptop | Learning Mode | Why Reduzer | Biggest Obstacle |
 *   Time Failed | If Fall Behind | Req Changes | Work Style |
 *   How Heard | Additional Info
 */

interface Env {
  GOOGLE_SERVICE_ACCOUNT_EMAIL: string;
  GOOGLE_PRIVATE_KEY: string;
  GOOGLE_SPREADSHEET_ID: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  occupation: string;
  occupationOther: string;
  education: string;
  educationOther: string;
  hasTechExperience: string;
  techExperienceDetails: string;
  hasLaptop: string;
  learningMode: string;
  whyReduzer: string;
  biggestObstacle: string;
  timeFailed: string;
  ifFallBehind: string;
  reqChanges: string;
  workStyle: string;
  heardFrom: string;
  heardFromOther: string;
  additionalInfo: string;
  eventLog?: string;
}

// ─── JWT / OAuth helpers ──────────────────────────────────────────────────────

function toBase64url(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function strToBase64url(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

async function getAccessToken(email: string, pemKey: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  const header = strToBase64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = strToBase64url(
    JSON.stringify({
      iss: email,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    })
  );

  const signingInput = `${header}.${payload}`;

  // Strip PEM headers and normalise newlines
  const der = Uint8Array.from(
    atob(
      pemKey
        .replace(/-----BEGIN PRIVATE KEY-----/g, '')
        .replace(/-----END PRIVATE KEY-----/g, '')
        .replace(/\\n/g, '')
        .replace(/\s/g, '')
    ),
    (c) => c.charCodeAt(0)
  );

  const key = await crypto.subtle.importKey(
    'pkcs8',
    der,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const sig = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    new TextEncoder().encode(signingInput)
  );

  const jwt = `${signingInput}.${toBase64url(sig)}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!tokenRes.ok) {
    const text = await tokenRes.text();
    throw new Error(`Token exchange failed: ${text}`);
  }

  const json = (await tokenRes.json()) as { access_token: string };
  return json.access_token;
}

// ─── Validation & sanitization ───────────────────────────────────────────────

const ALLOWED = {
  occupation: [
    'Student',
    'Employed full time',
    'Employed part time',
    'Self employed',
    'Unemployed',
    'Other',
  ],
  education: [
    'High school / KCSE',
    'Diploma',
    "Bachelor's degree",
    "Master's degree or higher",
    'Other',
  ],
  hasTechExperience: [
    'Yes, I have some experience',
    'No, I am completely new to tech',
  ],
  hasLaptop: ['Yes', 'No'],
  learningMode: [
    'Online (fully remote learning)',
    'Physical (on-site learning in Kisii)',
    'Hybrid (mostly online with an on-site session during the final week)',
    'I need more information before deciding',
  ],
  heardFrom: [
    'Instagram',
    'Twitter / X',
    'WhatsApp',
    'From a friend or colleague',
    'Google search',
    'Other',
  ],
} as const;

// Coerce to string, trim, enforce max length, and neutralise formula injection.
function str(value: unknown, maxLen = 5000): string {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim().slice(0, maxLen);
  // Prefix cells that start with a spreadsheet formula character.
  return /^[=+\-@|%\t\r]/.test(trimmed) ? `'${trimmed}` : trimmed;
}

function isAllowed(value: unknown, list: readonly string[]): value is string {
  return typeof value === 'string' && (list as string[]).includes(value);
}

function serverValidate(b: Record<string, unknown>): string | null {
  if (!str(b.fullName, 200)) return 'fullName is required';

  const email = str(b.email, 200);
  if (!email) return 'email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'invalid email format';

  if (!str(b.phone, 50)) return 'phone is required';
  if (!str(b.city, 200)) return 'city is required';
  if (!str(b.country, 200)) return 'country is required';

  if (!isAllowed(b.occupation, ALLOWED.occupation))
    return 'invalid occupation value';
  if (b.occupation === 'Other' && !str(b.occupationOther, 200))
    return 'occupationOther is required';

  if (!isAllowed(b.education, ALLOWED.education))
    return 'invalid education value';
  if (b.education === 'Other' && !str(b.educationOther, 200))
    return 'educationOther is required';

  if (!isAllowed(b.hasTechExperience, ALLOWED.hasTechExperience))
    return 'invalid hasTechExperience value';
  if (
    b.hasTechExperience === 'Yes, I have some experience' &&
    !str(b.techExperienceDetails, 2000)
  )
    return 'techExperienceDetails is required';

  if (!isAllowed(b.hasLaptop, ALLOWED.hasLaptop))
    return 'invalid hasLaptop value';
  if (!isAllowed(b.learningMode, ALLOWED.learningMode))
    return 'invalid learningMode value';

  if (!str(b.whyReduzer)) return 'whyReduzer is required';
  if (!str(b.biggestObstacle)) return 'biggestObstacle is required';
  if (!str(b.timeFailed)) return 'timeFailed is required';
  if (!str(b.ifFallBehind)) return 'ifFallBehind is required';
  if (!str(b.reqChanges)) return 'reqChanges is required';
  if (!str(b.workStyle)) return 'workStyle is required';

  if (!isAllowed(b.heardFrom, ALLOWED.heardFrom))
    return 'invalid heardFrom value';
  if (b.heardFrom === 'Other' && !str(b.heardFromOther, 200))
    return 'heardFromOther is required';

  return null;
}

// ─── Sheets helper ────────────────────────────────────────────────────────────

async function appendRow(
  spreadsheetId: string,
  token: string,
  values: string[]
): Promise<void> {
  const range = encodeURIComponent('Sheet1!A:U');
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values: [values] }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sheets API error: ${text}`);
  }
}

// ─── Handler ──────────────────────────────────────────────────────────────────

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

type PagesFunction<E> = (ctx: {
  request: Request;
  env: E;
}) => Response | Promise<Response>;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength) > 150_000) {
    return json({ error: 'Request too large' }, 413);
  }

  let raw: Record<string, unknown>;
  try {
    raw = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const validationError = serverValidate(raw);
  if (validationError) {
    return json({ error: `Validation failed: ${validationError}` }, 422);
  }

  const {
    GOOGLE_SERVICE_ACCOUNT_EMAIL: email,
    GOOGLE_PRIVATE_KEY: key,
    GOOGLE_SPREADSHEET_ID: sheetId,
  } = env;

  // Debug version
  console.log('Email exists:', !!email);
  console.log('Key exists:', !!key);
  console.log('SheetId exists:', !!sheetId);

  if (!email || !key || !sheetId) {
    const missing = [];
    if (!email) missing.push('GOOGLE_SERVICE_ACCOUNT_EMAIL');
    if (!key) missing.push('GOOGLE_PRIVATE_KEY');
    if (!sheetId) missing.push('GOOGLE_SPREADSHEET_ID');

    const details = `Missing: ${missing.join(', ')}`;
    console.error(details);

    return json(
      {
        error: `Server misconfiguration: ${details}`,
      },
      500
    );
  }

  // if (!email || !key || !sheetId) {
  //   return json({ error: 'Server misconfiguration: missing environment variables' }, 500);
  // }

  const occupation =
    raw.occupation === 'Other'
      ? `Other: ${str(raw.occupationOther, 200)}`
      : str(raw.occupation, 200);
  const education =
    raw.education === 'Other'
      ? `Other: ${str(raw.educationOther, 200)}`
      : str(raw.education, 200);
  const heardFrom =
    raw.heardFrom === 'Other'
      ? `Other: ${str(raw.heardFromOther, 200)}`
      : str(raw.heardFrom, 200);

  const row = [
    new Date().toISOString(),
    str(raw.fullName, 200),
    str(raw.email, 200),
    str(raw.phone, 50),
    str(raw.city, 200),
    str(raw.country, 200),
    occupation,
    education,
    str(raw.hasTechExperience, 200),
    str(raw.techExperienceDetails, 2000),
    str(raw.hasLaptop, 10),
    str(raw.learningMode, 200),
    str(raw.whyReduzer, 10_000),
    str(raw.biggestObstacle, 10_000),
    str(raw.timeFailed, 10_000),
    str(raw.ifFallBehind, 10_000),
    str(raw.reqChanges, 10_000),
    str(raw.workStyle, 10_000),
    heardFrom,
    str(raw.additionalInfo, 10_000),
    str(raw.eventLog, 50_000),
  ];

  try {
    const token = await getAccessToken(email, key);
    await appendRow(sheetId, token, row);
    return json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Submit error:', message);
    return json(
      { error: 'Failed to save application. Please try again.' },
      500
    );
  }
};
