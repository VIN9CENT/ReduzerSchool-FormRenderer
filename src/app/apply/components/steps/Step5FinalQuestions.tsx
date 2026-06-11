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

export function Step5FinalQuestions({ data, errors, set }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <FieldWrapper
        label="How did you hear about Reduzer School?"
        required
        error={errors.heardFrom}
      >
        <RadioGroup
          name="heardFrom"
          options={[
            'Instagram',
            'Twitter / X',
            'WhatsApp',
            'From a friend or colleague',
            'Google search',
            'Other',
          ]}
          value={data.heardFrom}
          onChange={(v) => set('heardFrom', v)}
          error={!!errors.heardFrom}
        />
        {data.heardFrom === 'Other' && (
          <div className="mt-2">
            <TextInput
              value={data.heardFromOther}
              onChange={(v) => set('heardFromOther', v)}
              placeholder="Please specify"
              error={!!errors.heardFromOther}
            />
            {errors.heardFromOther && (
              <p className="flex items-center gap-1 text-xs text-red-600 mt-1">
                <AlertCircle size={11} />
                {errors.heardFromOther}
              </p>
            )}
          </div>
        )}
      </FieldWrapper>

      <FieldWrapper
        label="Is there anything else you would like us to know about you?"
        hint="Optional"
      >
        <Textarea
          value={data.additionalInfo}
          onChange={(v) => set('additionalInfo', v)}
          placeholder="Anything practical we should understand before reviewing your application..."
          rows={4}
        />
      </FieldWrapper>
    </div>
  );
}
