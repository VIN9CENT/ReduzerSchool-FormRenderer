'use client';

import posthog from 'posthog-js';
import { useCallback } from 'react';
import { usePostHog } from 'posthog-js/react';
import { classifyPersona } from '../utils/classifyPersona';
import type { ApplicationFormData, Persona } from '../types';

export function useFormTracking() {
  const ph = usePostHog();

  const posthogId = ph?.get_distinct_id?.() ?? posthog.get_distinct_id() ?? '';

  const trackStep1Complete = useCallback(() => {
    posthog.capture('application_step_completed', { from_step: 1 });
  }, []);

  const trackStep2Complete = useCallback(
    (
      formData: Pick<
        ApplicationFormData,
        'occupation' | 'educationLevel' | 'priorExperience'
      >
    ) => {
      const persona: Persona = classifyPersona(formData);

      posthog.setPersonProperties(
        {
          persona,
          occupation: formData.occupation,
          education_level: formData.educationLevel,
          prior_experience: formData.priorExperience,
        },
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

  const trackStep3Complete = useCallback(
    (
      formData: Pick<ApplicationFormData, 'hasLaptop' | 'learningMode' | 'city'>
    ) => {
      posthog.capture('application_step_completed', {
        from_step: 3,
        has_laptop: formData.hasLaptop,
        learning_mode: formData.learningMode,
        city_reported: formData.city,
      });
    },
    []
  );

  const trackStep4Complete = useCallback(
    (gritMetrics: {
      timeOnPageSeconds: number;
      hasPastedInWhyJoin: boolean;
      hasPastedInChallenge: boolean;
      validationErrorCount: number;
    }) => {
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

  const trackStep5Complete = useCallback((referralSource: string) => {
    posthog.capture('application_step_completed', {
      from_step: 5,
      referral_source: referralSource,
    });
  }, []);

  return {
    posthogId,
    trackStep1Complete,
    trackStep2Complete,
    trackStep3Complete,
    trackStep4Complete,
    trackStep5Complete,
  };
}
