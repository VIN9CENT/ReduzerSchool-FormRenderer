import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import ProgramOverview from '@/components/ProgramOverview';
import WhyUsSection from '@/components/WhyUsSection';
import AdmissionsProcess from '@/components/AdmissionsProcess';
import Testimonials from '@/components/Testimonials';
import PricingSection from '@/components/PricingSection';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Launch Your Career in Tech – 12-Month Bootcamp',
  description:
    'Join Reduzer School\'s intensive 12-month bootcamp in Kisii, Kenya. Hands-on training, mentorship, and real-world projects for ambitious learners ready to break into tech.',
  alternates: {
    canonical:  'https://dev.reduzer-school.pages.dev',
  },
  openGraph: {
    title: 'Launch Your Career in Tech – 12-Month Bootcamp',
    description:
      'Join Reduzer School\'s intensive 12-month bootcamp in Kisii, Kenya. Hands-on training, mentorship, and real-world projects.',
    url:  'https://dev.reduzer-school.pages.dev',
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Reduzer School',
    url:  'https://dev.reduzer-school.pages.dev',
    logo:  'https://dev.reduzer-school.pages.dev/icon.png',
    description:
      'Intensive 12-month tech bootcamp with hands-on training, mentorship, and real-world projects based in Kisii, Kenya.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KE',
      addressLocality: 'Kisii',
    },
    sameAs: ['https://reduzer.tech'],
    hasCourse: {
      '@type': 'Course',
      name: '12-Month Full-Stack Development Bootcamp',
      description:
        'Hands-on training, mentorship, and real-world projects built for ambitious learners ready to break into tech.',
      timeRequired: 'P12M',
      provider: {
        '@type': 'EducationalOrganization',
        name: 'Reduzer School',
      },
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Reduzer School?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Reduzer School is a rigorous, one-year, fully in-person software engineering bootcamp based in Kisii, Kenya. We train ambitious Kenyans from complete beginners to career changers in Frontend, Backend, and Fullstack software development using industry-standard technologies.',
        },
      },
      {
        '@type': 'Question',
        name: 'What makes Reduzer School different from other programs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We are fully in-person, not online or hybrid. We run for a full 52 weeks, are based in Kisii, include real client project work, and are built by a company already operating at the standard we train you to reach.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the program online, hybrid, or in-person?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The program is a face-to-face training (onsite) based in Kisii, Kenya.',
        },
      },
      {
        '@type': 'Question',
        name: 'What technologies will I learn?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'JavaScript, TypeScript, React, and Node.js for frontend, backend, and full-stack engineering. You will also learn Git and version control, database management, REST API development, application deployment, and cloud basics.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will I work on real projects?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. In months nine to eleven, you will work on real projects with real Reduzer partner clients — real briefs, real deadlines, real engineering experience before you graduate.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will I get a job after graduating?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Reduzer School provides structured career support including portfolio review, CV and LinkedIn optimization, technical interview preparation, and access to opportunities through the Reduzer Technologies network.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I work remotely with global companies after graduating?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Reduzer Technologies already places Kenyan engineers with companies in Europe. The curriculum and project work at Reduzer School are designed to produce engineers who can compete at that level.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the requirements to join?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Applicants may be high school graduates, university students, dropouts, or graduates serious about software engineering. Requirements include confident English communication, basic computer literacy, a reliable personal laptop, ability to commit 40 hours per week for 12 months, and financial readiness for the Ksh 240,000 annual fee.',
        },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main>
        <Navbar />
        <HeroSection />
        <ProblemSection />
        <ProgramOverview />
        <WhyUsSection />
        <AdmissionsProcess />
        <Testimonials />
        <PricingSection />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}