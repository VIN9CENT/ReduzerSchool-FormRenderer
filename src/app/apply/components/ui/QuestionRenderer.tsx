'use client';

import React, { useState, useMemo } from 'react';
import { Question, QuestionRendererProps } from '../../validation/QuestionTypes';

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  questions,
  onSubmit,
  allowPasting,
}) => {
  const [answers, setAnswers] = useState<Record<string, string | string[]>>(() => {
    const initial: Record<string, string | string[]> = {};
    questions.forEach((q: Question) => {
      initial[q.id] = q.type === 'checkbox' ? [] : '';
    });
    return initial;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (value: string | string[], validation?: Question['validation']): string => {
    if (!validation) return '';
    if (validation.required && (Array.isArray(value) ? value.length === 0 : !value)) return 'This field is required';
    if (typeof value === 'string' && value !== '') {
      if (validation.minLength && value.length < validation.minLength) return `Min ${validation.minLength} characters`;
      if (validation.maxLength && value.length > validation.maxLength) return `Max ${validation.maxLength} characters`;
      if (validation.pattern && !new RegExp(validation.pattern).test(value)) return 'Invalid format';
    }
    return '';
  };

  const handleValueChange = (id: string, value: string | string[], validation?: Question['validation']) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setTouched((prev) => ({ ...prev, [id]: true }));
    setErrors((prev) => ({ ...prev, [id]: validateField(value, validation) }));
  };

  const isFormValid = useMemo(() => {
    return questions.every((q: Question) => validateField(answers[q.id], q.validation) === '');
  }, [answers, questions]);

  // Autofill fix: override Chrome's blue background with inset box-shadow
  const inputBase = "w-full px-3 py-2.5 sm:px-4 sm:py-2 border rounded-sm outline-none transition-all focus:ring-1 focus:ring-red-600 focus:border-red-600 text-sm sm:text-base autofill:shadow-[inset_0_0_0px_1000px_white] autofill:[-webkit-text-fill-color:theme(colors.gray.900)]";
  const inputNormal = "border-gray-400 text-gray-900 bg-white";
  const inputError = "border-red-600 bg-red-50";

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (isFormValid) onSubmit(answers); }} className="space-y-5 sm:space-y-6">
      {questions.map((q: Question) => {
        const fieldError = touched[q.id] ? errors[q.id] : '';
        const errorId = `${q.id}-error`;
        const val = answers[q.id];

        return (
          <div key={q.id} className="flex flex-col gap-1.5">
            {q.type !== 'radio' && q.type !== 'checkbox' && (
              <label htmlFor={q.id} className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-700">
                {q.label}
              </label>
            )}

            {q.type === 'text' && (
              <input
                id={q.id}
                type="text"
                className={`${inputBase} ${fieldError ? inputError : inputNormal}`}
                value={typeof val === 'string' ? val : ''}
                onPaste={(e) => !allowPasting && e.preventDefault()}
                onChange={(e) => handleValueChange(q.id, e.target.value, q.validation)}
              />
            )}

            {q.type === 'textarea' && (
              <textarea
                id={q.id}
                rows={4}
                className={`${inputBase} ${fieldError ? inputError : inputNormal}`}
                value={typeof val === 'string' ? val : ''}
                onPaste={(e) => !allowPasting && e.preventDefault()}
                onChange={(e) => handleValueChange(q.id, e.target.value, q.validation)}
              />
            )}

            {q.type === 'select' && (
              <select
                id={q.id}
                className={`${inputBase} ${fieldError ? inputError : inputNormal}`}
                value={typeof val === 'string' ? val : ''}
                onChange={(e) => handleValueChange(q.id, e.target.value, q.validation)}
              >
                <option value="" className="text-gray-400">SELECT AN OPTION...</option>
                {q.options?.map((opt) => (
                  <option key={opt.value} value={opt.value} className="text-gray-900">
                    {opt.label}
                  </option>
                ))}
              </select>
            )}

            {(q.type === 'radio' || q.type === 'checkbox') && (
              <fieldset className={`border p-3 sm:p-4 rounded-sm ${fieldError ? 'border-red-600' : 'border-gray-400'}`}>
                <legend className="px-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-700">{q.label}</legend>
                <div className="space-y-3 mt-1">
                  {q.options?.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 text-sm font-medium cursor-pointer text-gray-800 touch-manipulation">
                      <input
                        type={q.type}
                        name={q.id}
                        className="w-5 h-5 sm:w-4 sm:h-4 accent-red-600 cursor-pointer"
                        checked={q.type === 'radio' ? val === opt.value : Array.isArray(val) && val.includes(opt.value)}
                        onChange={(e) => {
                          let n: string | string[];
                          if (q.type === 'radio') n = opt.value;
                          else {
                            const cur = Array.isArray(val) ? val : [];
                            n = e.target.checked ? [...cur, opt.value] : cur.filter((v) => v !== opt.value);
                          }
                          handleValueChange(q.id, n, q.validation);
                        }}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {fieldError && (
              <span id={errorId} className="text-[10px] text-red-600 font-bold uppercase">
                {fieldError}
              </span>
            )}
          </div>
        );
      })}

      <button
        type="submit"
        disabled={!isFormValid}
        className="w-full bg-red-600 text-white py-4 sm:py-3 px-6 rounded-sm text-sm sm:text-base font-semibold uppercase tracking-widest hover:bg-red-800 active:bg-red-900 transition-colors touch-manipulation disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed mt-4"
      >
        Submit Application
      </button>
    </form>
  );
};