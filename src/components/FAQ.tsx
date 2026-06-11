'use client';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useLandingTracking } from '@/hooks/useLandingTracking';

const faqs = [
  {
    id: 0,
    question: 'Is this fully in person?',
    answer: [
      'Yes. In person, Monday to Friday, 8am to 5pm, in Kisii. The programme has one delivery mode: on-site learning with the cohort.',
      'Being in the room matters because instructors can see blockers early, review habits directly, and keep the cohort moving together.',
      'This intake requires the full Kisii commitment.',
    ],
  },
  {
    id: 1,
    question: 'I have no coding experience. Can I still apply?',
    answer: [
      'Yes. The year starts before application code: computer architecture, binary, memory, Linux, Bash, SQL, and Git.',
      'In admissions we pay attention to how you think, how you communicate, and what you have taught yourself before. Drive matters more than a head start.',
    ],
  },
  {
    id: 2,
    question: 'What is the LMS and how does Reduzer AI work?',
    answer: [
      'Reduzer School runs on its own LMS. Inside lessons, Reduzer AI helps you get unstuck: highlight a sentence, ask a question, and keep that thread attached to the topic.',
      'Code Labs run on a real editor with visible test cases, autosaved progress, and saved drafts. Submissions can include code, product decisions, tests, deployment work, and review notes. AI can help explain and flag issues. Instructors still decide whether the work passes.',
    ],
  },
  {
    id: 3,
    question: 'Will I get a job at Reduzer when I finish?',
    answer: [
      'Maybe. Students who clear the Single Sprint Residencies and capstone at the standard we set are considered for the Reduzer engineering pipeline.',
      'That path is earned through the work itself. It is never promised upfront.',
      'Outside the Reduzer pipeline, you still leave with product work, coached communication, deployment habits, a full-stack capstone, and relationships built through Reduzer partners and client-facing opportunities.',
    ],
  },
  {
    id: 4,
    question: 'Can I work part-time while studying?',
    answer: [
      'This is a full-time programme, full working days, five days a week. Students who try to combine it with employment consistently fall behind and leave early. We’d rather say this clearly upfront than take the seat.',
    ],
  },
  {
    id: 5,
    question: 'Why does this take longer than a short bootcamp?',
    answer: [
      'Because the things that make a new engineer useful take time: understanding users, modelling data, writing code, testing, debugging, checking security, deploying properly, communicating clearly, and improving work after feedback.',
      'A shorter programme can introduce syntax. Reduzer School gives students time to build product habits beyond exercises.',
    ],
  },
  {
    id: 6,
    question: 'What happens if I struggle and fall behind?',
    answer: [
      'Progress is visible through lessons, Code Labs, assessments, product plans, project submissions, tests, deployments, review comments, and instructor observation. If you start to drift, we want to catch it while the gap is still small.',
      'You still have to own the recovery. We can support early, while the work remains yours.',
    ],
  },
  {
    id: 7,
    question: 'What if I don’t meet the standard at the end?',
    answer: [
      'You still leave with the real software you built and a clear account of where you stand.',
      'That is useful because it tells you what to work on next. If the gap is something you can close, you can reapply for a future cohort.',
    ],
  },
  {
    id: 8,
    question: 'Why is the programme in person?',
    answer: [
      'Beginners need structure before they can handle freedom. Online learning offers flexibility before most people have the habits to use it well.',
      'In person, instructors can see when you are stuck, and you learn to raise blockers before they become missed deadlines. That habit is hard to build alone.',
    ],
  },
  {
    id: 9,
    question: 'Why Kisii?',
    answer: [
      'The programme runs in Nyamarambe, Kisii because the year needs focus. Nairobi is expensive, loud, and hard to stay consistent in. Long commutes and daily survival pressure take energy away from learning.',
      'Kisii gives students a lower-cost, quieter environment where full-time study is more realistic. Students from the first cohort told us they would have been more distracted if the programme had been online.',
      'Being together also changes the student dynamic: classmates see each other struggle, recover, ask questions, and keep showing up. That kind of rhythm is difficult to create alone.',
    ],
  },
  {
    id: 10,
    question: 'How does this compare to a university degree?',
    answer: [
      'A degree gives you time, theory, and formal recognition, and that can be valuable. Reduzer School focuses on delivery environment habits.',
      'Many people study software for years and still leave without the habits a working engineering team expects on Monday morning: clear product thinking, visible progress, safe code, useful communication, tested work, and deployment discipline.',
      'If you want a traditional academic qualification, choose that. If you want a practical year focused on real software engineering work, that is what Reduzer School is for.',
    ],
  },
  {
    id: 11,
    question: 'How does this compare to a short bootcamp?',
    answer: [
      'Short programmes can be useful for exposure. They help you find out whether coding interests you at all.',
      'Reduzer School is for the next question: can you define, build, secure, deploy, measure, and explain work the way a real product team expects?',
    ],
  },
  {
    id: 12,
    question: 'Are internships counted as job placements?',
    answer: [
      'Internships are reported separately from full-time placements. When our first cohort graduates, we will report outcomes with clear definitions.',
      'Full-time roles, internships, freelance work, continued study, Reduzer pipeline entry, and unverified outcomes will be reported separately.',
    ],
  },
  {
    id: 13,
    question: 'What laptop do I need?',
    answer: [
      'A reliable personal laptop that can run a modern browser, a code editor, local development tools, Docker, and basic project environments.',
      'The admissions team shares recommended specifications before enrolment.',
    ],
  },
  {
    id: 14,
    question: 'Do parents or sponsors receive progress updates?',
    answer: [
      'Yes. The admissions team explains the update rhythm before enrolment.',
      'Progress is visible in lessons completed, assessments passed, product plans submitted, tests run, deployments checked, feedback resolved, and instructor feedback throughout the year.',
    ],
  },
  {
    id: 15,
    question: 'Is accommodation provided?',
    answer: [
      'Not at the moment. Students arrange where they stay, and the admissions team can share local guidance before enrolment.',
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
