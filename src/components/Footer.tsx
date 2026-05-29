'use client';

import { FaXTwitter, FaWhatsapp } from 'react-icons/fa6';
import { MdOutlineMail } from 'react-icons/md';
import { FiPhoneCall } from 'react-icons/fi';
import { IoIosArrowUp } from 'react-icons/io';
import Link from 'next/link';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white px-6 md:px-10 py-12">
      <div className="max-w-7xl mx-auto">
        {/* TOP TEXT */}
        <div className="text-center mb-16 px-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light">
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
              <h1 className="text-xl md:text-4xl font-bold ">Reduzer School</h1>
            </Link>
            <p className="mt-5 text-gray-300 text-sm leading-relaxed">
              Innovating Today.
              <br />
              Transforming Tomorrow
            </p>

            {/* SOCIALS */}
            <div className="flex gap-6 mt-10">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
              >
                <FaXTwitter className="text-2xl " />
              </a>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h2 className="text-sm font-bold uppercase">Contact</h2>
            <div className="w-28 border-b border-red-500 mt-4 mb-8"></div>
            <div className="space-y-8 text-sm">
              <a href="tel:+254789090890" className="flex items-center gap-4 ">
                <FiPhoneCall className="text-red-500 w-5 h-5 shrink-0" />
                <span>+254789090890</span>
              </a>
              <a
                href="https://wa.me/254709090889"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 "
              >
                <FaWhatsapp className="text-red-500 w-5 h-5 shrink-0" />
                <span>+254709090889</span>
              </a>
              <a
                href="mailto:contact@ReduzerSchool.tech"
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <MdOutlineMail className="text-red-500 w-5 h-5 shrink-0" />
                <span>
                  {' '}
                  contact@Reduzer <br />
                  School.tech
                </span>
              </a>
            </div>
          </div>

          {/* LEGALS */}
          <div>
            <h2 className="text-sm font-bold uppercase">Legals</h2>
            <div className="w-28 border-b border-red-500 mt-4 mb-8"></div>
            <ul className="space-y-8 text-sm text-gray-200">
              <li>
                <Link href="#privacy-policy">Privacy policy</Link>
              </li>
              <li>
                <Link href="#terms-and-conditions">Terms and conditions</Link>
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
                <Link href="#pricing">Pricing</Link>
              </li>
              <li>
                <Link href="#admission">Admission</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-6 mt-20">
          <a
            href="https://wa.me/254709090889"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="bg-green-500 p-0 rounded-full "
          >
            <FaWhatsapp className="text-5xl" />
          </a>
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="bg-red-500 p-0 rounded-full hover:bg-red-600 transition-colors duration-500"
          >
            <IoIosArrowUp className="text-5xl" />
          </button>
        </div>

        {/* LINE */}
        <div className="border-b border-gray-600 mt-10"></div>

        {/* COPYRIGHT */}
        <p className="text-sm text-gray-300 mt-10 ">
          © 2026 Reduzer School. Copyright Protected
        </p>
      </div>
    </footer>
  );
}
