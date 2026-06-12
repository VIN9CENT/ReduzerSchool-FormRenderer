'use client';

import { useLandingTracking } from '@/hooks/useLandingTracking';
import { useScrollDepth } from '@/hooks/useScrollDepth';

import Image from 'next/image';
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
  { icon: Building2, label: 'Full-time in person' },
  { icon: Users, label: '30 seats' },
  { icon: Wallet, label: 'KSh 240,000/year' },
];

export default function HeroSection() {
  const { trackCTAClick } = useLandingTracking();
  useScrollDepth();
  return (
    <section
      id="home"
      className="relative isolate w-full overflow-hidden bg-gray-950 text-white"
    >
      <div className="absolute inset-y-0 left-0 -z-20 w-[167%]">
        <Image
          src="/images/IMG_5355.jpeg"
          alt="Reduzer School students learning software engineering together in Kisii"
          fill
          priority
          sizes="167vw"
          className="object-cover object-left"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/95 via-black/70 to-black/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/10 to-black/35" />

      <div className="mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-end px-6 pb-7 pt-28 md:px-8 md:pb-9 md:pt-32">
        <div className="max-w-4xl pb-8 md:pb-12">
          <h1
            className="w-full font-sans font-bold leading-[1.08] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)]"
            style={{ fontSize: 'clamp(2.15rem, 5.2vw, 4.75rem)' }}
          >
            Move beyond tutorials. Learn to build software real teams can trust.
          </h1>

          <p
            className="mt-6 max-w-3xl font-sans font-normal leading-[1.65] text-white/85"
            style={{ fontSize: 'clamp(1rem, 1.6vw, 1.25rem)' }}
          >
            A one-year, full-time software engineering programme for serious
            beginners who want product-quality skills: defining users, modelling
            data, building interfaces and APIs, checking security, deploying
            properly, measuring progress, and explaining decisions.
          </p>

          <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Link
              href="/apply"
              onClick={() => trackCTAClick('hero')}
              className="flex min-h-14 flex-row items-center justify-center gap-2 rounded-[8px] bg-red px-6 py-4 shadow-[0px_18px_35px_rgba(255,0,46,0.32)] transition-colors hover:bg-red/90 sm:w-auto md:px-8"
            >
              <span className="font-sans text-base font-semibold leading-6 text-white md:text-[18px]">
                Apply for September 2026
              </span>
              <ArrowRight size={18} className="text-white" />
            </Link>

            <Link
              href="/#fit"
              className="flex min-h-14 flex-row items-center justify-center gap-2 rounded-[8px] border border-white/40 bg-white/10 px-6 py-4 backdrop-blur-md transition-colors hover:border-white/70 hover:bg-white/15 sm:w-auto md:px-8"
            >
              <ArrowDown size={18} className="text-white" />
              <span className="font-sans text-base font-semibold leading-6 text-white md:text-[18px]">
                See if you fit
              </span>
            </Link>
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-2 border-t border-white/20 pt-4 md:grid-cols-4 md:gap-3 md:pt-5">
          {trustChips.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex min-h-14 items-center gap-2 rounded-[8px] border border-white/15 bg-black/25 px-3 py-3 text-[13px] font-semibold text-white backdrop-blur-md md:px-4 md:text-[14px]"
            >
              <Icon size={17} className="shrink-0 text-red" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
