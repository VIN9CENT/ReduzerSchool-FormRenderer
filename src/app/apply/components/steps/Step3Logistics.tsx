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
        label="What is your preferred mode of learning?"
        required
        error={errors.learningMode}
      >
        <RadioGroup
          name="learningMode"
          options={[
            'Online (fully remote learning)',
            'Physical (on-site learning in Kisii)',
            'Hybrid (mostly online with an on-site session during the final week)',
            'I need more information before deciding',
          ]}
          value={data.learningMode}
          onChange={(v) => set('learningMode', v)}
          error={!!errors.learningMode}
        />
      </FieldWrapper>
    </div>
  );
}
