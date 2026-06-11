import Link from 'next/link';
import { Check } from 'lucide-react';

export function SuccessScreen() {
  return (
    <div className="flex flex-col items-center text-center py-12 px-6">
      <div className="w-16 h-16 rounded-full bg-red flex items-center justify-center mb-6">
        <Check size={32} strokeWidth={3} className="text-white" />
      </div>
      <h2 className="text-2xl font-bold text-[#191C1E] mb-3">Application submitted!</h2>
      <p className="text-gray-500 max-w-sm leading-relaxed mb-8">
        We will read it and get back to you within 3 to 5 business days with a
        clear yes or no and the reason behind it.
      </p>
      <Link
        href="/"
        className="text-sm font-semibold text-red underline underline-offset-2 hover:opacity-75 transition-opacity"
      >
        Back to home
      </Link>
    </div>
  );
}
