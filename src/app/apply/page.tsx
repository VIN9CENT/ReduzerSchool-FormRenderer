import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ApplicationForm from '@/components/ApplicationForm';

export const metadata = {
  title: 'Apply - Reduzer School',
  description:
    'Apply for the Reduzer School 12-month Software Engineering Bootcamp.',
};

export default function ApplyPage() {
  return (
    <main>
      <Navbar />
      <section className="bg-[#F7F9FB] min-h-screen py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#BB001F] mb-3">
              September Intake
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-[#191C1E] leading-tight mb-3">
              Apply to Reduzer School
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto leading-relaxed">
              Complete all five sections honestly. There are no right or wrong
              answers, we want to understand who you are and what drives you.
            </p>
          </div>
          <ApplicationForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}
