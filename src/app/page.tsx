import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import ProgramOverview from '@/components/ProgramOverview';
import WhyUsSection from '@/components/WhyUsSection';
import AdmissionsProcess from '@/components/AdmissionsProcess';
import Testimonials from '@/components/Testimonials';
import PricingSection from '@/components/PricingSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <ProgramOverview />
      <WhyUsSection />
      <AdmissionsProcess />
      <Testimonials />
      <PricingSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
