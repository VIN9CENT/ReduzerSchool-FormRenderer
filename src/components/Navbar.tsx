'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLandingTracking } from '@/hooks/useLandingTracking';
import { T, LOGO } from '@/lib/theme';

const navLinks = [
  { label: 'Fit', href: '/#fit' },
  { label: 'Outcomes', href: '/#outcomes' },
  { label: 'Programme', href: '/#program' },
  { label: 'Parents', href: '/#parents' },
  { label: 'Cost', href: '/#cost' },
  { label: 'Admissions', href: '/#admissions' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { trackCTAClick } = useLandingTracking();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.replace('/#', ''));

    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0, rootMargin: '-80px 0px -60% 0px' }
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((item) => {
        if (item) item.observer.unobserve(item.el);
      });
    };
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white shadow-[0_2px_20px_rgba(0,0,0,0.08)] border-b border-gray-200' : 'bg-transparent border-b border-transparent'}`}
    >
      <div className="flex flex-row justify-between items-center w-full max-w-[1280px] mx-auto px-6 h-20 md:px-8">
        <Link href="/">
          <Image
            src={`${LOGO}/horizontal/white/reduzer.png`}
            alt="Reduzer School"
            width={160}
            height={32}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex flex-row items-center gap-6">
          {navLinks.map(({ label, href }) => {
            const isActive = activeSection === href.replace('/#', '');
            return (
              <Link
                key={label}
                href={href}
                className={`relative text-[16px] font-medium transition-colors ${
                  isActive ? 'text-red' : 'text-[#374151] hover:text-red'
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-red rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        <Link
          href="/apply"
          onClick={() => trackCTAClick('header')}
          className="hidden lg:flex items-center justify-center h-9 px-6 rounded-[8px] border border-red text-[13px] font-semibold text-black hover:bg-red/5 transition-colors"
        >
          Apply · 30 seats
        </Link>

        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden flex items-center justify-center w-10 h-10 -mr-2"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? (
            <X size={24} color={T.red} />
          ) : (
            <Menu size={24} color={T.red} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden flex flex-col gap-0 border-t border-gray-100 bg-white px-6 pb-6 pt-4">
          {navLinks.map(({ label, href }) => {
            const isActive = activeSection === href.replace('/#', '');
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className={`py-3 text-[16px] font-medium transition-colors border-b border-gray-100 last:border-0 ${
                  isActive
                    ? 'text-red font-semibold'
                    : 'text-[#374151] hover:text-red'
                }`}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/apply"
            onClick={() => {
              setOpen(false);
              trackCTAClick('header');
            }}
            className="mt-4 flex items-center justify-center h-10 rounded-[8px] border border-red text-[13px] font-semibold text-black hover:bg-red/5 transition-colors"
          >
            Apply · 30 seats
          </Link>
        </div>
      )}
    </nav>
  );
}
