'use client';

export default function Testimonials() {
  return (
    <section className="flex flex-col items-center gap-10 bg-gray-50 px-4 py-12 md:px-8 md:py-20 lg:px-16 font-[Inter,sans-serif]">
      <div className="mx-auto w-full max-w-3xl">
        <p className="mb-4 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-red">
          From the first cohort
        </p>

        <h2 className="mb-8 text-3xl font-bold leading-tight text-black md:text-4xl lg:text-5xl">
          The first cohort is still in progress.
        </h2>

        <p className="mb-10 text-base md:text-lg leading-relaxed text-gray-600">
          Placement claims will wait until there are graduates. The first cohort
          started in 2025 and graduates in August 2026. What we can show now is
          a student account from inside the programme.
        </p>

        <blockquote className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <p className="text-lg italic leading-relaxed text-[#5C647A]">
            &ldquo;Reduzer School has helped me build both frontend and backend
            skills through real projects. I understand software better now, and
            I solve problems more clearly than when I started.&rdquo;
          </p>
          <footer className="mt-6">
            <span className="font-semibold text-[#191C1E]">Dorah Momanyi</span>
            <span className="text-[#565E74]">
              , 2025 cohort, currently in Phase 11
            </span>
          </footer>
        </blockquote>

        <p className="mt-10 text-base md:text-lg italic leading-relaxed text-gray-500">
          When this cohort finishes in August 2026, we will publish what
          happened: employment outcomes, capstone grades, the quality of the work
          they shipped, and where the first graduates went next.
        </p>
      </div>
    </section>
  );
}
