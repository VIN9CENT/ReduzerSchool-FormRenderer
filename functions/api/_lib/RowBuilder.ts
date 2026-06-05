import { str } from './ServerValidator';
import type { EventMetrics } from './EventLogProcessor';

export function buildRow(
  raw: Record<string, unknown>,
  formattedLog: string,
  metrics: EventMetrics
): string[] {
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

  return [
    new Date().toISOString(),           // A  Timestamp
    str(raw.fullName, 200),             // B  Full Name
    str(raw.email, 200),                // C  Email
    str(raw.phone, 50),                 // D  Phone
    str(raw.city, 200),                 // E  City
    str(raw.country, 200),              // F  Country
    occupation,                         // G  Occupation
    education,                          // H  Education
    str(raw.hasTechExperience, 200),    // I  Has Tech Experience
    str(raw.techExperienceDetails, 2000), // J Tech Exp Details
    str(raw.hasLaptop, 10),             // K  Has Laptop
    str(raw.learningMode, 200),         // L  Learning Mode
    str(raw.whyReduzer, 10_000),        // M  Why Reduzer
    str(raw.biggestObstacle, 10_000),   // N  Biggest Obstacle
    str(raw.timeFailed, 10_000),        // O  Time Failed
    str(raw.ifFallBehind, 10_000),      // P  If Fall Behind
    str(raw.reqChanges, 10_000),        // Q  Req Changes
    str(raw.workStyle, 10_000),         // R  Work Style
    heardFrom,                          // S  Heard From
    str(raw.additionalInfo, 10_000),    // T  Additional Info
    formattedLog,                       // U  Event Log
    String(metrics.sessionSeconds),     // V  Session (s)
    String(metrics.stepSeconds[0]),     // W  S1 (s)
    String(metrics.stepSeconds[1]),     // X  S2 (s)
    String(metrics.stepSeconds[2]),     // Y  S3 (s)
    String(metrics.stepSeconds[3]),     // Z  S4 (s)
    String(metrics.stepSeconds[4]),     // AA S5 (s)
    String(metrics.copyAttempts),       // AB Copy Attempts
    String(metrics.validationFailures), // AC Validation Fails
  ];
}
