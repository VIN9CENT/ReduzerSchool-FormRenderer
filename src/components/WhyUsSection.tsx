'use client';
import { Eye, ShieldCheck, Clock3, MessageSquare, Bot, ClipboardList } from 'lucide-react';

const standards = [
  {
    icon: ClipboardList,
    title: 'Product decisions must be clear.',
    body: 'Students learn to define the persona, map the user journey, write user stories, model the data, choose KPIs, and explain why the work should exist before they build it.',
  },
  {
    icon: Eye,
    title: 'Work must be visible.',
    body: 'Students learn to plan work, show progress, close out tasks, and raise blockers early. Reduzer expects the same visibility from engineers working on real delivery.',
  },
  {
    icon: ShieldCheck,
    title: 'Code must be safe and deployable.',
    body: 'Work is checked for structure, edge cases, security, tests, environment setup, staging readiness, and whether another developer can understand and continue it.',
  },
  {
    icon: Clock3,
    title: 'Delivery must be predictable.',
    body: 'Students practise estimating work, finishing what they commit to, handling carry-over, and communicating delays before the deadline is missed.',
  },
  {
    icon: MessageSquare,
    title: 'Handover is part of the work.',
    body: 'Reduzer engineers are expected to give clear updates, ask specific questions, explain blockers, document decisions, and hand work over without leaving the next person guessing.',
  },
  {
    icon: Bot,
    title: 'Reduzer tools support the standard.',
    body: 'The LMS, Code Labs, Reduzer AI, visible tests, saved drafts, and progress tracking help students practise the habits Reduzer expects in delivery.',
  },
];

export default function WhyUsSection() {
  return (
    <section
      id="standards"
      className="relative bg-gray-50 px-4 py-12 md:px-8 md:py-20 lg:px-16 font-[Inter,sans-serif]"
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 md:mb-16">
          <p className="mb-4 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-red">
            Why Reduzer runs this
          </p>
          <h2 className="text-3xl font-bold leading-tight text-black md:text-4xl lg:text-5xl">
            Students train against the same product and engineering standards
            Reduzer uses in delivery.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
            Reduzer Technologies runs managed engineering delivery from Kisii.
            Our engineers work inside client workflows for global companies,
            and Reduzer stays responsible for daily visibility, review, QA,
            escalation, continuity, and handover. The programme is run with one
            question in mind: what must a beginner be able to do before Reduzer
            can trust them with client work?
          </p>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
            We know what real teams notice: unclear requirements, weak user
            flows, poor data models, stale tickets, unsafe deployments, missing
            security checks, vague updates, and work that needs too much rework.
            Students train against those expectations from the start.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {standards.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md md:p-8"
            >
              <div className="mb-5 inline-flex rounded-lg bg-red/5 p-3">
                <Icon className="h-6 w-6 text-red" strokeWidth={2} />
              </div>

              <h3 className="mb-3 text-xl font-bold leading-snug text-gray-900">
                {title}
              </h3>

              <p className="leading-relaxed text-gray-600">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
