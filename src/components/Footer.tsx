'use client';

import { FaLinkedinIn, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { LOGO } from '@/lib/theme';

const programmeLinks = [
  { label: 'Fit and readiness', href: '/#fit' },
  { label: 'Outcomes', href: '/#outcomes' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Programme', href: '/#program' },
  { label: 'Why Kisii', href: '/#why-kisii' },
  { label: 'Cost', href: '/#cost' },
];

const admissionsLinks = [
  { label: 'Parents and sponsors', href: '/#parents' },
  { label: 'Admissions process', href: '/#admissions' },
  { label: 'Apply for September 2026', href: '/apply' },
  { label: 'FAQ', href: '/#faq' },
];

const legalLinks = [
  { label: 'Privacy policy', href: 'https://reduzer.tech/privacy-policy' },
  { label: 'Terms of service', href: 'https://reduzer.tech/terms-of-service' },
  {
    label: 'Cookie policy',
    href: 'https://www.cookiebot.com/en/cookie-declaration/?cbid=1d803704-ef37-4292-92d7-3280f6bffa19',
  },
];

const linkClass =
  'text-sm leading-relaxed text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-8 md:py-12">
        <div className="mb-10 max-w-3xl">
          <p className="text-base leading-relaxed text-white/70 md:text-lg">
            Reduzer School is a one-year, in-person software engineering
            programme in Kisii. The September 2026 intake has 30 seats.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.25fr_1fr_0.9fr_1.1fr]">
          <div>
            <Link
              href="/"
              className="inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red"
            >
              <Image
                src={`${LOGO}/horizontal/transparent/reduzer.png`}
                alt="Reduzer School"
                width={160}
                height={32}
              />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
              Product-quality software engineering from Kisii.
            </p>

            <div className="mt-6 flex gap-4">
              <a
                href="https://x.com/reduzer_tech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Reduzer Technologies on X"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red"
              >
                <FaXTwitter className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/reduzer-technologies"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Reduzer Technologies on LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red"
              >
                <FaLinkedinIn className="h-4 w-4" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer programme navigation">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
              Programme
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              {programmeLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer admissions navigation">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
              Admissions
            </h2>
            <ul className="mt-4 grid gap-3">
              {admissionsLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
              Contact admissions
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              Parents and sponsors can confirm fees, intake dates, seat
              availability, expectations, and support arrangements before
              committing.
            </p>

            <div className="mt-5 grid gap-3 text-sm">
              <a
                href="tel:+254769267965"
                className={`${linkClass} inline-flex items-center gap-3`}
              >
                <Phone className="h-4 w-4 shrink-0 text-red" strokeWidth={2.4} />
                <span>Call +254 769 267 965</span>
              </a>
              <a
                href="https://wa.me/254769267965"
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} inline-flex items-center gap-3`}
              >
                <FaWhatsapp className="h-4 w-4 shrink-0 text-red" />
                <span>Message admissions on WhatsApp</span>
              </a>
              <a
                href="mailto:hello@school.reduzer.tech"
                className={`${linkClass} inline-flex items-center gap-3 break-all`}
              >
                <Mail className="h-4 w-4 shrink-0 text-red" strokeWidth={2.4} />
                <span>Email hello@school.reduzer.tech</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/15 pt-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Reduzer Technologies</p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <p>Kisii · September 2026 intake · 30 seats</p>
            <nav aria-label="Footer legal navigation">
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/55 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
