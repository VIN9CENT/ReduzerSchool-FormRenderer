'use client';

interface Props {
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
}

export function RadioGroup({ name, options, value, onChange, error }: Props) {
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
                ? 'border-red bg-red/5'
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
                selected ? 'border-red' : 'border-gray-300'
              }`}
            >
              {selected && <span className="w-2 h-2 rounded-full bg-red block" />}
            </span>
            <span className={`text-sm font-medium ${selected ? 'text-red' : 'text-gray-700'}`}>
              {opt}
            </span>
          </label>
        );
      })}
    </div>
  );
}
