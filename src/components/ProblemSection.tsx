import Link from 'next/link';
import {
  BookOpen,
  Clock,
  ArrowRight,
  DollarSign,
  Target,
} from 'lucide-react';

export default function ProblemSection() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white px-4 py-12 md:px-8 md:py-20 lg:px-16">
      <div className="mx-auto max-w-6xl font-[Inter,sans-serif]">
        {/* Header */}
        <div className="mb-16">
          <h1 className="mb-6 text-4xl font-bold leading-tight text-black md:text-5xl lg:text-6xl">
            Why <span className="text-red-600">Reduzer</span> Exists
          </h1>

          <p className="max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
            Tech opportunities are growing fast, but access to practical
            training still feels out of reach for many Kenyans. The problem
            isn&apos;t that people aren&apos;t trying; they&apos;re doing
            everything they can. The problem is that nobody has built a program
            deep enough, long enough, and close enough to actually close the
            gap.
          </p>
        </div>

        {/* Problem Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
          {/* Card 1: Theory-Heavy Education */}
          <div className="group rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-lg md:p-8">
            <div className="mb-5 inline-flex rounded-lg bg-red-50 p-3">
              <BookOpen className="h-7 w-7 text-red-600" strokeWidth={2} />
            </div>

            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Stuck in Theory
            </h2>

            <div className="md:hidden">
              <p className="text-sm leading-relaxed text-gray-600">
                Theory-heavy education with no practical application or
                structure.
              </p>
            </div>

            <div className="hidden md:block">
              <p className="mb-5 leading-relaxed text-gray-600">
                Many are stuck in theory-heavy education that never connects to
                real-world work. Others are trying to learn alone online,
                watching scattered tutorials late into the night without
                structure or support to guide them forward.
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700">
                  • No Practical Application
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700">
                  • Scattered Learning
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Balancing Responsibilities */}
          <div className="group rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-lg md:p-8">
            <div className="mb-5 inline-flex rounded-lg bg-red-50 p-3">
              <Clock className="h-7 w-7 text-red-600" strokeWidth={2} />
            </div>

            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Life Responsibilities
            </h2>

            <div className="md:hidden">
              <p className="text-sm leading-relaxed text-gray-600">
                Balancing work, family, and the pressure to rebuild their
                future.
              </p>
            </div>

            <div className="hidden md:block">
              <p className="mb-6 leading-relaxed text-gray-600">
                Many are balancing work, family responsibilities, or the
                pressure to rebuild their future after life took a different
                path. They need a program that fits their reality; not one
                designed for people with unlimited time and resources.
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700">
                  • Work Commitments
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700">
                  • Family Duties
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700">
                  • Career Rebuilding
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Programs That Don't Deliver - Full Width */}
          <div className="group rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-lg md:col-span-2 md:p-8">
            <div className="mb-5 inline-flex rounded-lg bg-red-50 p-3">
              <DollarSign className="h-7 w-7 text-red-600" strokeWidth={2} />
            </div>

            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Programs That Don&apos;t Deliver
            </h2>

            <div className="md:hidden">
              <p className="text-sm leading-relaxed text-gray-600">
                Spending money they can&apos;t afford on programs that
                don&apos;t deliver results.
              </p>
            </div>

            <div className="hidden md:block">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                <p className="flex-1 leading-relaxed text-gray-600">
                  They&apos;re spending money they can&apos;t afford on programs
                  that don&apos;t deliver and learning late into the night by
                  watching scattered tutorials. They&apos;re doing everything
                  they can. But effort alone isn&apos;t enough when the system
                  isn&apos;t built to support you.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row lg:gap-6">
                  <div className="flex-1 rounded-xl bg-gray-100 p-6 text-center">
                    <div className="mb-2 text-4xl font-bold text-red-600 lg:text-5xl">
                      100%
                    </div>
                    <p className="text-sm leading-snug text-gray-600">
                      Effort from learners trying to break through
                    </p>
                  </div>

                  <div className="flex-1 rounded-xl bg-gray-100 p-6 text-center">
                    <div className="mb-2 text-4xl font-bold text-red-600 lg:text-5xl">
                      0%
                    </div>
                    <p className="text-sm leading-snug text-gray-600">
                      Programs built deep enough to close the gap
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Real Problem - Highlight Box */}
        <div className="mt-10 rounded-2xl border-2 border-red-600 bg-red-50 p-6 md:p-8 lg:mt-12">
          <div className="mb-4 inline-flex rounded-lg bg-red-600 p-2">
            <Target className="h-6 w-6 text-white" strokeWidth={2} />
          </div>

          <h3 className="mb-3 text-xl font-bold text-gray-900 md:text-2xl">
            The Real Problem
          </h3>

          <p className="text-base leading-relaxed text-gray-700 md:text-lg">
            The problem is not that people aren&apos;t trying. The problem is
            that nobody has built a program{' '}
            <span className="font-semibold text-red-600">deep enough</span>,{' '}
            <span className="font-semibold text-red-600">long enough</span>, and{' '}
            <span className="font-semibold text-red-600">close enough</span> to
            actually close the gap.
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-12 overflow-hidden rounded-2xl bg-gray-900 p-8 text-white shadow-xl md:p-10 lg:mt-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <h2 className="mb-3 text-2xl font-bold md:text-3xl">
                That&apos;s what Reduzer School is here to do
              </h2>
              <p className="leading-relaxed text-gray-300">
                A program built for Kenyans who are ready to put in the
                work; designed to give you the depth, duration, and support you
                actually need to succeed.
              </p>
            </div>

            <Link
              href="#apply"
              className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-red-600 px-6 py-4 font-semibold transition-all hover:bg-red-700 hover:shadow-lg active:scale-95 md:px-8"
            >
              Join Reduzer
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
