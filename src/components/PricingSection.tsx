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
          KSh 240,000 for the year.
        </h2>

        <p className="mb-6 text-base md:text-lg leading-relaxed text-gray-600">
          Reduzer School is a one-year, full-time, in-person programme. Total
          tuition is KSh 240,000, equivalent to KSh 20,000 per month.
        </p>

        <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
          <p className="text-base leading-relaxed text-gray-700 md:text-lg">
            To confirm your seat, you pay a KSh 60,000 deposit. This is part of
            the total tuition, not an extra fee. After the deposit, the
            remaining KSh 180,000 can be paid at KSh 20,000 per month for nine
            months.
          </p>
        </div>

        <p className="text-base md:text-lg leading-relaxed text-gray-900 font-medium">
          The fee is set to keep the programme accessible while maintaining the
          standard of work expected from every student.
        </p>
      </div>
    </section>
  );
}
