import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TrustSnapshot from '@/components/TrustSnapshot';
import ProblemSection from '@/components/ProblemSection';
import ProgramOverview from '@/components/ProgramOverview';
import WhyKisii from '@/components/WhyKisii';
import DeliverySystem from '@/components/DeliverySystem';
import Proof from '@/components/Proof';
import WhoThisIsFor from '@/components/WhoThisIsFor';
import ParentsSponsors from '@/components/ParentsSponsors';
import AdmissionsProcess from '@/components/AdmissionsProcess';
import PricingSection from '@/components/PricingSection';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import { getBaseUrl } from '@/lib/url';

const baseUrl = getBaseUrl();

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Reduzer School – One-Year In-Person Software Engineering Programme (${currentYear})`,
  description:
    'Reduzer School is a one-year, in-person software engineering programme in Kisii. Students learn to define users, model data, build full-stack software, check security, deploy properly, and explain product decisions. 30 seats, September 2026.',
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: 'Reduzer School – One-Year In-Person Software Engineering Programme',
    description:
      'A one-year, in-person software engineering programme in Kisii. Students learn product thinking, full-stack development, security, deployment, and delivery habits.',
    url: baseUrl,
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Reduzer School',
    url: baseUrl,
    logo: `${baseUrl}/icon.png`,
    telephone: '+254769267965',
    description:
      'One-year, in-person software engineering programme with language tracks, product thinking, full-stack development, security, deployment, and delivery habits, based in Kisii County, Kenya.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KE',
      addressLocality: 'Nyamarambe Town',
      addressRegion: 'Kisii County',
      telephone: '+254769267965',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -0.8061854881570457,
        longitude: 34.62956282315392,
      },
    },
    sameAs: ['https://reduzer.tech'],
    hasCourse: {
      '@type': 'Course',
      name: 'One-Year In-Person Software Engineering Programme',
      description:
        'A one-year, in-person software engineering programme with language tracks, product-quality work, and full-stack delivery habits.',
      timeRequired: 'P1Y',
      provider: {
        '@type': 'EducationalOrganization',
        name: 'Reduzer School',
      },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Apply',
        item: `${baseUrl}/apply`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main>
        <Navbar />
        <HeroSection />
        <TrustSnapshot />
        <WhoThisIsFor />
        <ProblemSection />
        <Proof />
        <DeliverySystem />
        <ProgramOverview />
        <WhyKisii />
        <PricingSection />
        <ParentsSponsors />
        <AdmissionsProcess />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}
