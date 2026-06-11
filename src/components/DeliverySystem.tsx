'use client';
import {
  Check,
  ClipboardList,
  Code2,
  Database,
  Rocket,
  ShieldCheck,
} from 'lucide-react';

const workflow = [
  {
    icon: ClipboardList,
    title: 'Shape the task',
    body: 'Define the persona, user journey, user story, acceptance criteria, and the KPI the feature is meant to affect.',
  },
  {
    icon: Database,
    title: 'Design the system',
    body: 'Plan the ERD, API contract, UI states, validation rules, analytics events, and security checks before implementation.',
  },
  {
    icon: Code2,
    title: 'Build the feature',
    body: 'Implement the interface, API, database changes, tests, documentation, and instrumentation in a branch that can be reviewed.',
  },
  {
    icon: ShieldCheck,
    title: 'Check before handoff',
    body: 'Run tests, handle edge cases, check auth and input validation, deploy to staging, inspect logs, and confirm the user flow works.',
  },
  {
    icon: Rocket,
    title: 'Review, fix, and hand over',
    body: 'Respond to AI-assisted and human review notes, fix what comes back, update docs, and leave deployment or handover notes.',
  },
];

export default function DeliverySystem() {
  return (
    <section
      id="how-it-works"
      className="bg-gray-50 px-4 py-12 md:px-8 md:py-20 lg:px-16 font-[Inter,sans-serif]"
    >
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-red">
          How training works
        </p>

        <h2 className="mb-8 text-3xl font-bold leading-tight text-black md:text-4xl lg:text-5xl">
          Students move work through a delivery system.
        </h2>

        <div className="mb-10 flex flex-col gap-6 text-base leading-relaxed text-gray-600 md:text-lg">
          <p>
            Reduzer School runs on its own LMS, Code Labs, Reduzer AI, visible
            tests, saved drafts, assessments, project submissions, and
            instructor review. The system is designed to make progress visible
            before a student drifts too far.
          </p>
          <p>
            Students learn to move work the way a product team would: from a
            clear brief, through product and technical decisions, into code,
            checks, staging, review, fixes, and handover.
          </p>
          <p>Here is what one student task can look like.</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
          <div className="border-b border-gray-100 bg-gray-900 px-6 py-5 text-white">
            <p className="font-mono text-sm md:text-base font-semibold">
              Product task · Customer dashboard onboarding flow · #128
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Goal: help a new customer understand account setup progress and
              reduce support questions.
            </p>
          </div>

          <div className="flex flex-col gap-5 p-6 md:p-8">
            {workflow.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-xl bg-gray-50 p-5">
                <p className="mb-1 flex items-center gap-2 text-sm font-bold text-gray-900">
                  <Icon size={18} className="text-red" /> {title}
                </p>
                <p className="text-sm md:text-base leading-relaxed text-gray-600">
                  {body}
                </p>
              </div>
            ))}

            <div className="flex items-center gap-2 rounded-xl border border-red/20 bg-red/5 p-5">
              <Check size={18} className="text-red" />
              <span className="text-sm md:text-base font-bold text-red">
                Status: ready for staging review and handoff.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
