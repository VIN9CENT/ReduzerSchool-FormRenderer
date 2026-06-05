'use client';

import { FormData, FormErrors } from '../../formTypes';
import { FieldWrapper } from '../ui/FieldWrapper';
import { Textarea } from '../ui/Textarea';

function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function WordCount({ value, min }: { value: string; min: number }) {
  const wc = countWords(value);
  return (
    <p className={`text-xs mt-0.5 ${wc >= min ? 'text-green-600' : 'text-gray-400'}`}>
      {wc} / {min} words minimum
    </p>
  );
}

interface Props {
  data: FormData;
  errors: FormErrors;
  set: (k: keyof FormData, v: string) => void;
  onPaste: (field: 'whyJoin' | 'challenge') => void;
}

export function Step4Mindset({ data, errors, set, onPaste }: Props) {
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
        <WordCount value={data.whyReduzer} min={100} />
      </FieldWrapper>

      <FieldWrapper
        label="What is the biggest obstacle standing between you and a career in tech right now?"
        hint="Minimum 30 words"
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
        <WordCount value={data.biggestObstacle} min={30} />
      </FieldWrapper>

      <FieldWrapper
        label="Tell me about a time you failed at something difficult. What did you do after?"
        hint="Minimum 30 words"
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
        <WordCount value={data.timeFailed} min={30} />
      </FieldWrapper>

      <FieldWrapper
        label="If you fall behind in the program, what will you do?"
        hint="Minimum 30 words"
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
        <WordCount value={data.ifFallBehind} min={30} />
      </FieldWrapper>

      <FieldWrapper
        label="Imagine requirements change halfway through a project. How do you adapt?"
        hint="Minimum 30 words"
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
        <WordCount value={data.reqChanges} min={30} />
      </FieldWrapper>

      <FieldWrapper
        label="Do you prefer working alone or in a group? Share an example of collaboration."
        hint="Minimum 30 words"
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
        <WordCount value={data.workStyle} min={30} />
      </FieldWrapper>
    </div>
  );
}
