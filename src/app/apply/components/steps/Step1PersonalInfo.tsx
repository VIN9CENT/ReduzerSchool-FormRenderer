'use client';

import { FormData, FormErrors } from '../../formTypes';
import { FieldWrapper } from '../ui/FieldWrapper';
import { TextInput } from '../ui/TextInput';

interface Props {
  data: FormData;
  errors: FormErrors;
  set: (k: keyof FormData, v: string) => void;
}

export function Step1PersonalInfo({ data, errors, set }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <FieldWrapper label="Full name" required error={errors.fullName}>
        <TextInput
          value={data.fullName}
          onChange={(v) => set('fullName', v)}
          placeholder="Jane Doe"
          error={!!errors.fullName}
        />
      </FieldWrapper>

      <FieldWrapper label="Email address" required error={errors.email}>
        <TextInput
          value={data.email}
          onChange={(v) => set('email', v)}
          placeholder="jane@example.com"
          type="email"
          error={!!errors.email}
        />
      </FieldWrapper>

      <FieldWrapper label="Phone number" required error={errors.phone}>
        <TextInput
          value={data.phone}
          onChange={(v) => set('phone', v)}
          placeholder="+254 700 000 000"
          type="tel"
          error={!!errors.phone}
        />
      </FieldWrapper>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FieldWrapper label="City" required error={errors.city}>
          <TextInput
            value={data.city}
            onChange={(v) => set('city', v)}
            placeholder="Kisii"
            error={!!errors.city}
          />
        </FieldWrapper>
        <FieldWrapper label="Country" required error={errors.country}>
          <TextInput
            value={data.country}
            onChange={(v) => set('country', v)}
            placeholder="Kenya"
            error={!!errors.country}
          />
        </FieldWrapper>
      </div>
    </div>
  );
}
