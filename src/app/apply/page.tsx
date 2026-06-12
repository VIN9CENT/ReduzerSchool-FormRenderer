import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ApplicationForm from '@/components/ApplicationForm';
import Script from 'next/script';

const domain = process.env.NEXT_PUBLIC_SITE_URL || 'https://reduzer.tech';
if (!domain) throw new Error('NEXT_PUBLIC_SITE_URL is not set');

const cleanDomain = domain.replace(/^https?:\/\/|\/$/g, '');
const baseUrl = `https://${cleanDomain}`;

export const metadata: Metadata = {
  title: 'Apply – September Intake | Reduzer School',
  description:
    'Apply for Reduzer School, a one-year, in-person software engineering programme in Kisii focused on product-quality full-stack work. 30 seats for the September intake.',
  alternates: {
    canonical: `${baseUrl}/apply`,
  },
  openGraph: {
    title: 'Apply to Reduzer School – September Intake',
    description:
      'Apply for Reduzer School, a one-year, in-person software engineering programme in Kisii focused on product-quality full-stack work. 30 seats for the September intake.',
    url: `${baseUrl}/apply`,
  },
};

export default function ApplyPage() {
  return (
    <main>
      {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="beforeInteractive"
        />
      )}
      <Navbar />
      <section className="bg-[#F7F9FB] min-h-screen py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red mb-3">
              September Intake
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-[#191C1E] leading-tight mb-3">
              Apply to Reduzer School
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto leading-relaxed">
              Answer plainly. We are looking at how you think, what you have
              tried, how you handle difficult work, and whether this programme
              realistically fits your life.
            </p>
          </div>
          <ApplicationForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}
