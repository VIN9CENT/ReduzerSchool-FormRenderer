// Hero section component for the landing page, showcasing the main headline, subheadline, call-to-action buttons, and key features of the bootcamp program. The design includes decorative background elements and is fully responsive for optimal display on various screen sizes.

import Link from 'next/link';
import {
  Code2,
  GraduationCap,
  Briefcase,
  Clock,
  ArrowRight,
} from 'lucide-react';

const features = [
  { icon: Code2, label: 'Hands-on learning' },
  { icon: GraduationCap, label: 'Industry Expert Mentors' },
  { icon: Briefcase, label: 'Career support & placement' },
  { icon: Clock, label: 'Full-Time Learning' },
];

export default function HeroSection() {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-[#F7F9FB]">
      {/* Decorative Background Blobs */}
      <div className="hidden md:block absolute pointer-events-none rounded-full w-[394.53px] h-[518.25px] -left-[139px] top-[399px] bg-[rgba(255,56,60,0.32)] blur-[105px] -rotate-[112.15deg]" />
      <div className="hidden md:block absolute pointer-events-none rounded-full w-[394.53px] h-[518.25px] left-[1400px] top-[119px] bg-[rgba(255,56,60,0.37)] blur-[105px] -rotate-[112.15deg]" />

      {/* Above-fold: fills the viewport, content centred vertically */}
      <div className="relative flex flex-col items-center justify-start min-h-[calc(100vh-80px)] px-6 pt-12 md:pt-24 pb-10">
        <div className="flex flex-col items-center gap-6 w-full max-w-[760px]">
          {/* Heading — clamp scales smoothly across all screen widths */}
          <h1
            className="font-sans font-bold leading-[1.2] tracking-[-0.03em] text-center text-[#191C1E] w-full"
            style={{ fontSize: 'clamp(1.875rem, 5vw, 4rem)' }}
          >
            Launch Your{' '}
            <span className="text-[#BB001F] underline italic">Career</span> in
            Tech With Our Intensive 12-Month Bootcamp
          </h1>

          {/* Subtitle */}
          <p
            className="font-sans font-normal leading-[1.6] tracking-[-0.01em] text-center text-[#5F3E3C] max-w-[520px] mt-10"
            style={{ fontSize: 'clamp(1rem, 1.6vw, 1.25rem)' }}
          >
            Hands-on training, mentorship, and real-world projects built for
            ambitious learners ready to break into tech.
          </p>

          {/* Intake label */}
          <p className="font-sans font-semibold text-[13px] leading-[12px] tracking-[1.2px] text-center uppercase text-[#565E74] mt-10">
            Apply for September Intake
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-[30px] w-full mt-2">
            <Link
              href="#apply"
              className="flex flex-row justify-center items-center gap-2 w-full sm:w-auto rounded-[8px] bg-[#BB001F] px-8 py-[17px] shadow-[0px_10px_15px_-3px_rgba(187,0,31,0.2),0px_4px_6px_-4px_rgba(187,0,31,0.2)] hover:bg-[#a0001a] transition-colors"
            >
              <span className="font-sans font-semibold text-[18px] leading-[28px] tracking-[1.8px] text-center text-white">
                Apply Now
              </span>
              <ArrowRight size={16} className="text-white" />
            </Link>

            <Link
              href="#curriculum"
              className="flex flex-col justify-center items-center w-full sm:w-auto rounded-[8px] border border-[#FF383C] py-4 px-8 hover:bg-[#FF383C]/5 transition-colors"
            >
              <span className="font-sans font-semibold text-[18px] leading-[28px] tracking-[1.8px] text-center text-[#BB001F]">
                View Curriculum
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Feature grid — sits below the fold, scrolls into view */}
      <div className="relative px-6 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 justify-items-center max-w-[896px] mx-auto">
          {features.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-4">
              <div className="flex justify-center items-center w-12 h-12 bg-[#ECEEF0] rounded-full">
                <Icon size={20} color="#BB001F" />
              </div>
              <span className="font-sans font-semibold text-[15px] leading-[20px] tracking-[0.6px] text-center text-[#191C1E]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
