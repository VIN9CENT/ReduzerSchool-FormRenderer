// src/components/AdmissionsProcess.tsx

import { Monitor, Laptop, Heart, Clock, Users, Code } from 'lucide-react';

const BRAND = {
  red: '#FF002E',
  black: '#000000',
  // Logo URLs
  logoLight: 'https://brand-assets.reduzer.tech/horizontal/white/reduzer.png', // for white/light bg
  logoDark:
    'https://brand-assets.reduzer.tech/horizontal/transparent/reduzer.png', // for dark/red bg
  logoIcon: 'https://brand-assets.reduzer.tech/primary/transparent/reduzer.png', // icon only
};

const requirements = [
  {
    icon: <Monitor size={24} />,
    title: 'Basic Computer',
    desc: 'Access to a working computer',
  },
  {
    icon: <Laptop size={24} />,
    title: 'Laptop/Computer',
    desc: 'Personal device recommended',
  },
  {
    icon: <Heart size={24} />,
    title: 'Passion For Learning',
    desc: 'A drive to grow in',
  },
  {
    icon: <Clock size={24} />,
    title: 'Commitment',
    desc: 'Dedicated time for learning',
  },
  {
    icon: <Users size={24} />,
    title: 'Teamwork',
    desc: 'Collaborate with class peers',
  },
  {
    icon: <Code size={24} />,
    title: 'No Coding Needed',
    desc: 'Beginners are welcome',
  },
];

const whoCanApply = [
  { num: '1', label: 'High School Students' },
  { num: '2', label: 'University Students' },
  { num: '3', label: 'Fresh Graduates' },
  { num: '4', label: 'Self-Taught Learners' },
  { num: '5', label: 'Aspiring Developers' },
];

const steps = [
  {
    title: 'Submit Application',
    desc: 'Fill out the online form and tell us about yourself.',
  },
  {
    title: 'Interview / Assessment',
    desc: 'Attend a brief interview or skill check.',
  },
  {
    title: 'Admission Decision',
    desc: 'Receive your result within 3–5 business days.',
  },
  {
    title: 'Confirm Enrollment',
    desc: 'Pay fees and confirm your spot in the program.',
  },
];

export default function AdmissionsProcess() {
  return (
    <section id="admission" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ── HERO ── white background → use light logo (black wordmark) */}
      <div className="bg-white text-center py-16 px-6">
        <p
          className="text-sm font-semibold uppercase tracking-widest mb-2"
          style={{ color: BRAND.red }}
        >
          Admission Requirements
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-4">
          Start your journey to becoming a <br />
          <span style={{ color: BRAND.red }}>Software Engineer</span>
        </h2>
        <p className="text-gray-500 max-w-md mx-auto mb-8 font-normal">
          We welcome motivated learners ready to push their projects and grow
          their careers in tech.
        </p>
        <button
          className="font-semibold px-8 py-3 rounded text-white transition hover:opacity-90"
          style={{ backgroundColor: BRAND.red }}
        >
          View Carriculum
        </button>
      </div>

      {/* ── WHAT YOU'LL NEED ── light gray bg */}
      <div className="bg-gray-50 py-16 px-6">
        <h3 className="text-center text-2xl font-bold text-black mb-10">
          What you&apos;ll need
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {requirements.map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 p-5 bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div style={{ color: BRAND.red }}>{item.icon}</div>
              <h4 className="font-semibold text-black text-sm">{item.title}</h4>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHO CAN APPLY ── white bg */}
      <div className="bg-white py-16 px-6">
        <h3 className="text-center text-2xl font-bold text-black mb-10">
          Who can apply?
        </h3>
        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          {whoCanApply.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center border rounded-xl p-6 w-36 shadow-sm"
              style={{ borderColor: '#e5e7eb' }}
            >
              <span
                className="text-3xl font-extrabold"
                style={{ color: BRAND.red }}
              >
                {item.num}
              </span>
              <p className="text-gray-700 text-sm text-center mt-2 font-medium">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── APPLICATION PROCESS ── light gray bg */}
      <div className="bg-gray-50 py-16 px-6">
        <h3 className="text-center text-2xl font-bold text-black mb-10">
          Application Process
        </h3>
        <div className="relative max-w-xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 mb-8 items-start">
              {/* Timeline dot + connector line */}
              <div className="flex flex-col items-center">
                <div
                  className="w-9 h-9 rounded-full text-white flex items-center justify-center font-bold text-sm shrink-0"
                  style={{ backgroundColor: BRAND.red }}
                >
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="w-0.5 h-10 mt-1"
                    style={{ backgroundColor: '#fca5a5' }}
                  />
                )}
              </div>
              {/* Step text */}
              <div className="pt-1">
                <h4 className="font-semibold text-black">{step.title}</h4>
                <p className="text-gray-500 text-sm mt-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER CTA ── brand red bg → use dark/transparent logo (white wordmark) */}
      <div
        className="text-white text-center py-14 px-6"
        style={{ backgroundColor: BRAND.red }}
      >
        <h3 className="text-2xl md:text-3xl font-extrabold mb-3">
          Ready to build your future?
        </h3>
        <p className="mb-8 max-w-md mx-auto font-normal opacity-90">
          Join our program and start your journey into tech today.
        </p>
        <button
          className="font-bold px-8 py-3 rounded transition hover:opacity-90"
          style={{ backgroundColor: BRAND.black, color: 'white' }}
        >
          APPLY NOW
        </button>
      </div>
    </section>
  );
}
