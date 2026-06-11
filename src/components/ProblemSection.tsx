'use client';

export default function ProblemSection() {
  return (
    <section className="bg-linear-to-b from-gray-50 to-white px-4 py-12 md:px-8 md:py-20 lg:px-16">
      <div className="mx-auto max-w-3xl font-[Inter,sans-serif]">
        <h2 className="mb-8 text-3xl font-bold leading-tight text-black md:text-4xl lg:text-5xl">
          Most programmes teach code. Real product work asks for{' '}
          <span className="italic text-red">more than code</span>.
        </h2>

        <div className="flex flex-col gap-6 text-base leading-relaxed text-gray-600 md:text-lg">
          <p>
            It is possible to build projects quickly, collect a certificate, and
            still be unprepared for professional software work. Running code is
            only one part of the job. The harder question is whether the student
            can understand the user, model the data, make product decisions,
            secure the system, deploy it properly, and explain the tradeoffs.
          </p>

          <p>
            Real delivery exposes habits a short course can hide: unclear user
            stories, weak data modelling, vague status, late blockers, missing
            tests, unsafe deployment, no analytics, and silence when the work
            gets difficult. New developers struggle there because they were not
            trained inside that kind of work.
          </p>

          <p className="text-xl font-semibold text-black md:text-2xl">
            Reduzer School is built around the quality of work expected inside
            a real engineering team.
          </p>
        </div>
      </div>
    </section>
  );
}
