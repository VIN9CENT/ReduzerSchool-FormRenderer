'use client';

import { FormData, FormErrors } from '../../formTypes';
import { FieldWrapper } from '../ui/FieldWrapper';
import { Textarea } from '../ui/Textarea';

function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

interface Props {
  data: FormData;
  errors: FormErrors;
  set: (k: keyof FormData, v: string) => void;
  onPaste: (field: 'whyJoin' | 'challenge') => void;
}

export function Step4Mindset({ data, errors, set, onPaste }: Props) {
  const wc = countWords(data.whyReduzer);
  return (
    <div className="flex flex-col gap-6">
      <FieldWrapper
        label="Why do you want to join Reduzer School?"
        hint="Minimum 100 words"
        required
        error={errors.whyReduzer}
      >
        <Textarea
          value={data.whyReduzer}
          onChange={(v) => set('whyReduzer', v)}
          onPaste={() => onPaste('whyJoin')}
          placeholder="Tell us what motivates you to pursue a career in tech and why Reduzer School specifically..."
          rows={6}
          error={!!errors.whyReduzer}
        />
        <p className={`text-xs mt-0.5 ${wc >= 100 ? 'text-green-600' : 'text-gray-400'}`}>
          {wc} / 100 words minimum
        </p>
      </FieldWrapper>

      <FieldWrapper
        label="What is the biggest obstacle standing between you and a career in tech right now?"
        required
        error={errors.biggestObstacle}
      >
        <Textarea
          value={data.biggestObstacle}
          onChange={(v) => set('biggestObstacle', v)}
          onPaste={() => onPaste('challenge')}
          placeholder="Be honest — this helps us understand how to support you..."
          rows={4}
          error={!!errors.biggestObstacle}
        />
      </FieldWrapper>

      <FieldWrapper
        label="Tell me about a time you failed at something difficult. What did you do after?"
        required
        error={errors.timeFailed}
      >
        <Textarea
          value={data.timeFailed}
          onChange={(v) => set('timeFailed', v)}
          placeholder="Describe the situation, what happened, and how you responded..."
          rows={4}
          error={!!errors.timeFailed}
        />
      </FieldWrapper>

      <FieldWrapper
        label="If you fall behind in the program, what will you do?"
        required
        error={errors.ifFallBehind}
      >
        <Textarea
          value={data.ifFallBehind}
          onChange={(v) => set('ifFallBehind', v)}
          placeholder="Describe your approach to catching up and managing setbacks..."
          rows={3}
          error={!!errors.ifFallBehind}
        />
      </FieldWrapper>

      <FieldWrapper
        label="Imagine requirements change halfway through a project. How do you adapt?"
        required
        error={errors.reqChanges}
      >
        <Textarea
          value={data.reqChanges}
          onChange={(v) => set('reqChanges', v)}
          placeholder="Describe your thought process and approach..."
          rows={3}
          error={!!errors.reqChanges}
        />
      </FieldWrapper>

      <FieldWrapper
        label="Do you prefer working alone or in a group? Share an example of collaboration."
        required
        error={errors.workStyle}
      >
        <Textarea
          value={data.workStyle}
          onChange={(v) => set('workStyle', v)}
          placeholder="Give a concrete example from school, work, or a personal project..."
          rows={4}
          error={!!errors.workStyle}
        />
      </FieldWrapper>
    </div>
  );
}
