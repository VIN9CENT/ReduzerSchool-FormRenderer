'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface GritMetrics {
  timeOnPageSeconds: number;
  hasPastedInWhyJoin: boolean;
  hasPastedInChallenge: boolean;
  validationErrorCount: number;
}

interface UseGritMetricsReturn {
  metrics: GritMetrics;
  recordPaste: (field: 'whyJoin' | 'challenge') => void;
  recordValidationError: () => void;
  getFinalMetrics: () => GritMetrics;
  resetTimer: () => void; // Added to trigger when Step 4 starts
}

export function useGritMetrics(): UseGritMetricsReturn {
  const startTimeRef = useRef<number>(0);

  // Initialize on mount
  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  const [metrics, setMetrics] = useState<GritMetrics>({
    timeOnPageSeconds: 0,
    hasPastedInWhyJoin: false,
    hasPastedInChallenge: false,
    validationErrorCount: 0,
  });

  const resetTimer = useCallback(() => {
    startTimeRef.current = Date.now();
  }, []);

  const recordPaste = useCallback((field: 'whyJoin' | 'challenge') => {
    setMetrics((prev) => ({
      ...prev,
      hasPastedInWhyJoin: field === 'whyJoin' ? true : prev.hasPastedInWhyJoin,
      hasPastedInChallenge: field === 'challenge' ? true : prev.hasPastedInChallenge,
    }));
  }, []);

  const recordValidationError = useCallback(() => {
    setMetrics((prev) => ({
      ...prev,
      validationErrorCount: prev.validationErrorCount + 1,
    }));
  }, []);

  const getFinalMetrics = useCallback((): GritMetrics => {
    // If startTime was never set, default to 0
    if (startTimeRef.current === 0) return { ...metrics, timeOnPageSeconds: 0 };
    
    const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
    return {
      ...metrics,
      timeOnPageSeconds: elapsed,
    };
  }, [metrics]);

  return { metrics, recordPaste, recordValidationError, getFinalMetrics, resetTimer };
}