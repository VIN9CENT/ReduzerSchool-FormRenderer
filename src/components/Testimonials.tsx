// components/Testimonials.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Alex',
    cohort: 'Software Engineering · 2026',
    initials: 'A',
    avatar: null,
    quote:
      "Reduzer School didn't just teach me new syntax, it reshaped how I think about systems. The rigour of the curriculum and direct mentorship from industry experts gave me the confidence to lead architectural shifts at my company.",
  },
  {
    name: 'Priya',
    cohort: 'Product Design · 2025',
    initials: 'P',
    avatar: null,
    quote:
      'The hands-on projects were the real differentiator. I shipped three production apps before graduation. Employers noticed immediately, I had my offer within two weeks of the programme ending.',
  },
  {
    name: 'Daniel',
    cohort: 'Data Engineering · 2026',
    initials: 'D',
    avatar: null,
    quote:
      "I came in knowing almost nothing. I left with a job at a fintech startup and a salary I didn't think was possible this early. The structure and accountability at Reduzer is unlike any bootcamp I've seen.",
  },
  {
    name: 'Amara',
    cohort: 'Software Engineering · 2025',
    initials: 'A',
    avatar: null,
    quote:
      "The mentors don't just answer your questions, they challenge how you're thinking. That shift in mindset is what I use every single day at work.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((i) => (i + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="flex flex-col items-center gap-12 bg-white px-6 py-20">
      {/* Heading */}
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-[-1.44px] text-[#191C1E] sm:text-5xl">
          What our students say
        </h2>
        <p className="max-w-[560px] text-lg leading-relaxed text-[#565E74]">
          Hear directly from those who&rsquo;ve made the leap from learner to
          professional.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative flex w-full max-w-[896px] items-center justify-center">
        {/* Prev */}
        <button
          onClick={prev}
          className="absolute -left-16 hidden h-12 w-12 items-center justify-center rounded-full border border-[#EABCB8]/50 bg-white text-[#565E74] transition hover:border-[#BB001F] hover:text-[#BB001F] sm:flex"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Card */}
        <div className="relative w-full rounded-xl border border-[#EABCB8]/20 bg-white px-8 pb-16 pt-20 shadow-[0px_20px_50px_rgba(0,0,0,0.04),0px_4px_10px_rgba(0,0,0,0.02)]">
          {/* Avatar */}
          <div className="absolute -top-13 left-1/2 -translate-x-1/2">
            <div className="relative flex h-[104px] w-[104px] items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#f5f5f5] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
              {t.avatar ? (
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-[#BB001F]">
                  {t.initials}
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-2xl font-semibold tracking-[-0.48px] text-[#191C1E]">
                {t.name}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[1.2px] text-[#BB001F]">
                {t.cohort}
              </span>
            </div>

            <p className="max-w-[640px] text-center text-lg italic leading-relaxed tracking-[-0.2px] text-[#5C647A]">
              &ldquo;{t.quote}&rdquo;
            </p>
          </div>
        </div>

        {/* Next */}
        <button
          onClick={next}
          className="absolute -right-16 hidden h-12 w-12 items-center justify-center rounded-full border border-[#EABCB8]/50 bg-white text-[#565E74] transition hover:border-[#BB001F] hover:text-[#BB001F] sm:flex"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots + mobile nav */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={prev}
          className="flex sm:hidden h-10 w-10 items-center justify-center rounded-full border border-[#EABCB8]/50 bg-white text-[#565E74] transition hover:border-[#BB001F] hover:text-[#BB001F]"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === current ? 'w-10 bg-[#BB001F]' : 'w-2 bg-[#EABCB8]'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          className="flex sm:hidden h-10 w-10 items-center justify-center rounded-full border border-[#EABCB8]/50 bg-white text-[#565E74] transition hover:border-[#BB001F] hover:text-[#BB001F]"
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
