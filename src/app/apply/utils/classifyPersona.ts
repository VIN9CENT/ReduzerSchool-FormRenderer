import type { Occupation, EducationLevel, PriorExperience, Persona } from '../types'

interface PersonaInputs {
  occupation: Occupation | ''
  educationLevel: EducationLevel | ''
  priorExperience: PriorExperience | ''
}

/**
 * Classifies the applicant into a persona based on Step 2 answers.
 * 
 * Sandra: Mid-level professional, employed, upskilling
 * Alex:   Student or recent grad, paying personally, in tutorial hell
 * Faith:  Unemployed, career-starter, high-grit
 */
export function classifyPersona({ 
  occupation, 
  educationLevel 
}: PersonaInputs): Persona {
  
  // 1. Sandra is our corporate professional
  if (occupation === 'employed_professional') {
    return 'Sandra'
  }

  // 2. Alex is our academic/CS student persona
  if (
    occupation === 'student' ||
    educationLevel === 'undergraduate' ||
    educationLevel === 'graduate'
  ) {
    return 'Alex'
  }

  // 3. Faith is our career-starter/unemployed persona
  if (occupation === 'unemployed') {
    return 'Faith'
  }

  // Fallback for 'freelancer' or 'other'
  return 'Unknown'
}
