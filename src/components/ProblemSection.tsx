import { BookOpen, Briefcase, TrendingUp, ArrowRight } from 'lucide-react';

export default function ProblemSection() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white px-4 py-12 md:px-8 md:py-20 lg:px-16">
      <div className="mx-auto max-w-6xl font-[Inter sans-serif]">
        <div className="mb-16">
          <h1 className="mb-6 text-4xl text-black font-bold leading-tight md:text-5xl lg:text-6xl">
            The Gap in{' '}
            <span className="text-red-600">Technical Excellence</span>
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
            Most educational paths stop where professional engineering begins.
            We&apos;ve identified three critical failures in modern technical
            training that keep developers from reaching their peak potential.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
          <div className="group rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-lg md:p-8">
            <div className="mb-5 inline-flex rounded-lg bg-red-50 p-3">
              <BookOpen className="h-7 w-7 text-red-600" strokeWidth={2} />
            </div>

            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Theoretical Overload
            </h2>

            <div className="md:hidden">
              <p className="text-sm leading-relaxed text-gray-600">
                Too much time spent on concepts that never touch production.
              </p>
            </div>

            <div className="hidden md:block">
              <p className="mb-5 leading-relaxed text-gray-600">
                Tutorial hell isnt just a phase; it&apos;s a structural flaw.
                Traditional courses prioritize abstract concepts that never meet
                a production environment, leaving engineers with
                &ldquo;knowledge&rdquo; but no execution capability.
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700">
                  • Zero Production Context
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700">
                  • Stagnant Repo History
                </span>
              </div>
            </div>
          </div>
<div className="group rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-lg md:p-8">
  <div className="mb-5 inline-flex rounded-lg bg-red-50 p-3">
    <Briefcase className="h-7 w-7 text-red-600" strokeWidth={2} />
  </div>
  
  <h2 className="mb-3 text-2xl font-bold text-gray-900">
    The Senior Gap
  </h2>
  

  <div className="md:hidden">
    <p className="text-sm leading-relaxed text-gray-600">
      Senior roles require architectural thinking that bootcamps ignore.
    </p>
    <button className="mt-3 text-sm font-semibold text-red-600 transition-colors hover:text-red-700">
      Learn more...
    </button>
  </div>
  
  
  <div className="hidden md:block">
    <p className="mb-6 leading-relaxed text-gray-600">
      Bootcamps ignore architectural thinking. They teach you how to 
      build a feature, but never how to maintain a system. This creates 
      a ceiling that prevents juniors from ever reaching Lead roles.
    </p>
    
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
          Technical Complexity
        </span>
        <span className="text-xs font-medium uppercase tracking-wide text-red-600">
          Missing Range
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div className="h-full w-[35%] rounded-full bg-red-600 transition-all duration-500"></div>
      </div>
    </div>
  </div>
</div>

          <div className="group rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-lg md:col-span-2 md:p-8">
            <div className="mb-5 inline-flex rounded-lg bg-red-50 p-3">
              <TrendingUp className="h-7 w-7 text-red-600" strokeWidth={2} />
            </div>

            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Stagnant Career Growth
            </h2>

            <div className="md:hidden">
              <p className="text-sm leading-relaxed text-gray-600">
                Without mentorship from industry titans, your career hits a
                ceiling early.
              </p>
            </div>

            <div className="hidden md:block">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                <p className="flex-1 leading-relaxed text-gray-600">
                  Without elite mentorship, career progression hits an invisible
                  wall. You keep building the same CRUD app for five different
                  companies, never seeing the high-scale engineering patterns
                  used at the 1% level.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row lg:gap-6">
                  <div className="flex-1 rounded-xl  bg-gray-100  p-6 text-center">
                    <div className="mb-2 text-4xl font-bold text-red-600 lg:text-5xl">
                      92%
                    </div>
                    <p className="text-sm leading-snug text-gray-600">
                      Devs feel trapped in Mid-level roles
                    </p>
                  </div>

                  <div className="flex-1 rounded-xl bg-gray-100 p-6 text-center">
                    <div className="mb-2 text-4xl font-bold text-red-600 lg:text-5xl">
                      1:100
                    </div>
                    <p className="text-sm leading-snug text-gray-600">
                      Mentorship access ratio in standard courses
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl bg-gray-900 p-8 text-white shadow-xl md:p-10 lg:mt-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <h2 className="mb-3 text-2xl font-bold md:text-3xl">
                Ready to bridge the gap?
              </h2>
              <p className="leading-relaxed text-gray-300">
                Join our next cohort and transition from a code-writer to a
                system architect with production-grade engineering.
              </p>
            </div>

            <button className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-red-600 px-6 py-4 font-semibold transition-all hover:bg-red-700 hover:shadow-lg active:scale-95 md:px-8">
              Apply Now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
