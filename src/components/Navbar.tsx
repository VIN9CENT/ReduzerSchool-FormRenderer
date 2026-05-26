'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Program', href: '#program' },
  { label: 'Curriculum', href: '#curriculum' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="flex flex-row justify-between items-center w-full max-w-[1280px] mx-auto px-6 h-20 md:px-8">
        <Link href="/">
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
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[16px] font-medium text-[#374151] hover:text-[#FF002E] transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        <Link
          href="#apply"
          className="hidden md:flex items-center justify-center h-9 px-6 rounded-[8px] border border-[#FF002E] text-[13px] font-semibold text-black hover:bg-[#BB001F]/5 transition-colors"
        >
          Apply Now
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex items-center justify-center"
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
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="py-3 text-[16px] font-medium text-[#374151] hover:text-[#FF002E] transition-colors border-b border-gray-100 last:border-0"
            >
              {label}
            </Link>
          ))}
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
