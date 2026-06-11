'use client';

export default function PricingSection() {
  return (
    <section
      id="cost"
      className="w-full bg-white px-4 py-12 md:px-8 md:py-20 lg:px-16 font-[Inter,sans-serif]"
    >
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-red">
          Cost
        </p>

        <h2 className="mb-6 text-3xl font-bold leading-tight text-black md:text-4xl lg:text-5xl">
          KSh 20,000 a month. KSh 240,000 for the year.
        </h2>

        <p className="mb-6 text-base md:text-lg leading-relaxed text-gray-600">
          A full year, in person. KSh 20,000 a month, paid across the year, for
          a total of KSh 240,000. A small deposit holds your seat and counts
          toward your first month. You can pay one month at a time, or one term
          at a time if that is easier to plan around.
        </p>

        <p className="mb-10 text-base md:text-lg leading-relaxed text-gray-900 font-medium">
          We keep the fee low so more serious applicants can apply. The work
          still has to meet the same standard.
        </p>
      </div>
    </section>
  );
}
