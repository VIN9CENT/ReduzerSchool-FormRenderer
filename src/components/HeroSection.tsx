'use client';

import { useLandingTracking } from '@/hooks/useLandingTracking';
import { useScrollDepth } from '@/hooks/useScrollDepth';

import Link from 'next/link';
import {
  Calendar,
  Building2,
  Wallet,
  Users,
  ArrowRight,
  ArrowDown,
} from 'lucide-react';

const trustChips = [
  { icon: Calendar, label: 'September 2026' },
  { icon: Building2, label: 'In person in Kisii' },
  { icon: Users, label: '30 seats' },
  { icon: Wallet, label: 'KSh 20,000/month' },
];

export default function HeroSection() {
  const { trackCTAClick } = useLandingTracking();
  useScrollDepth();
  return (
    <section id="home" className="relative w-full overflow-hidden bg-[#F7F9FB]">
      <div className="hidden md:block absolute pointer-events-none rounded-full w-[394.53px] h-[518.25px] -left-[139px] top-[399px] bg-[rgba(255,56,60,0.32)] blur-[105px] -rotate-[112.15deg]" />
      <div className="hidden md:block absolute pointer-events-none rounded-full w-[394.53px] h-[518.25px] left-[1400px] top-[119px] bg-[rgba(255,56,60,0.37)] blur-[105px] -rotate-[112.15deg]" />

      <div className="relative flex flex-col items-center px-6 pt-12 md:pt-24 pb-16 gap-10">
        <div className="flex flex-col items-center gap-6 w-full max-w-[820px]">
          <p className="font-sans font-semibold text-[13px] leading-[1.4] tracking-[1.2px] text-center uppercase text-[#565E74]">
            Reduzer School · One-year programme · Kisii
          </p>

          <h1
            className="font-sans font-bold leading-[1.2] tracking-[-0.03em] text-center text-[#191C1E] w-full"
            style={{ fontSize: 'clamp(1.875rem, 4.8vw, 3.75rem)' }}
          >
            Learn software by building products to the{' '}
            <span className="text-red underline italic">
              Reduzer engineering standard
            </span>
            .
          </h1>

          <p
            className="font-sans font-normal leading-[1.6] tracking-[-0.01em] text-center text-[#5F3E3C] max-w-[600px] mt-4"
            style={{ fontSize: 'clamp(1rem, 1.6vw, 1.25rem)' }}
          >
            A full-time, in-person software engineering programme for students
            who want to move beyond tutorials into product-quality work.
            Students choose one language track and learn to define users, model
            data, build interfaces and APIs, check security, deploy properly,
            measure KPIs, and explain the work.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 w-full max-w-[900px]">
          {trustChips.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-[13px] md:text-[14px] font-medium text-[#191C1E] shadow-sm"
            >
              <Icon size={16} className="text-red" />
              {label}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full mt-2">
          <Link
            href="/apply"
            onClick={() => trackCTAClick('hero')}
            className="flex flex-row justify-center items-center gap-2 w-full sm:w-auto rounded-[8px] bg-red px-8 py-[17px] shadow-[0px_10px_15px_-3px_rgba(255,0,46,0.2),0px_4px_6px_-4px_rgba(255,0,46,0.2)] hover:bg-red/90 transition-colors"
          >
            <span className="font-sans font-semibold text-[18px] leading-[28px] tracking-[1px] text-center text-white">
              Apply for September 2026
            </span>
            <ArrowRight size={16} className="text-white" />
          </Link>

          <Link
            href="/#fit"
            className="flex flex-row justify-center items-center gap-2 w-full sm:w-auto rounded-[8px] border border-gray-300 bg-white px-8 py-[17px] hover:border-red transition-colors"
          >
            <ArrowDown size={16} className="text-[#191C1E]" />
            <span className="font-sans font-semibold text-[18px] leading-[28px] tracking-[1px] text-center text-[#191C1E]">
              See if you fit
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
