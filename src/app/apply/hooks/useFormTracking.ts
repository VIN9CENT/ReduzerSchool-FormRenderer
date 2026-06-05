'use client';

import posthog from 'posthog-js';
import { useCallback } from 'react';
import { usePostHog } from 'posthog-js/react';
import { classifyPersona } from '../utils/classifyPersona';
import type { ApplicationFormData, Persona } from '../types';

export function useFormTracking() {
  const ph = usePostHog();

  const posthogId = ph?.get_distinct_id?.() ?? posthog.get_distinct_id() ?? '';

  // Called when the user transitions between steps
  const trackStepComplete = useCallback(
    (
      fromStep: number,
      formData: Partial<ApplicationFormData>,
      extraProps?: Record<string, unknown>
    ) => {
      posthog.capture('application_step_completed', {
        from_step: fromStep,
        // We only pass non-PII behavioral signals to PostHog
        ...extraProps,
      });
    },
    []
  );

  // Step 2 specific: classify the persona and set person properties
  const trackStep2Complete = useCallback(
    (
      formData: Pick<
        ApplicationFormData,
        'occupation' | 'educationLevel' | 'priorExperience'
      >
    ) => {
      const persona: Persona = classifyPersona(formData);

      // setPersonProperties links the persona to ALL this user's future events
      posthog.setPersonProperties(
        {
          persona,
          occupation: formData.occupation,
          education_level: formData.educationLevel,
          prior_experience: formData.priorExperience,
        },
        // "set_once" properties won't be overwritten on future visits
        {
          first_persona_seen: persona,
        }
      );

      posthog.capture('application_step_completed', {
        from_step: 2,
        persona,
        occupation: formData.occupation,
        education_level: formData.educationLevel,
        prior_experience: formData.priorExperience,
      });
    },
    []
  );

  // Step 3 specific: logistics data
  const trackStep3Complete = useCallback(
    (
      formData: Pick<ApplicationFormData, 'hasLaptop' | 'learningMode' | 'city'>
    ) => {
      posthog.capture('application_step_completed', {
        from_step: 3,
        has_laptop: formData.hasLaptop,
        learning_mode: formData.learningMode,
        // City is behavioral context, not PII — used to detect the "Kisii Dealbreaker"
        city_reported: formData.city,
      });
    },
    []
  );

  // Step 4 specific: the Grit Metric event
  const trackStep4Complete = useCallback(
    (gritMetrics: {
      timeOnPageSeconds: number;
      hasPastedInWhyJoin: boolean;
      hasPastedInChallenge: boolean;
      validationErrorCount: number;
    }) => {
      // Classify the candidate based on grit signals
      const gritLabel =
        gritMetrics.timeOnPageSeconds > 120 &&
        !gritMetrics.hasPastedInWhyJoin &&
        !gritMetrics.hasPastedInChallenge
          ? 'gold'
          : gritMetrics.timeOnPageSeconds < 45 &&
              (gritMetrics.hasPastedInWhyJoin ||
                gritMetrics.hasPastedInChallenge)
            ? 'low_effort'
            : gritMetrics.validationErrorCount > 3
              ? 'frustrated'
              : 'standard';

      posthog.capture('grit_step_completed', {
        from_step: 4,
        time_on_step_seconds: gritMetrics.timeOnPageSeconds,
        pasted_why_join: gritMetrics.hasPastedInWhyJoin,
        pasted_challenge: gritMetrics.hasPastedInChallenge,
        validation_error_count: gritMetrics.validationErrorCount,
        grit_label: gritLabel,
      });
    },
    []
  );

  // Step 5 specific: referral source attribution
  const trackStep5Complete = useCallback((referralSource: string) => {
    posthog.capture('application_step_completed', {
      from_step: 5,
      referral_source: referralSource,
    });
  }, []);

  return {
    posthogId,
    trackStepComplete,
    trackStep2Complete,
    trackStep3Complete,
    trackStep4Complete,
    trackStep5Complete,
  };
}
