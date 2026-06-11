import { BarChart3, Building2, ShieldCheck, Users } from 'lucide-react';

const trustPoints = [
  {
    icon: Building2,
    title: 'Built by Reduzer Technologies',
    body: 'The school is tied to the delivery habits Reduzer expects from engineers working on real product work from Kisii.',
  },
  {
    icon: Users,
    title: 'First cohort in progress',
    body: 'The 2025 cohort graduates in August 2026. Placement claims will wait until graduate outcomes exist.',
  },
  {
    icon: ShieldCheck,
    title: 'Transparent outcomes policy',
    body: 'Graduate outcomes will be reported by category instead of being blended into one inflated placement number.',
  },
  {
    icon: BarChart3,
    title: 'Visible progress',
    body: 'Progress is tracked through lessons, Code Labs, assessments, submissions, reviews, deployments, and instructor feedback.',
  },
];

export default function TrustSnapshot() {
  return (
    <section
      id="trust"
      className="bg-gray-950 px-4 py-12 text-white md:px-8 md:py-16 lg:px-16"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.6fr] lg:items-start">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-red md:text-sm">
            Trust snapshot
          </p>
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            Serious claims need visible proof.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-300 md:text-lg">
            Before asking for a year of focus, Reduzer School is clear about who
            built it, what is already happening, the limits of what is promised,
            and how progress is seen during the year.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {trustPoints.map(({ icon: Icon, title, body }) => (
            <div key={title} className="border-t border-white/15 pt-5">
              <Icon className="mb-4 h-5 w-5 text-red" strokeWidth={2.4} />
              <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-gray-300 md:text-base">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
