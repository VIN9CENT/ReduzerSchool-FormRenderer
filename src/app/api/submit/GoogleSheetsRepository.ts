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
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
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

function str(value: unknown, maxLen = 5000): string {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim().slice(0, maxLen);
  return /^[=+\-@|%\t\r]/.test(trimmed) ? `'${trimmed}` : trimmed;
}

export class GoogleSheetsRepository {
  private async getCredentials() {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const key = process.env.GOOGLE_PRIVATE_KEY;
    const sheetId = process.env.GOOGLE_SPREADSHEET_ID;
    if (!email || !key || !sheetId) throw new Error('Missing Google Sheets environment variables');
    return { email, key, sheetId };
  }

  async emailExists(email: string): Promise<boolean> {
    const creds = await this.getCredentials();
    const token = await getAccessToken(creds.email, creds.key);
    const range = encodeURIComponent('Sheet1!C:C');
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${creds.sheetId}/values/${range}`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`emailExists check failed: ${res.status} ${text}`);
    }

    const json = (await res.json()) as { values?: string[][] };
    const emails = (json.values ?? []).flat().map((e) => e.toLowerCase().trim());
    return emails.includes(email.toLowerCase().trim());
  }

  async insertRow(data: Record<string, unknown>, posthogId: string): Promise<void> {
    const { email, key, sheetId } = await this.getCredentials();

    const occupation =
      data.occupation === 'Other'
        ? `Other: ${str(data.occupationOther, 200)}`
        : str(data.occupation, 200);
    const education =
      data.education === 'Other'
        ? `Other: ${str(data.educationOther, 200)}`
        : str(data.education, 200);
    const heardFrom =
      data.heardFrom === 'Other'
        ? `Other: ${str(data.heardFromOther, 200)}`
        : str(data.heardFrom, 200);

    const row = [
      new Date().toISOString(),
      str(data.fullName, 200),
      str(data.email, 200),
      str(data.phone, 50),
      str(data.city, 200),
      str(data.country, 200),
      occupation,
      education,
      str(data.hasTechExperience, 200),
      str(data.techExperienceDetails, 2000),
      str(data.hasLaptop, 10),
      str(data.learningMode, 200),
      str(data.whyReduzer, 10_000),
      str(data.biggestObstacle, 10_000),
      str(data.timeFailed, 10_000),
      str(data.ifFallBehind, 10_000),
      str(data.reqChanges, 10_000),
      str(data.workStyle, 10_000),
      heardFrom,
      str(data.additionalInfo, 10_000),
      str(data.eventLog, 50_000),
      posthogId,
    ];

    const token = await getAccessToken(email, key);

    const range = encodeURIComponent('Sheet1!A:V');
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: [row] }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Sheets API error: ${res.status} ${text}`);
    }
  }
}
