// components/Testimonials.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Amos Ogutu',
    cohort: 'Software Engineering · 2025',
    initials: 'AO',
    avatar: null,
    quote:
      'The one-year course was practical, easy to follow, and the instructors were with me every step of the way. I gained real programming skills, grew in confidence, and left ready to solve real-world problems. Reduzer School is the place to be if you are serious about software engineering.',
  },
  {
    name: 'Dorah Momanyi',
    cohort: 'Software Engineering · 2025',
    initials: 'DM',
    avatar: null,
    quote:
      'Being among the first students at Reduzer was transformative. Through hands-on projects and strong mentorship, I built full-stack applications, sharpened my problem-solving, and walked out with the confidence and skills employers actually want. I highly recommend it to anyone serious about a career in tech.',
  },
  {
    name: 'Vincent Ochieng',
    cohort: 'Software Engineering · 2025',
    initials: 'VO',
    avatar: null,
    quote:
      'Before Reduzer I was stuck in tutorial hell, unsure which skills actually mattered. The mentorship and focus on core concepts completely changed how I think as a developer. I came out with stronger problem-solving skills, real confidence, and a clear path forward in tech.',
  },
  {
    name: 'Gilbert Tallam',
    cohort: 'Software Engineering · 2025',
    initials: 'GT',
    avatar: null,
    quote:
      'Reduzer gave me the structure, mentorship, and hands-on projects I needed to level up fast. The community is genuinely supportive and the learning approach is built for the real world, not just theory. If you want to accelerate your journey into tech, this is where you start.',
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
        <p className="max-w-140 text-lg leading-relaxed text-[#565E74]">
          Hear directly from those who&rsquo;ve made the leap from learner to
          professional.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative flex w-full max-w-4xl items-center justify-center">
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
            <div className="relative flex h-26 w-26 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#f5f5f5] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
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

            <p className="max-w-160 text-center text-lg italic leading-relaxed tracking-[-0.2px] text-[#5C647A]">
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