export type Occupation =
  | 'student'
  | 'employed_professional'
  | 'unemployed'
  | 'freelancer'
  | 'other'

export type EducationLevel =
  | 'high_school'
  | 'undergraduate'
  | 'graduate'
  | 'self_taught'
  | 'other'

export type PriorExperience = 'none' | 'basic' | 'intermediate' | 'advanced'

export type LearningMode = 'physical_kisii' | 'undecided'

// The persona we assign based on Step 2 answers
export type Persona = 'Alex' | 'Sandra' | 'Faith' | 'Unknown'

export interface ApplicationFormData {
  // Step 1: Personal Info (sent to Google Sheets, NOT PostHog)
  firstName: string
  lastName: string
  email: string
  phone: string

  // Step 2: Background
  occupation: Occupation | ''
  educationLevel: EducationLevel | ''
  priorExperience: PriorExperience | ''

  // Step 3: Logistics
  hasLaptop: boolean | null
  learningMode: LearningMode | ''
  city: string

  // Step 4: Mindset (Grit test)
  whyJoinAnswer: string
  challengeAnswer: string

  // Step 5: Final Questions
  referralSource: string

  // Hidden field — the PostHog bridge
  posthog_id: string
}

export const INITIAL_FORM_DATA: ApplicationFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  occupation: '',
  educationLevel: '',
  priorExperience: '',
  hasLaptop: null,
  learningMode: '',
  city: '',
  whyJoinAnswer: '',
  challengeAnswer: '',
  referralSource: '',
  posthog_id: '',
}
