'use client';

import { AlertCircle } from 'lucide-react';

interface Props {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FieldWrapper({ label, hint, error, required, children }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-800">
        {label}
        {required && <span className="text-red ml-0.5">*</span>}
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
