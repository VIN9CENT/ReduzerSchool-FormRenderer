import { GoogleSheetsRepository } from './GoogleSheetsRepository';

export interface SubmissionPayload {
  email: string;
  posthog_id: string;
  [key: string]: unknown;
}

export class ApplicationSubmissionService {
  private sheets: GoogleSheetsRepository;

  constructor() {
    this.sheets = new GoogleSheetsRepository();
  }

  async submit(payload: SubmissionPayload): Promise<void> {
    await this.sheets.insertRow(payload, payload.posthog_id);
  }
}
