'use client';
import { T } from '@/lib/theme';

const steps = [
  {
    title: 'You apply.',
    desc: 'The application takes about 15 minutes. Tell us who you are, why this programme matters, and what you have already tried to learn or build on your own. We read every application ourselves.',
  },
  {
    title: 'You interview and sit an assessment.',
    desc: 'The interview and assessment help us understand how you think, how you communicate, how you reason through unclear work, and how you respond when something is difficult at first.',
  },
  {
    title: 'We answer within 3 to 5 business days.',
    desc: 'A clear yes or a clear no. If the answer is no, we tell you why, because a reason is more useful than silence.',
  },
  {
    title: 'You confirm your seat and arrange payment.',
    desc: 'A KSh 60,000 deposit confirms your seat and counts toward the total tuition. The remaining balance is structured before enrolment, so the cost is clear before the year starts.',
  },
];

export default function AdmissionsProcess() {
  return (
    <section
      id="admissions"
      className="bg-gray-50 px-4 py-12 md:px-8 md:py-20 lg:px-16"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-red">
          Admissions
        </p>

        <h2 className="mb-12 text-3xl font-bold leading-tight text-black md:text-4xl lg:text-5xl">
          Getting in starts with how you think.
        </h2>

        <ol className="relative mb-14">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-5 items-start">
              <div className="flex flex-col items-center self-stretch">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                  style={{ backgroundColor: T.red }}
                  aria-hidden="true"
                >
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="mt-2 w-0.5 flex-1 rounded-full"
                    style={{ backgroundColor: T.pink3 }}
                  />
                )}
              </div>

              <div className="pb-10 pt-1">
                <h3 className="mb-2 text-lg md:text-xl font-semibold text-black">
                  Step {i + 1}: {step.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-gray-600">
                  {step.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
