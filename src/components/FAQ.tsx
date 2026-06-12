'use client';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useLandingTracking } from '@/hooks/useLandingTracking';

const faqs = [
  {
    id: 0,
    question: 'Is Reduzer School fully in person?',
    answer: [
      'Yes. The programme runs in person in Kisii, Monday to Friday, 8am to 5pm, for one year.',
      'The in-person structure helps instructors see blockers early, review work habits directly, and keep the cohort in a steady learning rhythm.',
    ],
  },
  {
    id: 1,
    question: 'Can I apply if I have no coding experience?',
    answer: [
      'Yes. Beginners can apply if full-time study fits their life and they are ready for a demanding year.',
      'The programme starts with Phase 0 and foundations: computing history, how modern computers work, Linux, Bash, SQL, Git, and the habits needed before application code.',
    ],
  },
  {
    id: 2,
    question: 'Can I work while studying?',
    answer: [
      'This is a full-time, in-person programme. Applicants should not rely on regular daytime work during the year.',
      'Any outside commitment must fit around attendance, workload, recovery time, and living costs.',
    ],
  },
  {
    id: 3,
    question: 'How much does the programme cost, and how is it paid?',
    answer: [
      'Total tuition is KSh 240,000. A KSh 60,000 deposit confirms your seat and counts toward the total tuition; it is not an extra fee.',
      'After the deposit, the remaining KSh 180,000 can be paid at KSh 20,000 per month for nine months.',
    ],
  },
  {
    id: 4,
    question: 'What extra costs should families plan for?',
    answer: [
      'Families should plan for accommodation, food, transport, a reliable laptop, internet or data, and personal living costs.',
      'The school is near Rongo University, so hostel options are available nearby and daily living costs are relatively lower than in major cities.',
    ],
  },
  {
    id: 5,
    question: 'Is accommodation provided?',
    answer: [
      'Accommodation is not provided by the school. Students arrange where they stay.',
      'The school is near Rongo University, where there are many hostel options. Admissions can share local guidance before enrolment.',
    ],
  },
  {
    id: 6,
    question: 'What laptop do I need?',
    answer: [
      'You need a reliable personal laptop that can run a modern browser, a code editor, local development tools, Docker, and basic project environments.',
      'The admissions team shares recommended specifications before enrolment.',
    ],
  },
  {
    id: 7,
    question: 'Who built the curriculum, and who runs the programme?',
    answer: [
      'The curriculum was built by respected Kenyan engineers for students learning in Kenya.',
      'Reduzer Technologies runs the programme from Kisii and brings the delivery habits its engineers use when working for or with global companies.',
    ],
  },
  {
    id: 8,
    question: 'How are parents or sponsors kept updated?',
    answer: [
      'Parents and sponsors receive monthly progress updates from the dedicated student success team.',
      'Updates may cover attendance, lessons completed, Code Labs, assessments, submissions, tests, deployments, feedback resolved, and instructor observations.',
      'The student success team may also call parents or sponsors occasionally when a conversation is more useful than a written update.',
    ],
  },
  {
    id: 9,
    question: 'What happens if I struggle and fall behind?',
    answer: [
      'The programme has attendance, progress, submission, review, and feedback guidelines designed to catch problems before a student falls too far behind.',
      'The serious gaps we have seen usually start with missed classes, missed submissions, or silence when a student is stuck.',
      'If that happens, instructors and the student success team help identify the gap and agree on a recovery path. The student still has to attend, communicate, and do the recovery work.',
    ],
  },
  {
    id: 10,
    question: 'Will I get a job at Reduzer when I finish?',
    answer: [
      'No employment is guaranteed. Reduzer School does not guarantee employment at Reduzer or anywhere else.',
      'Students who meet the required standard through residency and capstone work are considered for the Reduzer engineering pipeline, but entry is not promised upfront.',
    ],
  },
  {
    id: 11,
    question: 'How will graduate outcomes be reported?',
    answer: [
      'Placement claims will wait until graduate outcomes exist. The first cohort started in 2025 and graduates in August 2026.',
      'Outcomes will be reported by category, including full-time roles, internships, freelance work, continued study, Reduzer pipeline entry, and unverified outcomes.',
    ],
  },
  {
    id: 12,
    question: 'Why does the programme take one year?',
    answer: [
      'The year gives students time to build foundations, product thinking, engineering workflow, deployment discipline, communication habits, and a full-stack capstone.',
      'Students also use the year to understand where they fit next in tech, such as front-end, back-end, data analysis, QA, or another product role.',
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
      <div className="mb-3 text-center">
        <p className="mb-4 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-red">
          Questions
        </p>
        <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl">
          Common questions.
        </h2>
      </div>
      {faqs.map((faq) => (
        <button
          key={faq.id}
          onClick={() => toggleFaq(faq.id)}
          aria-expanded={activeId === faq.id}
          aria-controls={`faq-panel-${faq.id}`}
          className="flex flex-col gap-3 sm:gap-4 w-full max-w-3xl mx-auto shadow-none sm:shadow-3xl rounded-xl border border-black/5 transition-all duration-300 bg-faq-white-1 cursor-pointer p-3 text-left"
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
            <div className="px-4 pb-5 sm:px-5 sm:pb-6 flex flex-col gap-2 border-t border-gray-200 text-left">
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
