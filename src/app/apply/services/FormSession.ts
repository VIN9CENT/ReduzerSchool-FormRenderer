import { FormData, EventEntry, SESSION_KEY, INITIAL_FORM_DATA } from '../formTypes';

interface SessionState {
  step: number;
  data: FormData;
  events: EventEntry[];
}

export class FormSession {
  static save(step: number, data: FormData, events: EventEntry[]): void {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ step, data, events }));
    } catch {
      // sessionStorage may be unavailable in some environments
    }
  }

  static load(): SessionState | null {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as SessionState;
    } catch {
      return null;
    }
  }

  static clear(): void {
    sessionStorage.removeItem(SESSION_KEY);
  }
}
