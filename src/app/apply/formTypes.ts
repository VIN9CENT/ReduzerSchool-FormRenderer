export interface FormData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  occupation: string;
  occupationOther: string;
  education: string;
  educationOther: string;
  hasTechExperience: string;
  techExperienceDetails: string;
  hasLaptop: string;
  learningMode: string;
  whyReduzer: string;
  biggestObstacle: string;
  timeFailed: string;
  ifFallBehind: string;
  reqChanges: string;
  workStyle: string;
  heardFrom: string;
  heardFromOther: string;
  additionalInfo: string;
}

export type FormErrors = Partial<Record<keyof FormData, string>>;

export interface EventEntry {
  type: string;
  field?: string;
  step?: number;
  ts: string;
}

export const INITIAL_FORM_DATA: FormData = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  country: '',
  occupation: '',
  occupationOther: '',
  education: '',
  educationOther: '',
  hasTechExperience: '',
  techExperienceDetails: '',
  hasLaptop: '',
  learningMode: '',
  whyReduzer: '',
  biggestObstacle: '',
  timeFailed: '',
  ifFallBehind: '',
  reqChanges: '',
  workStyle: '',
  heardFrom: '',
  heardFromOther: '',
  additionalInfo: '',
};

export const STEPS = [
  'Personal Info',
  'Background',
  'Commitment',
  'Mindset',
  'Final Questions',
];

export const SESSION_KEY = 'reduzer_form_progress';
