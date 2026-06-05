'use client';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useLandingTracking } from '@/hooks/useLandingTracking';

const faqs = [
  {
    id: 0,
    question: 'What is Reduzer School?',
    answer: [
      'Reduzer School is a rigorous, one-year, fully in-person software engineering bootcamp based in Kisii, Kenya.',
      'We train ambitious Kenyans from complete beginners to career changers in Frontend, Backend, and Fullstack software development using industry-standard technologies.',
      'Our program is built and run by the same team behind Reduzer Technologies, a company already placing Kenyan engineers with global companies.',
    ],
  },
  {
    id: 1,
    question: 'What makes Reduzer School different from other programs?',
    answer: [
      'We are fully in-person, not online or hybrid. We run for a full 52 weeks.',
      'We are based in Kisii. We include real client project work not just classroom exercises.',
      'We are built by a company already operating at the standard we train you to reach.',
    ],
  },
  {
    id: 2,
    question: 'Is the program online, hybrid, or in-person?',
    answer: [
      'The program is a face - to - face training(onsite) based in Kisii, Kenya.',
    ],
  },
  {
    id: 3,
    question: 'What technologies will I learn?',
    answer: [
      'JavaScript, TypeScript, React, and Node.js, frontend, backend, and full-stack engineering using the exact tools global companies are actively hiring for right now.',
      'You will also learn Git and version control, database management, REST API development, application deployment, and cloud basics.',
    ],
  },

  {
    id: 4,
    question: 'Will I work on real projects?',
    answer: [
      'Yes, and this is one of the things that sets Reduzer apart. In months nine to eleven, you will work on real projects with real Reduzer partner clients. Real briefs, real deadlines, real engineering experience before you graduate.',
    ],
  },
  {
    id: 5,
    question: 'Will I get a job after graduating?',
    answer: [
      'We provide structured career support, portfolio review, CV and LinkedIn optimization, technical interview preparation, and access to opportunities through the Reduzer Technologies network.',
      'What we promise is that if you commit fully to the year, you will graduate as a real engineer with a real portfolio. That is what employers are looking for.',
    ],
  },
  {
    id: 6,
    question: 'Can I work remotely with global companies after graduating?',
    answer: [
      'Yes, that is the standard we are training you to reach. Reduzer Technologies already places Kenyan engineers with companies in Europe. The curriculum and project work at Reduzer School are designed to produce engineers who can compete at that level.',
    ],
  },
  {
    id: 7,
    question: 'What are the requirements to join?',
    answer: [
      'Applicants may be high school graduates, university students, dropouts, or graduates who are serious about building a career in software engineering.',
      'Students should have confident English communication skills, basic computer literacy, a reliable personal laptop, the ability to commit 40 hours per week for 12 months, financial readiness for the Ksh 240,000 annual fee, and a strong personal motivation to pursue tech.',
    ],
  },
];
export default function FAQ() {
  const { trackFAQClick } = useLandingTracking();
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
      const faq = faqs.find((f) => f.id === id);
      if (faq) trackFAQClick(faq.question);
    }
  };

  return (
    <section
      id="faq"
      className="flex flex-col gap-8 bg-faq-white opacity-95 text-black py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
    >
      <h2 className="mb-3 text-center font-extrabold text-3xl sm:text-4xl lg:text-5xl">
        Frequently Asked Questions
      </h2>
      {faqs.map((faq) => (
        <button
          key={faq.id}
          onClick={() => toggleFaq(faq.id)}
          aria-expanded={activeId === faq.id}
          aria-controls={`faq-panel-${faq.id}`}
          className="flex flex-col gap-3 sm:gap-4 w-full max-w-3xl mx-auto shadow-none sm:shadow-3xl rounded-xl border border-black/5 transition-all duration-300 bg-faq-white-1 cursor-pointer p-3"
        >
          <div className="flex justify-between items-center gap-4 p-4 sm:p-5">
            <h2 className="font-bold text-[14px] sm:text-[16px]">
              {faq.question}
            </h2>
            <span className="shrink-0">
              {activeId === faq.id ? (
                <ChevronUp color="var(--color-red)" size={24} />
              ) : (
                <ChevronDown color="var(--color-red)" size={24} />
              )}
            </span>
          </div>
          {activeId === faq.id && (
            <div className="px-4 pb-5 sm:px-5 sm:pb-6 flex flex-col gap-2 border-t border-gray-200">
              {faq.answer.map((p, index) => (
                <p
                  key={index}
                  className="text-sm sm:text-base leading-7 text-gray-700"
                >
                  {p}
                </p>
              ))}
            </div>
          )}
        </button>
      ))}
    </section>
  );
}
