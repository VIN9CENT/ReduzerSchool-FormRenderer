'use client';

import { Check } from 'lucide-react';
import { STEPS } from '../../formTypes';

export function StepIndicator({ current }: { current: number }) {
  return (
    <>
      {/* Mobile */}
      <div className="flex items-center justify-between mb-8 sm:hidden">
        <p className="text-sm font-semibold text-gray-700">
          Step {current} of {STEPS.length}
        </p>
        <p className="text-sm font-semibold text-red">{STEPS[current - 1]}</p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-8 sm:hidden">
        <div
          className="bg-red h-1.5 rounded-full transition-all duration-300"
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
                      ? 'bg-red text-white'
                      : active
                        ? 'bg-red text-white ring-4 ring-red/20'
                        : 'bg-white border-2 border-gray-200 text-gray-400'
                  }`}
                >
                  {done ? <Check size={16} strokeWidth={3} /> : step}
                </div>
                <span
                  className={`text-[11px] font-semibold whitespace-nowrap ${
                    active ? 'text-red' : done ? 'text-gray-500' : 'text-gray-400'
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-2 mb-5 rounded-full transition-colors ${
                    step < current ? 'bg-red' : 'bg-gray-200'
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
