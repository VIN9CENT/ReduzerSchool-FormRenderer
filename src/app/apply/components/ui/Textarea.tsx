'use client';

interface Props {
  value: string;
  onChange: (v: string) => void;
  onPaste?: () => void;
  placeholder?: string;
  rows?: number;
  error?: boolean;
}

export function Textarea({ value, onChange, onPaste, placeholder, rows = 4, error }: Props) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onPaste={onPaste}
      placeholder={placeholder}
      rows={rows}
      className={`w-full px-4 py-3 rounded-lg border text-sm text-gray-900 placeholder-gray-400 outline-none resize-none transition-colors focus:ring-2 focus:ring-red/20 ${
        error
          ? 'border-red-400 bg-red-50'
          : 'border-gray-200 bg-white hover:border-gray-300 focus:border-red'
      }`}
    />
  );
}
