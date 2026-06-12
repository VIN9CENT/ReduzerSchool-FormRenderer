import { BarChart3, Building2, ShieldCheck, Users } from 'lucide-react';

const trustPoints = [
  {
    icon: Building2,
    title: 'Built by Kenyan engineers',
    body: 'The curriculum was built by respected Kenyan engineers for students learning in Kenya. Reduzer Technologies runs the programme from Kisii and brings delivery habits its engineers use when working for or with global companies.',
  },
  {
    icon: Users,
    title: 'First cohort in progress',
    body: 'The 2025 cohort graduates in August 2026. Placement claims will wait until graduate outcomes exist.',
  },
  {
    icon: ShieldCheck,
    title: 'Outcomes reported clearly',
    body: 'Graduate outcomes will be reported by category, so placements, further training, freelance work, and other outcomes can be understood separately.',
  },
  {
    icon: BarChart3,
    title: 'Progress sponsors can see',
    body: 'Progress is tracked through lessons, Code Labs, assessments, submissions, reviews, deployments, and instructor feedback. Parents and sponsors receive monthly updates on student progress.',
  },
];

export default function TrustSnapshot() {
  return (
    <section
      id="trust"
      aria-label="Programme facts"
      className="bg-gray-950 px-4 py-10 text-white md:px-8 md:py-14 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-red md:text-sm">
          Programme facts
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
    </section>
  );
}
