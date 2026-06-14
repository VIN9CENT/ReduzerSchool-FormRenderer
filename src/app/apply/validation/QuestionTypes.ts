export type QuestionType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'email'
  | 'tel'
  | 'number'
  | 'date'
  | 'file'
  | 'url'
  | 'range'
  | 'declaration';

export interface QuestionOption {
  label: string;
  value: string;
}

export interface ValidationRules {
  required?: boolean;
  requiredMessage?: string;

  minLength?: number;
  minLengthMessage?: string;

  maxLength?: number;
  maxLengthMessage?: string;

  pattern?: string;
  patternMessage?: string;

  min?: number | string;  // number for number/range, date string for date
  minMessage?: string;

  max?: number | string;
  maxMessage?: string;

  accept?: string;        // file types e.g. ".pdf,.jpg"
  maxSizeMB?: number;
  maxSizeMessage?: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  label: string;
  placeholder?: string;
  hint?: string;
  options?: QuestionOption[];
  validation?: ValidationRules;
  step?: number;
  unit?: string;
}

export interface QuestionRendererProps {
  questions: Question[];
  onSubmit: (answers: Record<string, string | string[] | File | null>) => void;
  allowPasting: boolean;
}