'use client';
import { useState } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';

const links = [
  { href: '/', label: 'בית' },
  { href: '/about', label: 'אודות' },
  { href: '/services', label: 'שירותים' },
  { href: '/blog', label: 'בלוג' },
  { href: '/contact', label: 'צור קשר' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-primary border-b border-green-500">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-lg font-extrabold text-white tracking-wide">חותם בעולם</span>
          <span className="text-xs text-white/70 font-medium">ערד ישי</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-white/80 hover:text-white font-medium transition-colors text-sm">
              {l.label}
            </Link>
          ))}
          <Link href="#contact" className="bg-cream text-primary px-5 py-2 rounded-full font-semibold text-sm hover:bg-white transition-all">
            קביעת פגישה
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden bg-white border-t border-border px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-text-main font-medium py-1" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary text-center mt-2" onClick={() => setOpen(false)}>
            קביעת פגישה
          </Link>
        </div>
      )}
    </header>
  );
}
