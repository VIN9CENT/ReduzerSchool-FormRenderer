import { Target, Brain, Users, Zap, ArrowRight } from 'lucide-react';

export default function WhyUsSection() {
  return (
    <section id="about" className="relative bg-gray-50 px-4 py-12 md:px-8 md:py-20 lg:px-16 font-[Inter sans-serif]">
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
          <h1 className="mb-4 text-3xl font-bold md:text-4xl text-black lg:text-5xl">
            Why Reduzer School
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
            We&apos;ve deconstructed the traditional education model to build a
            fast-path for the next generation of technical leaders.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
          {/* Card 1: Production-Grade Curriculum */}
          <div className="rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md md:p-8">
            <div className="mb-4 inline-flex rounded-lg bg-red-50 p-3">
              <Target className="h-6 w-6 text-red-600" strokeWidth={2} />
            </div>

            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Production-Grade Curriculum
            </h2>

            <p className="text-sm leading-relaxed text-gray-600">
              Forget &quot;Hello World&quot;. Our syllabus is reverse-engineered
              from the complexity of Fortune 500 production systems. You&apos;ll
              master distributed systems, high-concurrency patterns, and
              cloud-native architecture from day one.
            </p>
          </div>

          {/* Card 2: Architectural Thinking */}
          <div className="rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md md:p-8">
            <div className="mb-4 inline-flex rounded-lg bg-red-50 p-3">
              <Brain className="h-6 w-6 text-red-600" strokeWidth={2} />
            </div>

            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Architectural Thinking
            </h2>

            <p className="text-sm leading-relaxed text-gray-600">
              We don&apos;t just teach you how to write code; we teach you how
              to design software. Understand the &quot;why&quot; behind every
              decision, from CAP theorem trade-offs to microservices
              orchestration.
            </p>
          </div>

          {/* Card 3: Elite Mentorship */}
          <div className="rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md md:p-8">
            <div className="mb-4 inline-flex rounded-lg bg-red-50 p-3">
              <Users className="h-6 w-6 text-red-600" strokeWidth={2} />
            </div>

            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Elite Mentorship
            </h2>

            <p className="text-sm leading-relaxed text-gray-600">
              Learn directly from Staff Engineers and CTOs who have scaled
              systems to millions of users. No TAs—just direct access to the
              industry&apos;s best minds.
            </p>
          </div>

          {/* Card 4: High-Velocity Growth */}
          <div className="rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md md:p-8">
            <div className="mb-4 inline-flex rounded-lg bg-red-50 p-3">
              <Zap className="h-6 w-6 text-red-600" strokeWidth={2} />
            </div>

            <h2 className="mb-3 text-xl font-bold text-gray-900">
              High-Velocity Growth
            </h2>

            <p className="text-sm leading-relaxed text-gray-600">
              Our immersive format compresses years of on-the-job learning into
              months. Join a cohort of high-performers and push your limits in
              an environment designed for rapid skill acquisition.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between lg:justify-end">
          <p className="text-center text-sm font-medium uppercase tracking-wide text-gray-500 md:text-left lg:hidden">
            Ready to scale your career?
          </p>

          <button className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-8 py-4 font-semibold text-white transition-all hover:bg-red-700 hover:shadow-lg active:scale-95 md:w-auto">
            Start Application
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            NEXT COHORT STARTS SEPTEMBER 2024 • LIMITED SLOTS AVAILABLE
          </p>
        </div>
      </div>
    </section>
  );
}
