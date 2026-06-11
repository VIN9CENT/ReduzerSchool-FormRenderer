'use client';

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: boolean;
}

export function TextInput({ value, onChange, placeholder, type = 'text', error }: Props) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-lg border text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:ring-2 focus:ring-red/20 ${
        error
          ? 'border-red-400 bg-red-50'
          : 'border-gray-200 bg-white hover:border-gray-300 focus:border-red'
      }`}
    />
  );
}
