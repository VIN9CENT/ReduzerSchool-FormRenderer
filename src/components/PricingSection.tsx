'use client';
import Link from 'next/link';
import { useLandingTracking } from '@/hooks/useLandingTracking';

export default function PricingSection() {
  const { trackCTAClick } = useLandingTracking();
  return (
    <section
      id="pricing"
      className="w-full min-h-screen bg-white/95 backdrop-blur-sm overflow-hidden font-sans"
    >
      {/* Banner */}
      <div className="w-full bg-[#d92b2b] text-center py-7 px-4 shadow-sm">
        <span className="text-white font-black text-sm md:text-base tracking-widest uppercase">
          Limited Spots - Enroll Now
        </span>
      </div>

      {/* Main Wrapper */}
      <div className="w-full px-6 py-12 md:px-12 lg:px-24 xl:px-32">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header Text */}
          <div className="text-center space-y-6">
            <h2 className="font-bold text-[#111] text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
              Investment in Your{' '}
              <span className="text-[#d92b2b]">Software Engineering</span>{' '}
              Career
            </h2>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              This program is designed as a serious, structured pathway into
              software engineering, with practical training, mentorship, and
              career support over 12 months.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 flex flex-col items-center text-center gap-6">
            <span className="bg-[#d92b2b] text-white text-sm font-black tracking-widest uppercase px-8 py-2 rounded-full shadow-sm">
              Best Plan
            </span>

            <h3 className="font-black text-[#d92b2b] text-xl sm:text-2xl md:text-3xl uppercase tracking-wide leading-tight">
              Pricing Plan
            </h3>

            {/* Inner Cards */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Monthly Value Card */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
                <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">
                  Monthly Payment
                </p>
                <h4 className="text-2xl md:text-3xl font-black text-[#d92b2b]">
                  KSh 20,000
                </h4>
                <p className="text-sm text-gray-600 mt-1">Per Month</p>
              </div>

              {/* Total Cost Card */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
                <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">
                  Total Cost
                </p>
                <h4 className="text-2xl md:text-3xl font-black text-[#d92b2b]">
                  KSh 240,000
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Full 12-month program
                </p>
              </div>
            </div>
          </div>

          {/* Features Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
            <h4 className="font-black text-[#d92b2b] text-base md:text-lg mb-6 uppercase tracking-wide">
              This Covers:
            </h4>

            <ol className="list-decimal pl-6 flex flex-col gap-4">
              <li className="text-base md:text-lg text-gray-600">
                Full 12-month training program
              </li>
              <li className="text-base md:text-lg text-gray-600">
                Instructor-led sessions
              </li>
              <li className="text-base md:text-lg text-gray-600">
                Hands-on project work
              </li>
              <li className="text-base md:text-lg text-gray-600">
                Mentorship and guidance
              </li>
              <li className="text-base md:text-lg text-gray-600">
                Career preparation support
              </li>
              <li className="text-base md:text-lg text-gray-600">
                Portfolio development
              </li>
            </ol>
          </div>

          {/* CTA */}
          <div className="p-6 md:p-8">
            <Link
              href="/apply"
              onClick={() => trackCTAClick('pricing')}
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
