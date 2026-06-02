'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Program', href: '#program' },
  { label: 'About', href: '#about' },
  { label: 'Admissions', href: '#apply' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.slice(1));

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
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white shadow-[0_2px_20px_rgba(0,0,0,0.08)] border-b border-gray-200' : 'bg-transparent border-b border-transparent'}`}>
      <div className="flex flex-row justify-between items-center w-full max-w-[1280px] mx-auto px-6 h-20 md:px-8">
        <Link href="#home">
          <Image
            src="https://brand-assets.reduzer.tech/horizontal/white/reduzer.png"
            alt="Reduzer School"
            width={160}
            height={32}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex flex-row items-center gap-8">
          {navLinks.map(({ label, href }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <Link
                key={label}
                href={href}
                className={`relative text-[16px] font-medium transition-colors ${
                  isActive
                    ? 'text-[#BB001F]'
                    : 'text-[#374151] hover:text-[#FF002E]'
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#BB001F] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        <Link
          href="#apply"
          className="hidden md:flex items-center justify-center h-9 px-6 rounded-[8px] border border-[#FF002E] text-[13px] font-semibold text-black hover:bg-[#BB001F]/5 transition-colors"
        >
          Apply Now
        </Link>

        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex items-center justify-center w-10 h-10 -mr-2"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? (
            <X size={24} color="#FF002E" />
          ) : (
            <Menu size={24} color="#FF002E" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-0 border-t border-gray-100 bg-white px-6 pb-6 pt-4">
          {navLinks.map(({ label, href }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className={`py-3 text-[16px] font-medium transition-colors border-b border-gray-100 last:border-0 ${
                  isActive
                    ? 'text-[#BB001F] font-semibold'
                    : 'text-[#374151] hover:text-[#FF002E]'
                }`}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="#apply"
            onClick={() => setOpen(false)}
            className="mt-4 flex items-center justify-center h-10 rounded-[8px] border border-[#FF002E] text-[13px] font-semibold text-black hover:bg-[#BB001F]/5 transition-colors"
          >
            Apply Now
          </Link>
        </div>
      )}
    </nav>
  );
}
