import Link from 'next/link';

export default function PricingSection() {
  return (
    <section className="w-full min-h-screen bg-white/95 backdrop-blur-sm rounded-[25px] overflow-hidden font-['Inter']">
      {/* Banner */}
      <div className="w-full bg-[#d92b2b] text-center py-4 px-4 shadow-sm rounded-t-[25px]">
        <span className="text-white font-black text-sm md:text-base tracking-widest uppercase">
          Limited Spots · Enroll Now
        </span>
      </div>

      {/* Main Wrapper */}
      <div className="w-full px-6 py-12 md:px-12 lg:px-24 xl:px-32">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 text-center">
            <h2 className="font-bold text-[#111] text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
              Investment in Your{" "}
              <span className="text-[#d92b2b] italic">
                Software Engineering
              </span>{" "}
              Career
            </h2>
          </div>

          {/* Description Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 text-center">
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              This program is designed as a serious, structured pathway into
              software engineering, with practical training, mentorship, and
              career support over 12 months.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 flex flex-col items-center text-center gap-4 hover:shadow-lg transition-all duration-300">
            <span className="bg-[#d92b2b] text-white text-sm font-black tracking-widest uppercase px-8 py-2 rounded-full shadow-sm">
              Best Plan
            </span>

            <h3 className="font-black text-[#d92b2b] text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-wide leading-tight">
              Monthly Plan
            </h3>

            <p className="text-base md:text-lg text-[#111]">
              KSh <strong className="font-bold">20,000</strong> / MONTH
            </p>
          </div>

          {/* Total Cost Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 text-center">
            <p className="text-base md:text-lg text-[#111] leading-relaxed">
              KSh <strong className="font-bold">240,000</strong> total covers
              the full 12-month program.
            </p>
          </div>

          {/* Features Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
            <h4 className="font-black text-[#111] text-base md:text-lg mb-6 uppercase tracking-wide">
              This Covers:
            </h4>

            <ol className="list-decimal pl-6 flex flex-col gap-4">
              <li className="text-base md:text-lg text-gray-600 leading-snug">
                Full 12-month training program
              </li>
              <li className="text-base md:text-lg text-gray-600 leading-snug">
                Instructor-led sessions
              </li>
              <li className="text-base md:text-lg text-gray-600 leading-snug">
                Hands-on project work
              </li>
              <li className="text-base md:text-lg text-gray-600 leading-snug">
                Mentorship and guidance
              </li>
              <li className="text-base md:text-lg text-gray-600 leading-snug">
                Career preparation support
              </li>
              <li className="text-base md:text-lg text-gray-600 leading-snug">
                Portfolio development
              </li>
            </ol>
          </div>

          {/* CTA Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
            <Link
              href="#apply"
              className="w-full block text-center bg-[#d92b2b] hover:bg-[#b81f1f] active:scale-[0.98] text-white font-black text-base md:text-lg tracking-widest uppercase py-5 rounded-xl shadow-md transition-all duration-200"
            >
              Apply Now
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}