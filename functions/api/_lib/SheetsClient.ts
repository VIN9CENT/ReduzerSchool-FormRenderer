export async function emailExists(
  spreadsheetId: string,
  token: string,
  applicantEmail: string
): Promise<boolean> {
  const range = encodeURIComponent('Sheet1!C2:C');
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    console.warn(`emailExists check failed — HTTP ${res.status}, failing open`);
    return false;
  } // fail open — don't block real applicants on a transient error
  const data = (await res.json()) as { values?: string[][] };
  const emails = (data.values ?? []).flat().map((v) => v.toLowerCase().trim());
  return emails.includes(applicantEmail.toLowerCase().trim());
}

export async function appendRow(
  spreadsheetId: string,
  token: string,
  values: string[]
): Promise<void> {
  const range = encodeURIComponent('Sheet1!A:AC');
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
