import Link from 'next/link';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Program', href: '#program' },
  { label: 'Curriculum', href: '#curriculum' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 w-full h-20 flex items-center bg-[rgba(247,249,251,0.8)] backdrop-blur-md border-b border-gray-100">
      <div className="flex flex-row justify-between items-center w-full max-w-[1280px] mx-auto px-8">
        <Link
          href="/"
          className="font-semibold text-[20px] text-[#BB001F] tracking-tight"
        >
          Reduzer School
        </Link>

        <div className="flex flex-row items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[16px] font-medium text-[#374151] hover:text-[#BB001F] transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        <Link
          href="#apply"
          className="font-['Inter sans-serif'] flex items-center justify-center h-9 px-6 rounded-[8px] border border-[#BB001F] text-[13px] font-semibold text-black hover:bg-[#BB001F]/5 transition-colors"
        >
          Apply Now
        </Link>
      </div>
    </nav>
  );
}
