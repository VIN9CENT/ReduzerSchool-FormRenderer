import { FormData, FormErrors } from '../formTypes';
import { EMAIL_RE, PHONE_STRIP_RE, PHONE_KE_RE, PHONE_INTL_RE } from './patterns';

function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function minWords(value: string, min: number): string | undefined {
  if (!value.trim()) return 'This field is required';
  const wc = countWords(value);
  if (wc < min) return `Minimum ${min} words required (${wc} so far)`;
  return undefined;
}

export class FormValidator {
  static validateStep1(data: FormData): FormErrors {
    const e: FormErrors = {};
    if (!data.fullName.trim()) e.fullName = 'Full name is required';
    if (!data.email.trim()) {
      e.email = 'Email is required';
    } else if (!EMAIL_RE.test(data.email)) {
      e.email = 'Enter a valid email address';
    }
    if (!data.phone.trim()) {
      e.phone = 'Phone number is required';
    } else {
      const stripped = data.phone.trim().replace(PHONE_STRIP_RE, '');
      if (!PHONE_KE_RE.test(stripped) && !PHONE_INTL_RE.test(stripped)) {
        e.phone = 'Enter a valid number (e.g. 0700 000 000 or +254 700 000 000)';
      }
    }
    if (!data.city.trim()) e.city = 'City is required';
    if (!data.country.trim()) e.country = 'Country is required';
    return e;
  }

  static validateStep2(data: FormData): FormErrors {
    const e: FormErrors = {};
    if (!data.occupation) e.occupation = 'Please select your current occupation';
    if (data.occupation === 'Other' && !data.occupationOther.trim())
      e.occupationOther = 'Please specify';
    if (!data.education) e.education = 'Please select your highest education level';
    if (data.education === 'Other' && !data.educationOther.trim())
      e.educationOther = 'Please specify';
    if (!data.hasTechExperience) e.hasTechExperience = 'Please answer this question';
    if (
      data.hasTechExperience === 'Yes, I have some experience' &&
      !data.techExperienceDetails.trim()
    )
      e.techExperienceDetails = 'Please briefly describe your experience';
    return e;
  }

  static validateStep3(data: FormData): FormErrors {
    const e: FormErrors = {};
    if (!data.hasLaptop) e.hasLaptop = 'Please answer this question';
    if (!data.learningMode) e.learningMode = 'Please answer this question';
    return e;
  }

  static validateStep4(data: FormData): FormErrors {
    const e: FormErrors = {};

    const whyErr = minWords(data.whyReduzer, 100);
    if (whyErr) e.whyReduzer = whyErr;

    const boErr = minWords(data.biggestObstacle, 30);
    if (boErr) e.biggestObstacle = boErr;

    const tfErr = minWords(data.timeFailed, 30);
    if (tfErr) e.timeFailed = tfErr;

    const ifbErr = minWords(data.ifFallBehind, 30);
    if (ifbErr) e.ifFallBehind = ifbErr;

    const rcErr = minWords(data.reqChanges, 30);
    if (rcErr) e.reqChanges = rcErr;

    const wsErr = minWords(data.workStyle, 30);
    if (wsErr) e.workStyle = wsErr;

    return e;
  }

  static validateStep5(data: FormData): FormErrors {
    const e: FormErrors = {};
    if (!data.heardFrom) e.heardFrom = 'Please select an option';
    if (data.heardFrom === 'Other' && !data.heardFromOther.trim())
      e.heardFromOther = 'Please specify';
    return e;
  }

  static validate(step: number, data: FormData): FormErrors {
    switch (step) {
      case 1: return this.validateStep1(data);
      case 2: return this.validateStep2(data);
      case 3: return this.validateStep3(data);
      case 4: return this.validateStep4(data);
      case 5: return this.validateStep5(data);
      default: return {};
    }
  }
}
