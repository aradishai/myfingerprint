'use client';
import { useState } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';

const links = [
  { href: '/', label: 'בית' },
  { href: '/about', label: 'אודות' },
  { href: '/builder', label: 'כלים' },
  { href: '/#contact', label: 'צור קשר' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-cream border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.svg" alt="לוגו" className="h-10 w-10" />
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold text-primary tracking-wide">חותם בעולם</span>
            <span className="text-xs text-primary font-medium">ערד ישי</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-text-muted hover:text-primary font-medium transition-colors text-sm">
              {l.label}
            </Link>
          ))}
          <Link href="#contact" className="bg-primary text-white px-5 py-2 rounded-full font-semibold text-sm hover:opacity-90 transition-all">
            קביעת פגישה
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden text-primary" onClick={() => setOpen(!open)}>
          {open ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden bg-cream border-t border-border px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-text-main font-medium py-1" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/#contact" className="btn-primary text-center mt-2" onClick={() => setOpen(false)}>
            קביעת פגישה
          </Link>
        </div>
      )}
    </header>
  );
}
