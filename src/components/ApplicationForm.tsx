'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Loader2,
} from 'lucide-react';

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormData {
  // Section 1
  fullName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  // Section 2
  occupation: string;
  occupationOther: string;
  education: string;
  educationOther: string;
  hasTechExperience: string;
  techExperienceDetails: string;
  // Section 3
  hasLaptop: string;
  learningMode: string;
  // Section 4
  whyReduzer: string;
  biggestObstacle: string;
  timeFailed: string;
  ifFallBehind: string;
  reqChanges: string;
  workStyle: string;
  // Section 5
  heardFrom: string;
  heardFromOther: string;
  additionalInfo: string;
}

type Errors = Partial<Record<keyof FormData, string>>;

interface EventEntry {
  type: string;
  field?: string;
  step?: number;
  ts: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const INITIAL: FormData = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  country: '',
  occupation: '',
  occupationOther: '',
  education: '',
  educationOther: '',
  hasTechExperience: '',
  techExperienceDetails: '',
  hasLaptop: '',
  learningMode: '',
  whyReduzer: '',
  biggestObstacle: '',
  timeFailed: '',
  ifFallBehind: '',
  reqChanges: '',
  workStyle: '',
  heardFrom: '',
  heardFromOther: '',
  additionalInfo: '',
};

