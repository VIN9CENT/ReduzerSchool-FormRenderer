
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
};

const requirements = [
  {
    icon: <Monitor size={28} aria-hidden="true" />,
    title: "Basic Computer",
    desc: "Access to a working computer",
  },
  {
    icon: <Laptop size={28} aria-hidden="true" />,
    title: "Laptop/Computer",
    desc: "Personal device recommended",
  },
  {
    icon: <Heart size={28} aria-hidden="true" />,
    title: "Passion For Learning",
    desc: "A drive to grow in technology",
  },
  {
    icon: <Clock size={28} aria-hidden="true" />,
    title: "Commitment",
    desc: "Dedicated time for learning",
  },
  {
    icon: <Users size={28} aria-hidden="true" />,
    title: "Teamwork",
    desc: "Collaborate with class peers",
  },
  {
    icon: <Code size={28} aria-hidden="true" />,
    title: "No Coding Needed",
    desc: "Beginners are welcome",
  },
];

const whoCanApply = [
  { num: "1", label: "High School Students" },
  { num: "2", label: "University Students" },
  { num: "3", label: "Fresh Graduates" },
  { num: "4", label: "Self-Taught Learners" },
  { num: "5", label: "Aspiring Developers" },
];

const steps = [
  {
    title: "Submit Application",
    desc: "Fill out the online form and tell us about yourself.",
  },
  {
    title: "Interview / Assessment",
    desc: "Attend a brief interview or skill check.",
  },
  {
    title: "Admission Decision",
    desc: "Receive your result within 3–5 business days.",
  },
  {
    title: "Confirm Enrollment",
    desc: "Pay fees and confirm your spot in the program.",
  },
];

export default function AdmissionsProcess() {
  return (
    <section
      id="apply"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >

      {/* HERO SECTION */}
      <section className="bg-white text-center py-20 px-6">

        <p
          className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] mb-3"
          style={{ color: BRAND.red }}
        >
          Admission Requirements
        </p>

        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-black mb-5">
          Start your journey to becoming a <br />
          <span style={{ color: BRAND.red }}>
            Software Engineer
          </span>
        </h2>

        <p className="text-sm md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed mb-8">
          We welcome motivated learners ready to learn,
          build projects, and grow their careers in tech.
        </p>

        <a
          href="#curriculum"
          className="inline-block text-sm md:text-base font-semibold px-8 py-3 rounded-xl text-white transition hover:opacity-90"
          style={{ backgroundColor: BRAND.red }}
        >
          View Curriculum
        </a>

      </section>

      {/* WHAT YOU'LL NEED */}
      <section className="bg-gray-50 py-20 px-6">

        <h3 className="text-center text-2xl md:text-4xl font-bold text-black mb-14">
          What you&apos;ll need
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {requirements.map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 p-8 min-h-[210px] bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition"
            >

              
              <div style={{ color: BRAND.red }}>
                {item.icon}
              </div>

              <h4 className="font-semibold text-xl text-black">
                {item.title}
              </h4>

              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

      </section>

      {/* WHO CAN APPLY */}
      <section className="bg-white py-20 px-6">

        <h3 className="text-center text-2xl md:text-4xl font-bold text-black mb-14">
          Who can apply?
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-5 max-w-6xl mx-auto">

          {whoCanApply.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center border border-gray-200 rounded-2xl p-6 min-h-[170px] shadow-sm hover:shadow-md transition"
            >

              <span
                className="text-3xl md:text-4xl font-bold"
                style={{ color: BRAND.red }}
                aria-hidden="true"
              >
                {item.num}
              </span>

              <p className="text-sm md:text-base text-gray-700 text-center mt-3 leading-snug font-medium">
                {item.label}
              </p>

            </div>
          ))}

        </div>

      </section>

      {/* APPLICATION PROCESS */}
      <section className="bg-gray-50 py-20 px-6">

        <h3 className="text-center text-2xl md:text-4xl font-bold text-black mb-14">
          Application Process
        </h3>

        <ol className="relative max-w-3xl mx-auto">

          {steps.map((step, i) => (
            <li
              key={i}
              className="flex gap-5 mb-10 items-start"
            >
              <div className="flex flex-col items-center self-stretch">

                <div
                  className="w-10 h-10 rounded-full text-white flex items-center justify-center font-semibold text-sm shrink-0"
                  style={{ backgroundColor: BRAND.red }}
                  aria-hidden="true"
                >
                  {i + 1}
                </div>

                {i < steps.length - 1 && (
                  <div
                    className="w-0.5 flex-1 mt-2 rounded-full"
                    style={{ backgroundColor: "#fca5a5" }}
                  />
                )}

              </div>

              {/* CONTENT */}
              <div className="pt-1 pb-4">

                <h4 className="font-semibold text-lg md:text-xl text-black mb-2">
                  {step.title}
                </h4>

                <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                  {step.desc}
                </p>

              </div>

            </li>
          ))}

        </ol>

      </section>

      {/* FOOTER CTA */}
      <section
        className="text-white text-center py-20 px-6"
        style={{ backgroundColor: BRAND.red }}
      >

        <h3 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
          Ready to build your future?
        </h3>

        <p className="text-sm md:text-lg max-w-xl mx-auto leading-relaxed opacity-90 mb-8">
          Join our program and start your journey into
          technology today.
        </p>

        <a
          href="https://your-application-form-link.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm md:text-base font-bold px-10 py-3 rounded-xl transition hover:opacity-90"
          style={{
            backgroundColor: BRAND.black,
            color: "white",
          }}
          aria-label="Apply Now - opens in new tab"
        >
          APPLY NOW
        </a>

      </section>

    </section>
   
  );
}