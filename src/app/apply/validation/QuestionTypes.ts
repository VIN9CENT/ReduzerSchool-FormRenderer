export type QuestionType = 'text' | 'textarea' | 'select' | 'radio' | 'checkbox';

export interface QuestionOption {
  label: string;
  value: string;
}

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string; // Regex string
}

export interface Question {
  id: string;
  type: QuestionType;
  label: string;
  options?: QuestionOption[];
  validation?: ValidationRules;
}

export interface QuestionRendererProps {
  questions: Question[];
  onSubmit: (answers: Record<string, string | string[]>) => void;
  allowPasting: boolean;
}