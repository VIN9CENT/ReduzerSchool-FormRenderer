import Link from 'next/link';
import { Target, Briefcase, Building2, Users, ArrowRight } from 'lucide-react';

export default function WhyUsSection() {
  return (
    <section id="about" className="relative bg-gray-50 px-4 py-12 md:px-8 md:py-20 lg:px-16 font-[Inter,sans-serif]">
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <h1 className="mb-4 text-3xl font-bold text-black md:text-4xl lg:text-5xl">
            Why Reduzer School
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
            We&apos;re not just another coding bootcamp. Reduzer School is built 
            differently because we know what it takes to get hired—and we&apos;re 
            here to make sure you get there.
          </p>
        </div>

        {/* 3 Feature Cards Grid */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8 lg:gap-10">
          {/* Card 1: Beyond Teaching */}
          <div className="rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md md:p-8">
            <div className="mb-4 inline-flex rounded-lg bg-red-50 p-3">
              <Target className="h-6 w-6 text-red-600" strokeWidth={2} />
            </div>

            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Beyond Teaching
            </h2>

            <p className="text-sm leading-relaxed text-gray-600">
              Most programs stop at teaching. Reduzer School goes further with 
              career support, portfolio building, interview preparation, and access 
              to real opportunities—because getting hired matters just as much as 
              learning the skills.
            </p>
          </div>

          {/* Card 2: Industry-Backed */}
          <div className="rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md md:p-8">
            <div className="mb-4 inline-flex rounded-lg bg-red-50 p-3">
              <Building2 className="h-6 w-6 text-red-600" strokeWidth={2} />
            </div>

            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Industry-Backed
            </h2>

            <p className="text-sm leading-relaxed text-gray-600">
              Reduzer School is built by the same team behind Reduzer Technologies, 
              a company already placing Kenyan engineers with global companies. We 
              didn&apos;t guess at what the industry needs. We already know.
            </p>
          </div>

          {/* Card 3: Full Year Immersive */}
          <div className="rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md md:col-span-2 lg:col-span-1 md:p-8">
            <div className="mb-4 inline-flex rounded-lg bg-red-50 p-3">
              <Users className="h-6 w-6 text-red-600" strokeWidth={2} />
            </div>

            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Full Year Immersive
            </h2>

            <p className="text-sm leading-relaxed text-gray-600">
              A full year of immersive, in-person software engineering training with 
              real projects, mentorship, career support, and honest expectations—built 
              for serious learners ready to create better opportunities for themselves.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between lg:justify-end">
          <p className="text-center text-sm font-medium uppercase tracking-wide text-gray-500 md:text-left lg:hidden">
            Ready to transform your career?
          </p>

          <Link 
            href="#apply"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-8 py-4 font-semibold text-white transition-all hover:bg-red-700 hover:shadow-lg active:scale-95 md:w-auto"
          >
            Start Application
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            NEXT COHORT STARTS SEPTEMBER 2026 • LIMITED SLOTS AVAILABLE
          </p>
        </div>
      </div>
    </section>
  );
}