const STEPS = [
  'Personal Info',
  'Background',
  'Logistics',
  'Mindset',
  'Final Questions',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function validate(step: number, data: FormData): Errors {
  const e: Errors = {};

  if (step === 1) {
    if (!data.fullName.trim()) e.fullName = 'Full name is required';
    if (!data.email.trim()) {
      e.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      e.email = 'Enter a valid email address';
    }
    if (!data.phone.trim()) {
      e.phone = 'Phone number is required';
    } else {
      const stripped = data.phone.trim().replace(/[\s\-().]/g, '');
      if (!/^(\+?254|0)\d{9}$/.test(stripped) && !/^\+[1-9]\d{6,14}$/.test(stripped)) {
        e.phone = 'Enter a valid number (e.g. 0700 000 000 or +254 700 000 000)';
      }
    }
    if (!data.city.trim()) e.city = 'City is required';
    if (!data.country.trim()) e.country = 'Country is required';
  }

  if (step === 2) {
    if (!data.occupation)
      e.occupation = 'Please select your current occupation';
    if (data.occupation === 'Other' && !data.occupationOther.trim())
      e.occupationOther = 'Please specify';
    if (!data.education)
      e.education = 'Please select your highest education level';
    if (data.education === 'Other' && !data.educationOther.trim())
      e.educationOther = 'Please specify';
    if (!data.hasTechExperience)
      e.hasTechExperience = 'Please answer this question';
    if (data.hasTechExperience === 'Yes, I have some experience' && !data.techExperienceDetails.trim())
      e.techExperienceDetails = 'Please briefly describe your experience';
  }

  if (step === 3) {
    if (!data.hasLaptop) e.hasLaptop = 'Please answer this question';
    if (!data.learningMode)
      e.learningMode = 'Please select your preferred mode';
  }

  if (step === 4) {
    const wc = countWords(data.whyReduzer);
    if (!data.whyReduzer.trim()) {
      e.whyReduzer = 'This field is required';
    } else if (wc < 100) {
      e.whyReduzer = `Minimum 100 words required (${wc} so far)`;
    }
    if (!data.biggestObstacle.trim())
      e.biggestObstacle = 'This field is required';
    if (!data.timeFailed.trim()) e.timeFailed = 'This field is required';
    if (!data.ifFallBehind.trim()) e.ifFallBehind = 'This field is required';
    if (!data.reqChanges.trim()) e.reqChanges = 'This field is required';
    if (!data.workStyle.trim()) e.workStyle = 'This field is required';
  }

  if (step === 5) {
    if (!data.heardFrom) e.heardFrom = 'Please select an option';
    if (data.heardFrom === 'Other' && !data.heardFromOther.trim())
      e.heardFromOther = 'Please specify';
  }

  return e;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldWrapper({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-800">
        {label}
        {required && <span className="text-[#BB001F] ml-0.5">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-500 -mt-1">{hint}</p>}
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-600">
          <AlertCircle size={11} className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-lg border text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:ring-2 focus:ring-[#BB001F]/20 ${
        error
          ? 'border-red-400 bg-red-50'
          : 'border-gray-200 bg-white hover:border-gray-300 focus:border-[#BB001F]'
      }`}
    />
  );
}

function Textarea({
  value,
  onChange,
  placeholder,
  rows = 4,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  error?: boolean;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`w-full px-4 py-3 rounded-lg border text-sm text-gray-900 placeholder-gray-400 outline-none resize-none transition-colors focus:ring-2 focus:ring-[#BB001F]/20 ${
        error
          ? 'border-red-400 bg-red-50'
          : 'border-gray-200 bg-white hover:border-gray-300 focus:border-[#BB001F]'
      }`}
    />
  );
}

function RadioGroup({
  name,
  options,
  value,
  onChange,
  error,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-2 ${error ? 'rounded-lg p-3 bg-red-50 border border-red-200' : ''}`}
    >
      {options.map((opt) => {
        const selected = value === opt;
        return (
          <label
            key={opt}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all select-none ${
              selected
                ? 'border-[#BB001F] bg-[#BB001F]/5'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt}
              checked={selected}
              onChange={() => onChange(opt)}
              className="sr-only"
            />
            <span
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                selected ? 'border-[#BB001F]' : 'border-gray-300'
              }`}
            >
              {selected && (
                <span className="w-2 h-2 rounded-full bg-[#BB001F] block" />
              )}
            </span>
            <span
              className={`text-sm font-medium ${selected ? 'text-[#BB001F]' : 'text-gray-700'}`}
            >
              {opt}
            </span>
          </label>
        );
      })}
    </div>
  );
}

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <>
      {/* Mobile */}
      <div className="flex items-center justify-between mb-8 sm:hidden">
        <p className="text-sm font-semibold text-gray-700">
          Step {current} of {STEPS.length}
        </p>
        <p className="text-sm font-semibold text-[#BB001F]">
          {STEPS[current - 1]}
        </p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-8 sm:hidden">
        <div
          className="bg-[#BB001F] h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${(current / STEPS.length) * 100}%` }}
        />
      </div>

      {/* Desktop */}
      <div className="hidden sm:flex items-center justify-between mb-10">
        {STEPS.map((label, i) => {
          const step = i + 1;
          const done = step < current;
          const active = step === current;
          return (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    done
                      ? 'bg-[#BB001F] text-white'
                      : active
                        ? 'bg-[#BB001F] text-white ring-4 ring-[#BB001F]/20'
                        : 'bg-white border-2 border-gray-200 text-gray-400'
                  }`}
                >
                  {done ? <Check size={16} strokeWidth={3} /> : step}
                </div>
                <span
                  className={`text-[11px] font-semibold whitespace-nowrap ${
                    active
                      ? 'text-[#BB001F]'
                      : done
                        ? 'text-gray-500'
                        : 'text-gray-400'
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-2 mb-5 rounded-full transition-colors ${
                    step < current ? 'bg-[#BB001F]' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

// ─── Section renders ──────────────────────────────────────────────────────────

function Section1({
  data,
  errors,
  set,
}: {
  data: FormData;
  errors: Errors;
  set: (k: keyof FormData, v: string) => void;
}) {
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

function Section2({
  data,
  errors,
  set,
}: {
  data: FormData;
  errors: Errors;
  set: (k: keyof FormData, v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <FieldWrapper
        label="Current occupation"
        required
        error={errors.occupation}
      >
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

function Section3({
  data,
  errors,
  set,
}: {
  data: FormData;
  errors: Errors;
  set: (k: keyof FormData, v: string) => void;
}) {
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

function Section4({
  data,
  errors,
  set,
}: {
  data: FormData;
  errors: Errors;
  set: (k: keyof FormData, v: string) => void;
}) {
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
          placeholder="Tell us what motivates you to pursue a career in tech and why Reduzer School specifically..."
          rows={6}
          error={!!errors.whyReduzer}
        />
        <p
          className={`text-xs mt-0.5 ${wc >= 100 ? 'text-green-600' : 'text-gray-400'}`}
        >
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

function Section5({
  data,
  errors,
  set,
}: {
  data: FormData;
  errors: Errors;
  set: (k: keyof FormData, v: string) => void;
}) {
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
          placeholder="Any additional context, circumstances, or information you'd like to share..."
          rows={4}
        />
      </FieldWrapper>
    </div>
  );
}

// ─── Already-applied screen ───────────────────────────────────────────────────

function AlreadyAppliedScreen() {
  return (
    <div className="flex flex-col items-center text-center py-12 px-6">
      <div className="w-16 h-16 rounded-full bg-[#BB001F] flex items-center justify-center mb-6">
        <Check size={32} strokeWidth={3} className="text-white" />
      </div>
      <h2 className="text-2xl font-bold text-[#191C1E] mb-3">
        Already submitted
      </h2>
      <p className="text-gray-500 max-w-sm leading-relaxed mb-8">
        We already have your application on file. We will review it and get back
        to you within 3–5 business days.
      </p>
      <Link
        href="/"
        className="text-sm font-semibold text-[#BB001F] underline underline-offset-2 hover:opacity-75 transition-opacity"
      >
        Back to home
      </Link>
    </div>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen() {
  return (
    <div className="flex flex-col items-center text-center py-12 px-6">
      <div className="w-16 h-16 rounded-full bg-[#BB001F] flex items-center justify-center mb-6">
        <Check size={32} strokeWidth={3} className="text-white" />
      </div>
      <h2 className="text-2xl font-bold text-[#191C1E] mb-3">
        Application submitted!
      </h2>
      <p className="text-gray-500 max-w-sm leading-relaxed mb-8">
        Thank you for applying to Reduzer School. We will review your
        application and get back to you within 3–5 business days.
      </p>
      <Link
        href="/"
        className="text-sm font-semibold text-[#BB001F] underline underline-offset-2 hover:opacity-75 transition-opacity"
      >
        Back to home
      </Link>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(
    () => typeof window !== 'undefined' && localStorage.getItem('reduzer_school_applied') === 'true'
  );
  const [events, setEvents] = useState<EventEntry[]>(() => [
    { type: 'form_open', ts: new Date().toISOString() },
  ]);
  const formRef = useRef<HTMLDivElement>(null);

  const logEvent = useCallback((type: string, extras?: Omit<EventEntry, 'type' | 'ts'>) => {
    const entry: EventEntry = { type, ts: new Date().toISOString(), ...extras };
    setEvents((prev) => [...prev, entry]);
  }, []);

  useEffect(() => {
    const el = formRef.current;
    if (!el) return;

    const block = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      const field = target.getAttribute('name') ?? target.tagName.toLowerCase();
      logEvent(`${e.type}_blocked`, { field });
    };

    el.addEventListener('copy', block);
    el.addEventListener('cut', block);
    el.addEventListener('paste', block);
    el.addEventListener('contextmenu', block);

    return () => {
      el.removeEventListener('copy', block);
      el.removeEventListener('cut', block);
      el.removeEventListener('paste', block);
      el.removeEventListener('contextmenu', block);
    };
  }, [logEvent]);

  function set(key: keyof FormData, value: string) {
    setData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleNext() {
    const e = validate(step, data);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      logEvent('validation_failed', { step, field: Object.keys(e).join(',') });
      return;
    }
    setErrors({});
    logEvent('step_next', { step });
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleBack() {
    setErrors({});
    setSubmitError('');
    logEvent('step_back', { step });
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSubmit() {
    const e = validate(5, data);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      logEvent('validation_failed', { step: 5, field: Object.keys(e).join(',') });
      return;
    }

    logEvent('submit_attempt');
    setSubmitting(true);
    setSubmitError('');

    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (!siteKey) throw new Error('Something went wrong. Please refresh and try again.');

      const recaptchaToken = await new Promise<string>((resolve, reject) => {
        if (!window.grecaptcha) {
          reject(new Error('reCAPTCHA has not loaded. Please refresh and try again.'));
          return;
        }
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(siteKey, { action: 'submit' })
            .then(resolve)
            .catch(() => reject(new Error('reCAPTCHA check failed. Please refresh and try again.')));
        });
      });

      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          eventLog: JSON.stringify([...events, { type: 'submit_attempt', ts: new Date().toISOString() }]),
          recaptchaToken,
        }),
      });

      if (res.status === 409) {
        localStorage.setItem('reduzer_school_applied', 'true');
        setAlreadyApplied(true);
        return;
      }

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? 'Something went wrong. Please try again.');
      }

      logEvent('submit_success');
      localStorage.setItem('reduzer_school_applied', 'true');
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      logEvent('submit_error', { field: err instanceof Error ? err.message : 'unknown' });
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  const sectionProps = { data, errors, set };

  if (alreadyApplied) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <AlreadyAppliedScreen />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <SuccessScreen />
      </div>
    );
  }

  return (
    <div ref={formRef} className="bg-white rounded-2xl border border-gray-200 shadow-sm">
      <div className="p-6 md:p-8">
        <StepIndicator current={step} />

        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#191C1E]">
            {step === 1 && 'Personal Information'}
            {step === 2 && 'Background'}
            {step === 3 && 'Logistics'}
            {step === 4 && 'Mindset & Problem Solving'}
            {step === 5 && 'Final Questions'}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {step === 4
              ? 'Answer honestly — these are about your character, not technical skills.'
              : 'All fields marked * are required.'}
          </p>
        </div>

        {step === 1 && <Section1 {...sectionProps} />}
        {step === 2 && <Section2 {...sectionProps} />}
        {step === 3 && <Section3 {...sectionProps} />}
        {step === 4 && <Section4 {...sectionProps} />}
        {step === 5 && <Section5 {...sectionProps} />}

        {submitError && (
          <div className="mt-6 flex items-start gap-2 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <p>{submitError}</p>
          </div>
        )}

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={16} />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-lg bg-[#BB001F] text-white text-sm font-semibold hover:bg-[#a0001a] transition-colors shadow-sm"
            >
              Next
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 px-7 py-2.5 rounded-lg bg-[#BB001F] text-white text-sm font-semibold hover:bg-[#a0001a] transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  Submit Application
                  <Check size={16} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
