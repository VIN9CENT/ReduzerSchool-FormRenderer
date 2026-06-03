'use client';

import { FaXTwitter, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa6';
import { MdOutlineMail } from 'react-icons/md';
import { FiPhoneCall } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 md:px-10 py-12">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        {/* TOP TEXT */}
        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light">
            Join The <span className="text-red-500">Success !</span>
          </h2>
          <p className="text-gray-300 mt-4 text-base sm:text-lg md:text-xl lg:text-2xl">
            Start your journey with us today
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* BRAND */}
          <div>
            <Link href="/">
              <Image
                src="https://brand-assets.reduzer.tech/horizontal/transparent/reduzer.png"
                alt="Reduzer School"
                width={160}
                height={32}
                priority
              />
            </Link>
            <p className="mt-5 text-gray-300 text-sm leading-relaxed">
              Innovating Today.
              <br />
              Transforming Tomorrow
            </p>

            {/* SOCIALS */}
            <div className="flex gap-6 mt-6">
              <a
                href="https://x.com/reduzer_tech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
              >
                <FaXTwitter className="text-2xl " />
              </a>
              <a
                href="https://www.linkedin.com/company/reduzer-technologies"
                target="_blank"
                rel="noopener noreferrer"
                aria-label=" In / LinkedIn"
              >
                <FaLinkedinIn className="text-2xl" />
              </a>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h2 className="text-sm font-bold uppercase">Contact</h2>
            <div className="w-28 border-b border-red-500 mt-4 mb-8"></div>
            <div className="space-y-8 text-sm">
              <a href="tel:+254769267965" className="flex items-center gap-4 ">
                <FiPhoneCall className="text-red-500 w-5 h-5 shrink-0" />
                <span>+254769267965</span>
              </a>
              <a
                href="https://wa.me/254769267965"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 "
              >
                <FaWhatsapp className="text-red-500 w-5 h-5 shrink-0" />
                <span>+254769267965</span>
              </a>
              <a
                href="mailto:hello@reduzer.tech"
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <MdOutlineMail className="text-red-500 w-5 h-5 shrink-0" />
                <span>hello@reduzer.tech</span>
              </a>
            </div>
          </div>

          {/* LEGALS */}
          <div>
            <h2 className="text-sm font-bold uppercase">Legals</h2>
            <div className="w-28 border-b border-red-500 mt-4 mb-8"></div>
            <ul className="space-y-8 text-sm text-gray-200">
              <li>
                <Link href="https://reduzer.tech/privacy-policy">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="https://reduzer.tech/terms-of-service">
                  Terms of services
                </Link>
              </li>
              <li>
                <Link href="#cookie-policy">Cookie policy</Link>
              </li>
            </ul>
          </div>

          {/* PROGRAM */}
          <div>
            <h2 className="text-sm font-bold uppercase">Program</h2>
            <div className="w-28 border-b border-red-500 mt-4 mb-8"></div>
            <ul className="space-y-8 text-sm text-gray-200">
              <li>
                <Link href="#curriculum">Curriculum</Link>
              </li>
              <li>
                <Link href="#admission">Admission</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BUTTONS */}

        <a
          href="https://wa.me/+254769267965"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#25D366',
            borderRadius: '50%',
            width: '46px',
            height: '46px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FaWhatsapp style={{ fontSize: '28px', color: 'white' }} />
        </a>
      </div>

      {/* LINE */}
      <div className="border-b border-gray-600 mt-10"></div>

      {/* COPYRIGHT */}
      <p className="text-sm text-gray-300 mt-10 ">© 2026 Reduzer School.</p>
    </footer>
  );
}
