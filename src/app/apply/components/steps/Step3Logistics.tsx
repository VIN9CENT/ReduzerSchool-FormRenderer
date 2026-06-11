'use client';

import { FormData, FormErrors } from '../../formTypes';
import { FieldWrapper } from '../ui/FieldWrapper';
import { RadioGroup } from '../ui/RadioGroup';

interface Props {
  data: FormData;
  errors: FormErrors;
  set: (k: keyof FormData, v: string) => void;
}

export function Step3Logistics({ data, errors, set }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <FieldWrapper
        label="Do you have a personal laptop?"
        required
        error={errors.hasLaptop}
      >
        <RadioGroup
          name="hasLaptop"
          options={['Yes', 'No']}
          value={data.hasLaptop}
          onChange={(v) => set('hasLaptop', v)}
          error={!!errors.hasLaptop}
        />
      </FieldWrapper>

      <FieldWrapper
        label="Can you attend in person in Kisii, Monday to Friday, 8am to 5pm, for the full programme?"
        required
        error={errors.learningMode}
      >
        <RadioGroup
          name="learningMode"
          options={[
            'Yes, I can attend in person for the full programme',
            'I need to confirm logistics before enrolment',
            'No, I cannot commit to full-time in-person study',
          ]}
          value={data.learningMode}
          onChange={(v) => set('learningMode', v)}
          error={!!errors.learningMode}
        />
      </FieldWrapper>
    </div>
  );
}
