// src/components/AdmissionsProcess.tsx

import {
  Monitor,
  Laptop,
  Heart,
  Clock,
  Users,
  Code,
} from "lucide-react";

const BRAND = {
  red: "#FF002E",
  black: "#000000",
  logoLight: "https://brand-assets.reduzer.tech/horizontal/white/reduzer.png",
  logoDark: "https://brand-assets.reduzer.tech/horizontal/transparent/reduzer.png",
  logoIcon: "https://brand-assets.reduzer.tech/primary/transparent/reduzer.png",
};

const requirements = [
  { icon: <Monitor size={22} />, title: "Basic Computer", desc: "Access to a working computer" },
  { icon: <Laptop size={22} />, title: "Laptop/Computer", desc: "Personal device recommended" },
  { icon: <Heart size={22} />, title: "Passion For Learning", desc: "A drive to grow in technology" },
  { icon: <Clock size={22} />, title: "Commitment", desc: "Dedicated time for learning" },
  { icon: <Users size={22} />, title: "Teamwork", desc: "Collaborate with class peers" },
  { icon: <Code size={22} />, title: "No Coding Needed", desc: "Beginners are welcome" },
];

const whoCanApply = [
  { num: "1", label: "High School Students" },
  { num: "2", label: "University Students" },
  { num: "3", label: "Fresh Graduates" },
  { num: "4", label: "Self-Taught Learners" },
  { num: "5", label: "Aspiring Developers" },
];

const steps = [
  { title: "Submit Application", desc: "Fill out the online form and tell us about yourself." },
  { title: "Interview / Assessment", desc: "Attend a brief interview or skill check." },
  { title: "Admission Decision", desc: "Receive your result within 3–5 business days." },
  { title: "Confirm Enrollment", desc: "Pay fees and confirm your spot in the program." },
];

export default function AdmissionsProcess() {
  return (
    <section id="admissions">

      {/* HERO */}
      <div>
        <p>Admission Requirements</p>
        <h2>Start your journey to becoming a Software Engineer</h2>
        <p>We welcome motivated learners ready to push their projects and grow their careers in tech.</p>
        <button>View Curriculum</button>
      </div>

      {/* WHAT YOU'LL NEED */}
      <div>
        <h3>What you&apos;ll need</h3>
        <div>
          {requirements.map((item, i) => (
            <div key={i}>
              <div>{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WHO CAN APPLY */}
      <div>
        <h3>Who can apply?</h3>
        <div>
          {whoCanApply.map((item, i) => (
            <div key={i}>
              <span>{item.num}</span>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* APPLICATION PROCESS */}
      <div>
        <h3>Application Process</h3>
        <div>
          {steps.map((step, i) => (
            <div key={i}>
              <div>{i + 1}</div>
              <div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER CTA */}
      <div>
        <h3>Ready to build your future?</h3>
        <p>Join our program and start your journey into tech today.</p>
        <button>APPLY NOW</button>
      </div>

    </section>
  );
}