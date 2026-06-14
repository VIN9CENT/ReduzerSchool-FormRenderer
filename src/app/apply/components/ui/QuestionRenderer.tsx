'use client';

import React, { useState, useMemo } from 'react';
import { Question, QuestionRendererProps } from '../../validation/QuestionTypes';

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  questions,
  onSubmit,
  allowPasting,
}) => {
  const [answers, setAnswers] = useState<Record<string, string | string[] | File | null>>(() => {
    const initial: Record<string, string | string[] | File | null> = {};
    questions.forEach((q: Question) => {
      if (q.type === 'checkbox' || q.type === 'declaration') initial[q.id] = [];
      else if (q.type === 'file') initial[q.id] = null;
      else if (q.type === 'range') initial[q.id] = String(q.validation?.min ?? 0);
      else initial[q.id] = '';
    });
    return initial;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (
    value: string | string[] | File | null,
    validation?: Question['validation'],
    type?: Question['type']
  ): string => {
    if (!validation) return '';
    const v = validation;

    // Required
    if (v.required) {
      if (value === null) return v.requiredMessage ?? 'This field is required';
      if (Array.isArray(value) && value.length === 0)
        return v.requiredMessage ?? 'Please select at least one option';
      if (typeof value === 'string' && !value.trim())
        return v.requiredMessage ?? 'This field is required';
    }

    // String-based validations
    if (typeof value === 'string' && value.trim() !== '') {
      if (v.minLength && value.length < v.minLength)
        return v.minLengthMessage ?? `Minimum ${v.minLength} characters required`;

      if (v.maxLength && value.length > v.maxLength)
        return v.maxLengthMessage ?? `Maximum ${v.maxLength} characters allowed`;

      if (v.pattern && !new RegExp(v.pattern).test(value))
        return v.patternMessage ?? 'Invalid format';

      if (type === 'number' || type === 'range') {
        const num = parseFloat(value);
        if (v.min !== undefined && num < Number(v.min))
          return v.minMessage ?? `Minimum value is ${v.min}`;
        if (v.max !== undefined && num > Number(v.max))
          return v.maxMessage ?? `Maximum value is ${v.max}`;
      }

      if (type === 'date') {
        if (v.min && value < String(v.min))
          return v.minMessage ?? `Date must be after ${v.min}`;
        if (v.max && value > String(v.max))
          return v.maxMessage ?? `Date must be before ${v.max}`;
      }
    }

    // File validations
    if (value instanceof File) {
      if (v.maxSizeMB && value.size > v.maxSizeMB * 1024 * 1024)
        return v.maxSizeMessage ?? `File must be smaller than ${v.maxSizeMB}MB`;
    }

    return '';
  };

  const handleValueChange = (
    id: string,
    value: string | string[] | File | null,
    validation?: Question['validation'],
    type?: Question['type']
  ) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setTouched((prev) => ({ ...prev, [id]: true }));
    setErrors((prev) => ({ ...prev, [id]: validateField(value, validation, type) }));
  };

  const isFormValid = useMemo(() => {
    return questions.every(
      (q: Question) => validateField(answers[q.id], q.validation, q.type) === ''
    );
  }, [answers, questions]);

  const inputBase =
    'w-full px-3 py-2.5 sm:px-4 sm:py-2 border rounded-sm outline-none transition-all focus:ring-1 focus:ring-red-600 focus:border-red-600 text-sm sm:text-base autofill:shadow-[inset_0_0_0px_1000px_white] autofill:[-webkit-text-fill-color:theme(colors.gray.900)]';
  const inputNormal = 'border-gray-400 text-gray-900 bg-white placeholder:text-gray-400';
  const inputError = 'border-red-600 bg-red-50 placeholder:text-gray-400';
  const labelClass = 'text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-700';
  const hintClass = 'text-[11px] text-gray-500 mt-0.5';

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (isFormValid) onSubmit(answers);
      }}
      className="space-y-5 sm:space-y-6"
    >
      {questions.map((q: Question) => {
        const fieldError = touched[q.id] ? errors[q.id] : '';
        const errorId = `${q.id}-error`;
        const val = answers[q.id];
        const isGroup = q.type === 'radio' || q.type === 'checkbox';

        return (
          <div key={q.id} className="flex flex-col gap-1.5">
            {!isGroup && q.type !== 'declaration' && (
              <label htmlFor={q.id} className={labelClass}>
                {q.label}
                {q.validation?.required && <span className="text-red-500 ml-1">*</span>}
              </label>
            )}
            {q.hint && !isGroup && <p className={hintClass}>{q.hint}</p>}

            {/* TEXT */}
            {q.type === 'text' && (
              <input
                id={q.id} type="text"
                placeholder={q.placeholder}
                aria-describedby={fieldError ? errorId : undefined}
                aria-invalid={!!fieldError}
                className={`${inputBase} ${fieldError ? inputError : inputNormal}`}
                value={typeof val === 'string' ? val : ''}
                onPaste={(e) => !allowPasting && e.preventDefault()}
                onChange={(e) => handleValueChange(q.id, e.target.value, q.validation, q.type)}
              />
            )}

            {/* EMAIL */}
            {q.type === 'email' && (
              <input
                id={q.id} type="email"
                placeholder={q.placeholder ?? 'e.g. name@example.com'}
                aria-describedby={fieldError ? errorId : undefined}
                aria-invalid={!!fieldError}
                className={`${inputBase} ${fieldError ? inputError : inputNormal}`}
                value={typeof val === 'string' ? val : ''}
                onPaste={(e) => !allowPasting && e.preventDefault()}
                onChange={(e) => handleValueChange(q.id, e.target.value, q.validation, q.type)}
              />
            )}

            {/* TEL */}
            {q.type === 'tel' && (
              <input
                id={q.id} type="tel"
                placeholder={q.placeholder ?? 'e.g. 0712 345 678'}
                aria-describedby={fieldError ? errorId : undefined}
                aria-invalid={!!fieldError}
                className={`${inputBase} ${fieldError ? inputError : inputNormal}`}
                value={typeof val === 'string' ? val : ''}
                onChange={(e) => handleValueChange(q.id, e.target.value, q.validation, q.type)}
              />
            )}

            {/* URL */}
            {q.type === 'url' && (
              <input
                id={q.id} type="url"
                placeholder={q.placeholder ?? 'e.g. https://yourportfolio.com'}
                aria-describedby={fieldError ? errorId : undefined}
                aria-invalid={!!fieldError}
                className={`${inputBase} ${fieldError ? inputError : inputNormal}`}
                value={typeof val === 'string' ? val : ''}
                onChange={(e) => handleValueChange(q.id, e.target.value, q.validation, q.type)}
              />
            )}

            {/* NUMBER */}
            {q.type === 'number' && (
              <div className="flex items-center gap-2">
                <input
                  id={q.id} type="number"
                  placeholder={q.placeholder}
                  min={Number(q.validation?.min)}
                  max={Number(q.validation?.max)}
                  step={q.step ?? 1}
                  aria-describedby={fieldError ? errorId : undefined}
                  aria-invalid={!!fieldError}
                  className={`${inputBase} ${fieldError ? inputError : inputNormal}`}
                  value={typeof val === 'string' ? val : ''}
                  onChange={(e) => handleValueChange(q.id, e.target.value, q.validation, q.type)}
                />
                {q.unit && <span className="text-sm text-gray-500 whitespace-nowrap">{q.unit}</span>}
              </div>
            )}

            {/* DATE */}
            {q.type === 'date' && (
              <input
                id={q.id} type="date"
                min={String(q.validation?.min ?? '')}
                max={String(q.validation?.max ?? '')}
                aria-describedby={fieldError ? errorId : undefined}
                aria-invalid={!!fieldError}
                className={`${inputBase} ${fieldError ? inputError : inputNormal}`}
                value={typeof val === 'string' ? val : ''}
                onChange={(e) => handleValueChange(q.id, e.target.value, q.validation, q.type)}
              />
            )}

            {/* TEXTAREA */}
            {q.type === 'textarea' && (
              <div className="relative">
                <textarea
                  id={q.id} rows={5}
                  placeholder={q.placeholder}
                  aria-describedby={fieldError ? errorId : undefined}
                  aria-invalid={!!fieldError}
                  className={`${inputBase} ${fieldError ? inputError : inputNormal}`}
                  value={typeof val === 'string' ? val : ''}
                  onPaste={(e) => !allowPasting && e.preventDefault()}
                  onChange={(e) => handleValueChange(q.id, e.target.value, q.validation, q.type)}
                />
                {q.validation?.maxLength && (
                  <p className="text-[10px] text-gray-400 text-right mt-0.5">
                    {typeof val === 'string' ? val.length : 0} / {q.validation.maxLength}
                  </p>
                )}
              </div>
            )}

            {/* SELECT */}
            {q.type === 'select' && (
              <select
                id={q.id}
                aria-describedby={fieldError ? errorId : undefined}
                aria-invalid={!!fieldError}
                className={`${inputBase} ${fieldError ? inputError : inputNormal}`}
                value={typeof val === 'string' ? val : ''}
                onChange={(e) => handleValueChange(q.id, e.target.value, q.validation, q.type)}
              >
                <option value="">SELECT AN OPTION...</option>
                {q.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            )}

            {/* FILE */}
            {q.type === 'file' && (
              <label
                htmlFor={q.id}
                className={`flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-sm cursor-pointer transition-all ${
                  fieldError
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-gray-50 hover:border-red-400 hover:bg-red-50'
                }`}
              >
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    {val instanceof File ? val.name : 'Click to upload or drag and drop'}
                  </p>
                  {q.validation?.accept && (
                    <p className="text-xs text-gray-400 mt-1">
                      Accepted: {q.validation.accept}
                      {q.validation.maxSizeMB && ` · Max ${q.validation.maxSizeMB}MB`}
                    </p>
                  )}
                </div>
                <input
                  id={q.id} type="file" className="hidden"
                  accept={q.validation?.accept}
                  aria-describedby={fieldError ? errorId : undefined}
                  aria-invalid={!!fieldError}
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    handleValueChange(q.id, file, q.validation, q.type);
                  }}
                />
              </label>
            )}

            {/* RANGE */}
            {q.type === 'range' && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <input
                    id={q.id} type="range"
                    min={Number(q.validation?.min ?? 0)}
                    max={Number(q.validation?.max ?? 100)}
                    step={q.step ?? 1}
                    className="w-full accent-red-600"
                    value={typeof val === 'string' ? val : String(q.validation?.min ?? 0)}
                    onChange={(e) => handleValueChange(q.id, e.target.value, q.validation, q.type)}
                  />
                  <span className="text-sm font-semibold text-gray-700 min-w-[3.5rem] text-right">
                    {typeof val === 'string' ? val : q.validation?.min ?? 0}
                    {q.unit ? ` ${q.unit}` : ''}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{q.validation?.min ?? 0}{q.unit ? ` ${q.unit}` : ''}</span>
                  <span>{q.validation?.max ?? 100}{q.unit ? ` ${q.unit}` : ''}</span>
                </div>
              </div>
            )}

            {/* RADIO & CHECKBOX */}
            {isGroup && (
              <fieldset className={`border p-3 sm:p-4 rounded-sm ${fieldError ? 'border-red-600' : 'border-gray-400'}`}>
                <legend className="px-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-700">
                  {q.label}
                  {q.validation?.required && <span className="text-red-500 ml-1">*</span>}
                </legend>
                {q.hint && <p className={`${hintClass} px-2 mb-2`}>{q.hint}</p>}
                <div className="space-y-3 mt-1">
                  {q.options?.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 text-sm font-medium cursor-pointer text-gray-800 touch-manipulation">
                      <input
                        type={q.type} name={q.id}
                        className="w-5 h-5 sm:w-4 sm:h-4 accent-red-600 cursor-pointer"
                        checked={q.type === 'radio' ? val === opt.value : Array.isArray(val) && val.includes(opt.value)}
                        onChange={(e) => {
                          let n: string | string[];
                          if (q.type === 'radio') {
                            n = opt.value;
                          } else {
                            const cur = Array.isArray(val) ? val : [];
                            n = e.target.checked
                              ? [...cur, opt.value]
                              : cur.filter((v) => v !== opt.value);
                          }
                          handleValueChange(q.id, n, q.validation, q.type);
                        }}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {/* DECLARATION */}
            {q.type === 'declaration' && (
              <label className="flex items-start gap-3 cursor-pointer touch-manipulation">
                <input
                  id={q.id} type="checkbox"
                  className="w-5 h-5 mt-0.5 accent-red-600 cursor-pointer shrink-0"
                  checked={Array.isArray(val) ? val.includes('agreed') : false}
                  onChange={(e) =>
                    handleValueChange(q.id, e.target.checked ? ['agreed'] : [], q.validation, q.type)
                  }
                />
                <span className="text-sm text-gray-700 leading-relaxed">
                  {q.label}
                  {q.validation?.required && <span className="text-red-500 ml-1">*</span>}
                </span>
              </label>
            )}

            {/* Error */}
            {fieldError && (
              <span id={errorId} role="alert" className="text-[10px] text-red-600 font-bold uppercase">
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