'use client';

import { useState, useCallback, useEffect } from 'react';
import { FormData, FormErrors, EventEntry, INITIAL_FORM_DATA } from '../formTypes';
import { FormSession } from '../services/FormSession';

export function useFormState() {
  const [step, setStep] = useState<number>(() => FormSession.load()?.step ?? 1);
  const [data, setData] = useState<FormData>(() => FormSession.load()?.data ?? INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [highestStep, setHighestStep] = useState<number>(() => FormSession.load()?.step ?? 1);
  const [alreadyApplied, setAlreadyApplied] = useState(
    () =>
      typeof window !== 'undefined' &&
      localStorage.getItem('reduzer_school_applied') === 'true'
  );
  const [events, setEvents] = useState<EventEntry[]>(
    () => FormSession.load()?.events ?? [{ type: 'form_open', ts: new Date().toISOString() }]
  );

  useEffect(() => {
    if (!submitted) {
      FormSession.save(step, data, events);
    }
  }, [step, data, events, submitted]);

  const setField = useCallback((key: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  const logEvent = useCallback(
    (type: string, extras?: Omit<EventEntry, 'type' | 'ts'>) => {
      const entry: EventEntry = { type, ts: new Date().toISOString(), ...extras };
      setEvents((prev) => [...prev, entry]);
    },
    []
  );

  return {
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
  };
}
