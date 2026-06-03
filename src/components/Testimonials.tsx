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
      'My time at Reduzer School has been both rewarding and informative, enabling me to build strong programming skills and gain practical software engineering knowledge. The supportive instructors and hands-on training have improved my problem-solving abilities, confidence, and professional growth through various projects. Although I am still completing the course, I would highly recommend Reduzer School to anyone pursuing a career in software engineering.',
  },
  {
    name: 'Dorah Momanyi',
    cohort: 'Software Engineering · 2025',
    initials: 'DM',
    avatar: null,
    quote:
      'Being among the first students at Reduzer School has been an important part of my tech journey. Through hands-on projects, mentorship, and practical learning, I have been developing my frontend and backend development skills while gaining experience building real-world applications. The program has improved my problem-solving abilities, boosted my confidence, and deepened my understanding of software development. I highly recommend Reduzer School to anyone serious about learning technology and growing as a developer.',
  },
  {
    name: 'Vincent Ochieng',
    cohort: 'Software Engineering · 2025',
    initials: 'VO',
    avatar: null,
    quote:
  'Before joining Reduzer, I often felt unsure about which skills to focus on and how to move beyond tutorials. The mentorship, practical guidance, and emphasis on understanding core concepts helped me develop stronger problem-solving skills and think more like a software engineer. The experience gave me greater confidence in my abilities and a clearer path for my growth in tech. I highly recommend Reduzer to anyone serious about building a strong foundation and advancing their career in software development.',
},
  {
    name: 'Gilbert Tallam',
    cohort: 'Software Engineering · 2025',
    initials: 'GT',
    avatar: null,
    quote:
      'Reduzer School gave me the structure, mentorship, and hands-on experience I needed to grow as a developer. The real-world projects, supportive community, and practical approach to learning helped me gain confidence and improve my technical skills. I would highly recommend the bootcamp to anyone looking to accelerate their journey into tech.',
  },
{
    name: 'Levi Monda',
    cohort: 'Software Engineering · 2025',
    initials: 'LM',
    avatar: null,
    quote:
      'Before joining Reduzer, I had the passion to build a career in technology but lacked the practical experience and confidence needed to compete in the industry. Reduzer changed that completely. Through challenging real-world projects, mentorship, and collaboration with talented peers, I gained hands-on experience that transformed the way I learn and solve problems. The program pushed me beyond my comfort zone, teaching me not only technical skills but also discipline, teamwork, communication, and adaptability. Every task felt like working in a real professional environment, preparing me for the expectations of the tech industry. Today, I am a more confident developer, a stronger problem solver, and a more career-ready professional. Reduzer has been more than a learning program and a launchpad for my growth and future success.'}

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