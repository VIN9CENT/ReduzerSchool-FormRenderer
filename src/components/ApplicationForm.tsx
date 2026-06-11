'use client';
import posthog from 'posthog-js';

import { useRef, useEffect } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Loader2,
  Check,
} from 'lucide-react';
import {
  Occupation,
  EducationLevel,
  PriorExperience,
  LearningMode,
} from '@/app/apply/types';
import { useFormTracking } from '@/app/apply/hooks/useFormTracking';
import { useGritMetrics } from '@/app/apply/hooks/useGritMetrics';
import { useFormState } from '@/app/apply/hooks/useFormState';
import { FormValidator } from '@/app/apply/validation/FormValidator';
import { FormSubmissionService } from '@/app/apply/services/FormSubmissionService';
import { FormSession } from '@/app/apply/services/FormSession';
import { StepIndicator } from '@/app/apply/components/ui/StepIndicator';
import { Step1PersonalInfo } from '@/app/apply/components/steps/Step1PersonalInfo';
import { Step2Background } from '@/app/apply/components/steps/Step2Background';
import { Step3Logistics } from '@/app/apply/components/steps/Step3Logistics';
import { Step4Mindset } from '@/app/apply/components/steps/Step4Mindset';
import { Step5FinalQuestions } from '@/app/apply/components/steps/Step5FinalQuestions';
import { AlreadyAppliedScreen } from '@/app/apply/components/screens/AlreadyAppliedScreen';
import { SuccessScreen } from '@/app/apply/components/screens/SuccessScreen';
import { STEPS } from '@/app/apply/formTypes';

export default function ApplicationForm() {
  const {
    step,
    setStep,
    data,
    errors,
    setErrors,
    submitting,
    setSubmitting,
    submitError,
    setSubmitError,
    submitted,
    setSubmitted,
    highestStep,
    setHighestStep,
    alreadyApplied,
    setAlreadyApplied,
    events,
    setField,
    logEvent,
  } = useFormState();

  const {
    posthogId,
    trackStep1Complete,
    trackStep2Complete,
    trackStep3Complete,
    trackStep4Complete,
    trackStep5Complete,
  } = useFormTracking();

  const gritMetrics = useGritMetrics();
  const { resetTimer } = gritMetrics;
  const formRef = useRef<HTMLDivElement>(null);
  // Track funnel entry once on mount
  useEffect(() => {
    posthog.capture('funnel_started');
  }, []);

  // Reset grit timer whenever step 4 is entered (covers session restore and normal flow)
  useEffect(() => {
    if (step === 4) resetTimer();
  }, [step, resetTimer]);

  // Block copy / cut / paste / right-click on the form container
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

  function handleNext() {
    const e = FormValidator.validate(step, data);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      logEvent('validation_failed', { step, field: Object.keys(e).join(',') });
      if (step === 4 && gritMetrics.recordValidationError) {
        gritMetrics.recordValidationError();
      }
      return;
    }
    setErrors({});
    logEvent('step_next', { step });

    const isFirstVisit = step >= highestStep;

    if (step === 1 && isFirstVisit) {
      trackStep1Complete();
    }

    if (step === 2 && isFirstVisit) {
      const mappedOccupation: Occupation =
        data.occupation === 'Student'
          ? 'student'
          : data.occupation.includes('Employed')
            ? 'employed_professional'
            : data.occupation === 'Unemployed'
              ? 'unemployed'
              : 'other';
      const mappedEducation: EducationLevel =
        data.education === 'High school / KCSE'
          ? 'high_school'
          : data.education === "Bachelor's degree"
            ? 'undergraduate'
            : data.education === "Master's degree or higher"
              ? 'graduate'
              : 'other';
      const mappedExperience: PriorExperience = data.hasTechExperience.includes(
        'Yes'
      )
        ? 'basic'
        : 'none';
      trackStep2Complete({
        occupation: mappedOccupation,
        educationLevel: mappedEducation,
        priorExperience: mappedExperience,
      });
    }

    if (step === 3 && isFirstVisit) {
      const mappedMode: LearningMode = data.learningMode.startsWith('Yes')
        ? 'physical_kisii'
        : 'undecided';
      trackStep3Complete({
        hasLaptop: data.hasLaptop === 'Yes',
        learningMode: mappedMode,
        city: data.city,
      });
    }

    if (step === 4 && isFirstVisit) {
      trackStep4Complete(gritMetrics.getFinalMetrics());
    }

    setHighestStep((prev) => Math.max(prev, step + 1));
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
    const e = FormValidator.validate(5, data);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      logEvent('validation_failed', {
        step: 5,
        field: Object.keys(e).join(','),
      });
      return;
    }
    trackStep5Complete(data.heardFrom);
    logEvent('submit_attempt');
    setSubmitting(true);
    setSubmitError('');
    try {
      const { alreadyApplied: dup } = await FormSubmissionService.submit(
        data,
        events,
        posthogId
      );
      if (dup) {
        localStorage.setItem('reduzer_school_applied', 'true');
        setAlreadyApplied(true);
        return;
      }

      logEvent('submit_success');
      localStorage.setItem('reduzer_school_applied', 'true');
      FormSession.clear();
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      logEvent('submit_error', {
        field: err instanceof Error ? err.message : 'unknown',
      });
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  const sectionProps = { data, errors, set: setField };

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
    <div
      ref={formRef}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm"
    >
      <div className="p-6 md:p-8">
        <StepIndicator current={step} />

        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#191C1E]">
            {step === 1 && 'Personal Information'}
            {step === 2 && 'Background'}
            {step === 3 && 'Commitment'}
            {step === 4 && 'Mindset and Problem Solving'}
            {step === 5 && 'Final Questions'}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {step === 4
              ? 'Answer plainly. We are looking for ownership, not polished answers.'
              : 'All fields marked * are required.'}
          </p>
        </div>

        {step === 1 && <Step1PersonalInfo {...sectionProps} />}
        {step === 2 && <Step2Background {...sectionProps} />}
        {step === 3 && <Step3Logistics {...sectionProps} />}
        {step === 4 && (
          <Step4Mindset {...sectionProps} onPaste={gritMetrics.recordPaste} />
        )}
        {step === 5 && <Step5FinalQuestions {...sectionProps} />}

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

          {step < STEPS.length ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-lg bg-red text-white text-sm font-semibold hover:bg-red/90 transition-colors shadow-sm"
            >
              Next
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 px-7 py-2.5 rounded-lg bg-red text-white text-sm font-semibold hover:bg-red/90 transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  Submit application
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
