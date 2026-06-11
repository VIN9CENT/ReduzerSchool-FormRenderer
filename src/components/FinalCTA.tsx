'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLandingTracking } from '@/hooks/useLandingTracking';

export default function FinalCTA() {
  const { trackCTAClick } = useLandingTracking();

  return (
    <section
      id="apply"
      className="bg-white px-4 py-12 md:px-8 md:py-20 lg:px-16 font-[Inter,sans-serif]"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-red">
          Apply
        </p>

        <h2 className="mb-8 text-3xl font-bold leading-tight text-black md:text-4xl lg:text-5xl">
          Apply for the September 2026 cohort.
        </h2>

        <div className="mb-10 flex flex-col gap-5 text-base md:text-lg leading-relaxed text-gray-600">
          <p>The September 2026 cohort has 30 seats. Applications are open.</p>
          <p>
            Tell us who you are, what you have tried to learn or build, and why
            this programme fits your life now. We read every application and
            respond within 3 to 5 business days, with a clear decision and a
            reason.
          </p>
          <p>The application takes about 15 minutes.</p>
        </div>

        <Link
          href="/apply"
          onClick={() => trackCTAClick('final-cta')}
          className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-red px-10 py-5 font-semibold text-white shadow-[0px_10px_15px_-3px_rgba(255,0,46,0.2),0px_4px_6px_-4px_rgba(255,0,46,0.2)] transition-colors hover:bg-red/90 text-lg"
        >
          Apply for September 2026
          <ArrowRight size={18} />
        </Link>

        <p className="mt-8 text-sm md:text-base text-gray-500">
          +254 769 267 965 · hello@school.reduzer.tech · Kisii
        </p>
      </div>
    </section>
  );
}
