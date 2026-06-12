'use client';
import {
  Brain,
  Check,
  Clock3,
  Laptop,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Wallet,
  X,
} from 'lucide-react';

const nonNegotiables = [
  {
    icon: Clock3,
    title: 'You can give the year full-time attention.',
    body: 'The programme runs in person, every working day, 8am to 5pm in Kisii. It is designed around full working days in the classroom.',
  },
  {
    icon: Wallet,
    title: 'You have a realistic funding plan.',
    body: 'You need a realistic way to cover the fee and your living costs for the year. This may come from family, a sponsor, savings, an employer, a county partner, or an NGO. Because classes run every working day from 8am to 5pm, applicants should not rely on regular daytime work to fund the year.',
  },
  {
    icon: MapPin,
    title: 'You can make Kisii work practically.',
    body: 'The school is near Rongo University, where there are many hostel options and the cost of living is relatively low. You still need a practical plan for where you will stay, how you will get to class daily, and how you will attend consistently through demanding periods of the programme.',
  },
  {
    icon: Laptop,
    title: 'You have the basic tools to participate.',
    body: 'You need a reliable personal laptop and enough computer literacy to manage files, use a browser, write emails, and follow setup instructions.',
  },
];

const strongSignals = [
  {
    icon: ShieldCheck,
    title: 'Persistence through difficult learning',
    body: 'You have tried to learn something difficult before, struggled with it, returned to it, and improved over time.',
  },
  {
    icon: Brain,
    title: 'Patient use of AI',
    body: 'You are willing to learn how and when to use AI. You can use it as support while still doing the hard thinking, debugging, explaining, and decision-making yourself.',
  },
  {
    icon: MessageSquare,
    title: 'Clear communication',
    body: 'You can read and write clearly in English, ask specific questions, explain what you tried, respond to direct feedback, and keep participating.',
  },
  {
    icon: Check,
    title: 'Respect for the full product process',
    body: 'You are willing to think about the user, the data, the workflow, and the business goal before writing code.',
  },
];

const notFits = [
  'You want a certificate more than the quality of the work behind it.',
  'You need a guaranteed job outcome before applying. Reduzer School does not guarantee employment.',
  'You can only give this evenings, weekends, or whatever time is left after work.',
  'Your plan for fees and daily living costs is not yet realistic enough to protect your study time.',
  'You want AI to replace your thinking instead of supporting your learning.',
  'You only want guided tutorial projects, rather than learning the habits needed for real product work.',
  'You would rather go quiet than communicate consistently when you are stuck.',
];

export default function WhoThisIsFor() {
  return (
    <section
      id="fit"
      className="bg-white px-4 py-12 md:px-8 md:py-20 lg:px-16 font-[Inter,sans-serif]"
    >
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-red">
          Fit and readiness
        </p>

        <h2 className="mb-6 text-3xl font-bold leading-tight text-black md:text-4xl lg:text-5xl">
          Beginners can apply if full-time study fits their life.
        </h2>

        <p className="mb-12 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
          Strong applicants can be new to software engineering. What matters is
          practical readiness: a full-time year, a workable funding and living
          plan, steady participation, and willingness to learn real product
          engineering habits.
        </p>

        <div className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-950">
            What must be in place before you start
          </h3>
          <div className="grid gap-5 md:grid-cols-2">
            {nonNegotiables.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-lg border border-gray-200 bg-gray-50 p-6"
              >
                <Icon className="mb-4 h-5 w-5 text-red" strokeWidth={2.4} />
                <h4 className="mb-3 text-lg font-bold leading-snug text-gray-950">
                  {title}
                </h4>
                <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <h3 className="mb-6 text-xl font-bold text-gray-950">
              Signals we look for
            </h3>
            <div className="divide-y divide-gray-200 border-y border-gray-200">
              {strongSignals.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="grid gap-4 py-5 sm:grid-cols-[2rem_1fr]"
                >
                  <Icon className="mt-1 h-5 w-5 text-red" strokeWidth={2.4} />
                  <div>
                    <h4 className="mb-1 text-base font-bold text-gray-950">
                      {title}
                    </h4>
                    <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-lg border border-gray-200 bg-gray-950 p-6 text-white md:p-8">
            <h3 className="mb-6 text-xl font-bold">
              It may be better to wait if:
            </h3>
            <ul className="flex flex-col gap-4">
              {notFits.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X
                    className="mt-0.5 h-5 w-5 shrink-0 text-red"
                    strokeWidth={2.5}
                  />
                  <span className="text-sm leading-relaxed text-gray-200 md:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <p className="mt-10 text-base md:text-lg leading-relaxed text-gray-600">
          This programme asks for a specific kind of commitment. We would rather
          help applicants see that clearly before enrolment than ask anyone to
          commit a year before the practical readiness is in place.
        </p>
      </div>
    </section>
  );
}
