interface SheetRow {
  timestamp: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  posthog_id: string;
  occupation: string;
  education_level: string;
  has_laptop: string;
  learning_mode: string;
  city: string;
  referral_source: string;
}

export class GoogleSheetsRepository {
  private readonly webhookUrl: string;

  constructor() {
    const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (!url) throw new Error('GOOGLE_SHEETS_WEBHOOK_URL is not set');
    this.webhookUrl = url;
  }

  async insertRow(data: Record<string, unknown>, posthogId: string): Promise<void> {
    const row: SheetRow = {
      timestamp: new Date().toISOString(),
      first_name: String(data.firstName ?? ''),
      last_name: String(data.lastName ?? ''),
      email: String(data.email ?? ''),
      phone: String(data.phone ?? ''),
      posthog_id: posthogId,
      occupation: String(data.occupation ?? ''),
      education_level: String(data.educationLevel ?? ''),
      has_laptop: String(data.hasLaptop ?? ''),
      learning_mode: String(data.learningMode ?? ''),
      city: String(data.city ?? ''),
      referral_source: String(data.referralSource ?? data.heardFrom ?? ''),
    };

    const response = await fetch(this.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(row),
    });

    if (!response.ok) {
      throw new Error(`Google Sheets error: ${response.status}`);
    }
  }
}
