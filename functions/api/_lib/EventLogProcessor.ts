export interface EventMetrics {
  sessionSeconds: number;
  stepSeconds: [number, number, number, number, number];
  copyAttempts: number;
  validationFailures: number;
}

export function formatEventLog(raw: string): string {
  try {
    type Ev = { type: string; ts: string; step?: number; field?: string };
    const evs: Ev[] = JSON.parse(raw);
    if (!Array.isArray(evs) || evs.length === 0) return '';

    const ms = (ts: string) => new Date(ts).getTime();
    const dur = (delta: number) => {
      const s = Math.round(delta / 1000);
      if (s < 60) return `${s}s`;
      const m = Math.floor(s / 60);
      const rem = s % 60;
      return rem ? `${m}m${rem}s` : `${m}m`;
    };

    const parts: string[] = [];
    let prevTs: number | null = null;
    let startTs: number | null = null;

    for (const e of evs) {
      const now = ms(e.ts);
      if (startTs === null) startTs = now;

      switch (e.type) {
        case 'form_open':
          prevTs = now;
          break;
        case 'step_next':
          if (prevTs !== null) parts.push(`S${e.step}:${dur(now - prevTs)}`);
          prevTs = now;
          break;
        case 'step_back':
          parts.push(`←S${e.step}`);
          prevTs = now;
          break;
        case 'validation_failed':
          parts.push(`!S${e.step}`);
          break;
        case 'copy_blocked':
        case 'cut_blocked':
        case 'paste_blocked':
          parts.push('copy');
          break;
        case 'submit_attempt':
          if (prevTs !== null) parts.push(`S5:${dur(now - prevTs)}`);
          if (startTs !== null) parts.push(`total:${dur(now - startTs)}`);
          break;
      }
    }
    return parts.join(' | ');
  } catch {
    return raw;
  }
}

export function analyzeEvents(raw: string): EventMetrics {
  const zero: EventMetrics = {
    sessionSeconds: 0,
    stepSeconds: [0, 0, 0, 0, 0],
    copyAttempts: 0,
    validationFailures: 0,
  };
  try {
    type Ev = { type: string; ts: string; step?: number };
    const evs: Ev[] = JSON.parse(raw);
    if (!Array.isArray(evs)) return zero;

    const toMs = (ts: string) => new Date(ts).getTime();
    let startTs: number | null = null;
    let submitTs: number | null = null;
    const exitTs: Partial<Record<number, number>> = {};
    let copyAttempts = 0;
    let validationFailures = 0;

    for (const e of evs) {
      const now = toMs(e.ts);
      switch (e.type) {
        case 'form_open':
          if (startTs === null) startTs = now;
          break;
        case 'step_next':
          if (startTs === null) startTs = now;
          if (typeof e.step === 'number') exitTs[e.step] = now;
          break;
        case 'submit_attempt':
          submitTs = now;
          break;
        case 'copy_blocked':
        case 'cut_blocked':
        case 'paste_blocked':
          copyAttempts++;
          break;
        case 'validation_failed':
          validationFailures++;
          break;
      }
    }

    const x = exitTs;
    const stepSeconds: [number, number, number, number, number] = [
      startTs && x[1] ? Math.round((x[1] - startTs) / 1000) : 0,
      x[1] && x[2] ? Math.round((x[2] - x[1]) / 1000) : 0,
      x[2] && x[3] ? Math.round((x[3] - x[2]) / 1000) : 0,
      x[3] && x[4] ? Math.round((x[4] - x[3]) / 1000) : 0,
      x[4] && submitTs ? Math.round((submitTs - x[4]) / 1000) : 0,
    ];

    return {
      sessionSeconds:
        startTs && submitTs ? Math.round((submitTs - startTs) / 1000) : 0,
      stepSeconds,
      copyAttempts,
      validationFailures,
    };
  } catch {
    return zero;
  }
}
