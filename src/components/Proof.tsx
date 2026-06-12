'use client';
import {
  BarChart3,
  Check,
  FileText,
  GitPullRequest,
  Rocket,
  Scale,
  ShieldCheck,
} from 'lucide-react';

const outcomes = [
  {
    icon: FileText,
    title: 'Clear next step in tech',
    body: 'A clearer sense of where they fit next: front-end, back-end, data analysis, QA, or another product role. Students should know how to approach a new project, ask the right first questions, and start with a plan instead of feeling lost.',
  },
  {
    icon: BarChart3,
    title: 'Product thinking',
    body: 'Personas, user journeys, user stories, ERD diagrams, KPIs, and analytics events that show the student can define the work before writing code.',
  },
  {
    icon: Rocket,
    title: 'Working full-stack software',
    body: 'Interfaces, APIs, databases, authentication, validation, state, routing, and real user flows brought together in deployed applications.',
  },
  {
    icon: ShieldCheck,
    title: 'Production habits',
    body: 'Security checks, staging environments, environment variables, logs, migrations, deployment notes, and handover discipline.',
  },
  {
    icon: Scale,
    title: 'Compliance awareness',
    body: 'Basic privacy and compliance checks for user data, consent, cookie compliance, Kenya Data Protection Act expectations, and GDPR-aware product decisions.',
  },
  {
    icon: GitPullRequest,
    title: 'Engineering workflow',
    body: 'GitHub repositories, branches, pull requests, review comments, tests, documentation, fixes, and clear status updates.',
  },
];

export default function Proof() {
  return (
    <section
      id="outcomes"
      className="bg-white px-4 py-12 md:px-8 md:py-20 lg:px-16 font-[Inter,sans-serif]"
    >
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-red">
          What you leave with
        </p>

        <h2 className="mb-6 text-3xl font-bold leading-tight text-black md:text-4xl lg:text-5xl">
          Not just projects. A trail of product work.
        </h2>

        <p className="mb-10 text-base md:text-lg leading-relaxed text-gray-600">
          A strong student should be able to explain a product from first idea
          to deployment: who it is for, how the data is modelled, what user
          flows were built, how the system was secured, how it was deployed, and
          how privacy, consent, cookies, and user data were handled before and
          after feedback.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          {outcomes.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-6"
            >
              <div className="mb-4 inline-flex rounded-lg bg-red/5 p-3">
                <Icon className="h-5 w-5 text-red" strokeWidth={2} />
              </div>
              <h3 className="mb-3 text-lg font-bold text-gray-950">{title}</h3>
              <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                {body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-gray-900 p-6 md:p-8">
          <p className="flex items-start gap-3 text-base leading-relaxed text-gray-100 md:text-lg">
            <Check
              className="mt-1 h-5 w-5 shrink-0 text-red"
              strokeWidth={2.5}
            />
            <span>
              Students who meet the standard through residency and capstone work
              are considered for the Reduzer engineering pipeline.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
