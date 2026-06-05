'use client';

import { AlertCircle } from 'lucide-react';
import { FormData, FormErrors } from '../../formTypes';
import { FieldWrapper } from '../ui/FieldWrapper';
import { TextInput } from '../ui/TextInput';
import { Textarea } from '../ui/Textarea';
import { RadioGroup } from '../ui/RadioGroup';

interface Props {
  data: FormData;
  errors: FormErrors;
  set: (k: keyof FormData, v: string) => void;
}

export function Step2Background({ data, errors, set }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <FieldWrapper label="Current occupation" required error={errors.occupation}>
        <RadioGroup
          name="occupation"
          options={[
            'Student',
            'Employed full time',
            'Employed part time',
            'Self employed',
            'Unemployed',
            'Other',
          ]}
          value={data.occupation}
          onChange={(v) => set('occupation', v)}
          error={!!errors.occupation}
        />
        {data.occupation === 'Other' && (
          <div className="mt-2">
            <TextInput
              value={data.occupationOther}
              onChange={(v) => set('occupationOther', v)}
              placeholder="Please specify"
              error={!!errors.occupationOther}
            />
            {errors.occupationOther && (
              <p className="flex items-center gap-1 text-xs text-red-600 mt-1">
                <AlertCircle size={11} />
                {errors.occupationOther}
              </p>
            )}
          </div>
        )}
      </FieldWrapper>

      <FieldWrapper
        label="Highest level of education completed"
        required
        error={errors.education}
      >
        <RadioGroup
          name="education"
          options={[
            'High school / KCSE',
            'Diploma',
            "Bachelor's degree",
            "Master's degree or higher",
            'Other',
          ]}
          value={data.education}
          onChange={(v) => set('education', v)}
          error={!!errors.education}
        />
        {data.education === 'Other' && (
          <div className="mt-2">
            <TextInput
              value={data.educationOther}
              onChange={(v) => set('educationOther', v)}
              placeholder="Please specify"
              error={!!errors.educationOther}
            />
            {errors.educationOther && (
              <p className="flex items-center gap-1 text-xs text-red-600 mt-1">
                <AlertCircle size={11} />
                {errors.educationOther}
              </p>
            )}
          </div>
        )}
      </FieldWrapper>

      <FieldWrapper
        label="Do you have any prior experience in tech or programming?"
        required
        error={errors.hasTechExperience}
      >
        <RadioGroup
          name="hasTechExperience"
          options={[
            'Yes, I have some experience',
            'No, I am completely new to tech',
          ]}
          value={data.hasTechExperience}
          onChange={(v) => set('hasTechExperience', v)}
          error={!!errors.hasTechExperience}
        />
      </FieldWrapper>

      {data.hasTechExperience === 'Yes, I have some experience' && (
        <FieldWrapper
          label="Briefly describe your experience"
          required
          error={errors.techExperienceDetails}
        >
          <Textarea
            value={data.techExperienceDetails}
            onChange={(v) => set('techExperienceDetails', v)}
            placeholder="e.g. I have built a few websites using HTML and CSS, and I know some Python basics..."
            rows={3}
            error={!!errors.techExperienceDetails}
          />
        </FieldWrapper>
      )}
    </div>
  );
}
