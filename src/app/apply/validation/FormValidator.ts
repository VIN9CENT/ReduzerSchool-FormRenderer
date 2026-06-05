import { FormData, FormErrors } from '../formTypes';

function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export class FormValidator {
  static validateStep1(data: FormData): FormErrors {
    const e: FormErrors = {};
    if (!data.fullName.trim()) e.fullName = 'Full name is required';
    if (!data.email.trim()) {
      e.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      e.email = 'Enter a valid email address';
    }
    if (!data.phone.trim()) {
      e.phone = 'Phone number is required';
    } else {
      const stripped = data.phone.trim().replace(/[\s\-().]/g, '');
      if (
        !/^(\+?254|0)\d{9}$/.test(stripped) &&
        !/^\+[1-9]\d{6,14}$/.test(stripped)
      ) {
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
    if (!data.learningMode) e.learningMode = 'Please select your preferred mode';
    return e;
  }

  static validateStep4(data: FormData): FormErrors {
    const e: FormErrors = {};
    const wc = countWords(data.whyReduzer);
    if (!data.whyReduzer.trim()) {
      e.whyReduzer = 'This field is required';
    } else if (wc < 100) {
      e.whyReduzer = `Minimum 100 words required (${wc} so far)`;
    }
    if (!data.biggestObstacle.trim()) e.biggestObstacle = 'This field is required';
    if (!data.timeFailed.trim()) e.timeFailed = 'This field is required';
    if (!data.ifFallBehind.trim()) e.ifFallBehind = 'This field is required';
    if (!data.reqChanges.trim()) e.reqChanges = 'This field is required';
    if (!data.workStyle.trim()) e.workStyle = 'This field is required';
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
