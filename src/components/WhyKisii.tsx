'use client';

import { Home, Wallet, WifiOff } from 'lucide-react';

const reasons = [
  {
    icon: Wallet,
    title: 'Lower daily pressure',
    body: 'Kisii keeps the cost of the programme more realistic. The school is near Rongo University, where affordable hostels are easier to find, and daily costs like food and movement are lower than Nairobi-level pressure.',
  },
  {
    icon: WifiOff,
    title: 'Fewer distractions',
    body: 'The first cohort told us they would have been more distracted if the programme was online. Being in one place, away from the usual noise, helped them stay with difficult work long enough to improve.',
  },
  {
    icon: Home,
    title: 'A better learning rhythm',
    body: 'The campus routine gives students structure: show up, work, ask for help, receive feedback, fix the work, and return the next day. That rhythm is hard to build alone.',
  },
];

export default function WhyKisii() {
  return (
    <section
      id="why-kisii"
      className="bg-gray-50 px-4 py-12 md:px-8 md:py-20 lg:px-16 font-[Inter,sans-serif]"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-red">
            Why Kisii
          </p>
          <h2 className="mb-6 text-3xl font-bold leading-tight text-black md:text-4xl lg:text-5xl">
            The location is part of the learning design.
          </h2>
          <p className="text-base leading-relaxed text-gray-600 md:text-lg">
            Reduzer School runs in Nyamarambe, Kisii because the programme needs
            focus. The goal is to give students a serious place to do difficult
            work every day without the cost, commute, and noise that can break
            consistency before the habits are built.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {reasons.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
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
      </div>
    </section>
  );
}
