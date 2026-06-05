import {
  EMAIL_RE,
  PHONE_STRIP_RE,
  PHONE_KE_RE,
  PHONE_INTL_RE,
} from '@/app/apply/validation/patterns';

export const ALLOWED = {
  occupation: ['Student', 'Employed full time', 'Employed part time', 'Self employed', 'Unemployed', 'Other'],
  education: ['High school / KCSE', 'Diploma', "Bachelor's degree", "Master's degree or higher", 'Other'],
  hasTechExperience: ['Yes, I have some experience', 'No, I am completely new to tech'],
  hasLaptop: ['Yes', 'No'],
  learningMode: [
    'Online (fully remote learning)',
    'Physical (on-site learning in Kisii)',
    'Hybrid (mostly online with an on-site session during the final week)',
    'I need more information before deciding',
  ],
  heardFrom: ['Instagram', 'Twitter / X', 'WhatsApp', 'From a friend or colleague', 'Google search', 'Other'],
} as const;

export function trim(value: unknown, max = 5000): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

function isAllowed(value: unknown, list: readonly string[]): boolean {
  return typeof value === 'string' && (list as string[]).includes(value);
}

export function serverValidate(b: Record<string, unknown>): string | null {
  if (!trim(b.fullName, 200)) return 'fullName is required';

  const email = trim(b.email, 200);
  if (!email) return 'email is required';
  if (!EMAIL_RE.test(email)) return 'invalid email format';

  const phone = trim(b.phone, 50);
  if (!phone) return 'phone is required';
  const stripped = phone.replace(PHONE_STRIP_RE, '');
  if (!PHONE_KE_RE.test(stripped) && !PHONE_INTL_RE.test(stripped))
    return 'invalid phone number format';

  if (!trim(b.city, 200)) return 'city is required';
  if (!trim(b.country, 200)) return 'country is required';

  if (!isAllowed(b.occupation, ALLOWED.occupation)) return 'invalid occupation value';
  if (b.occupation === 'Other' && !trim(b.occupationOther, 200)) return 'occupationOther is required';

  if (!isAllowed(b.education, ALLOWED.education)) return 'invalid education value';
  if (b.education === 'Other' && !trim(b.educationOther, 200)) return 'educationOther is required';

  if (!isAllowed(b.hasTechExperience, ALLOWED.hasTechExperience)) return 'invalid hasTechExperience value';
  if (b.hasTechExperience === 'Yes, I have some experience' && !trim(b.techExperienceDetails, 2000))
    return 'techExperienceDetails is required';

  if (!isAllowed(b.hasLaptop, ALLOWED.hasLaptop)) return 'invalid hasLaptop value';
  if (!isAllowed(b.learningMode, ALLOWED.learningMode)) return 'invalid learningMode value';

  if (!trim(b.whyReduzer)) return 'whyReduzer is required';
  if (!trim(b.biggestObstacle)) return 'biggestObstacle is required';
  if (!trim(b.timeFailed)) return 'timeFailed is required';
  if (!trim(b.ifFallBehind)) return 'ifFallBehind is required';
  if (!trim(b.reqChanges)) return 'reqChanges is required';
  if (!trim(b.workStyle)) return 'workStyle is required';

  if (!isAllowed(b.heardFrom, ALLOWED.heardFrom)) return 'invalid heardFrom value';
  if (b.heardFrom === 'Other' && !trim(b.heardFromOther, 200)) return 'heardFromOther is required';

  return null;
}
