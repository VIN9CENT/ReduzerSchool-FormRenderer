import { Eye, PhoneCall, ShieldCheck, Wallet } from 'lucide-react';

const assurances = [
  {
    icon: Eye,
    title: 'Parents and sponsors receive monthly progress updates.',
    body: 'The update shows how the student is doing through lessons completed, Code Labs attempted and passed, assessments, project submissions, tests, deployments, feedback resolved, and instructor observation.',
  },
  {
    icon: ShieldCheck,
    title: 'Problems should be seen early.',
    body: 'If a student starts falling behind, the goal is to notice while the gap is still small enough to address. Support is real, but the student still has to own the recovery.',
  },
  {
    icon: Wallet,
    title: 'The money decision should be clear.',
    body: 'Total tuition is KSh 240,000 for the year. A KSh 60,000 deposit confirms the seat and counts toward the total, leaving KSh 180,000 to be paid across the remaining months.',
  },
  {
    icon: PhoneCall,
    title: 'Sponsors need a human contact point.',
    body: 'Parents, guardians, employers, county partners, NGOs, and diaspora sponsors can contact admissions before making a funding decision.',
  },
];

export default function ParentsSponsors() {
  return (
    <section
      id="parents"
      className="bg-white px-4 py-12 md:px-8 md:py-20 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.3fr] lg:items-start">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-red md:text-sm">
              Parents and sponsors
            </p>
            <h2 className="text-3xl font-bold leading-tight text-black md:text-4xl lg:text-5xl">
              A year of study is a family and funding decision.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-600 md:text-lg">
              The people paying for the year need clarity as much as the student
              applying. They need to see whether the year will be visible,
              structured, and worth the commitment.
            </p>
          </div>

          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {assurances.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="grid gap-4 py-6 sm:grid-cols-[2.5rem_1fr]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red/5">
                  <Icon className="h-5 w-5 text-red" strokeWidth={2.4} />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold leading-snug text-gray-950">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-lg bg-gray-950 p-6 text-white md:p-8">
          <p className="text-base font-semibold leading-relaxed md:text-lg">
            Admissions contact: +254 769 267 965 · hello@school.reduzer.tech
          </p>
          <p className="mt-2 text-sm leading-relaxed text-gray-300 md:text-base">
            Use this for sponsor questions, payment planning, and practical
            questions about the Kisii commitment.
          </p>
        </div>
      </div>
    </section>
  );
}
