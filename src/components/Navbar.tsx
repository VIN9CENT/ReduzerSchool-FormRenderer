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
    <nav>
      <div>
        <div>
          <Link href="/">Reduzer School</Link>

          <div>
            {navLinks.map(({ label, href }) => (
              <Link key={label} href={href}>
                {label}
              </Link>
            ))}
          </div>
        </div>

        <Link href="#apply">Apply Now</Link>
      </div>
    </nav>
  );
}
