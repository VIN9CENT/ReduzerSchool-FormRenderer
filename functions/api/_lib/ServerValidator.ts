export const ALLOWED = {
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
    'Yes, I can attend in person for the full year',
    'I need to confirm logistics before enrolment',
    'No, I cannot commit to full-time in-person study',
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

export function str(value: unknown, maxLen = 5000): string {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim().slice(0, maxLen);
  return /^[=+\-@|%\t\r]/.test(trimmed) ? `'${trimmed}` : trimmed;
}

function isAllowed(value: unknown, list: readonly string[]): value is string {
  return typeof value === 'string' && (list as string[]).includes(value);
}

export function serverValidate(b: Record<string, unknown>): string | null {
  if (!str(b.fullName, 200)) return 'fullName is required';

  const email = str(b.email, 200);
  if (!email) return 'email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'invalid email format';

  const phone = str(b.phone, 50);
  if (!phone) return 'phone is required';
  {
    const stripped = phone.replace(/[\s\-().]/g, '');
    if (
      !/^(\+?254|0)\d{9}$/.test(stripped) &&
      !/^\+[1-9]\d{6,14}$/.test(stripped)
    )
      return 'invalid phone number format';
  }
  if (!str(b.city, 200)) return 'city is required';
  if (!str(b.country, 200)) return 'country is required';

  if (!isAllowed(b.occupation, ALLOWED.occupation)) return 'invalid occupation value';
  if (b.occupation === 'Other' && !str(b.occupationOther, 200))
    return 'occupationOther is required';

  if (!isAllowed(b.education, ALLOWED.education)) return 'invalid education value';
  if (b.education === 'Other' && !str(b.educationOther, 200))
    return 'educationOther is required';

  if (!isAllowed(b.hasTechExperience, ALLOWED.hasTechExperience))
    return 'invalid hasTechExperience value';
  if (
    b.hasTechExperience === 'Yes, I have some experience' &&
    !str(b.techExperienceDetails, 2000)
  )
    return 'techExperienceDetails is required';

  if (!isAllowed(b.hasLaptop, ALLOWED.hasLaptop)) return 'invalid hasLaptop value';
  if (!isAllowed(b.learningMode, ALLOWED.learningMode)) return 'invalid learningMode value';

  if (!str(b.whyReduzer)) return 'whyReduzer is required';
  if (!str(b.biggestObstacle)) return 'biggestObstacle is required';
  if (!str(b.timeFailed)) return 'timeFailed is required';
  if (!str(b.ifFallBehind)) return 'ifFallBehind is required';
  if (!str(b.reqChanges)) return 'reqChanges is required';
  if (!str(b.workStyle)) return 'workStyle is required';

  if (!isAllowed(b.heardFrom, ALLOWED.heardFrom)) return 'invalid heardFrom value';
  if (b.heardFrom === 'Other' && !str(b.heardFromOther, 200))
    return 'heardFromOther is required';

  return null;
}
