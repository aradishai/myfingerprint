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

async function handleShare() {
  const data = {
    title: 'חותם בעולם | ערד ישי',
    text: 'סדנאות | הרצאות | ליווי אישי',
    url: 'https://myfingerprint-production.up.railway.app',
  };
  if (navigator.share) {
    await navigator.share(data);
  } else {
    await navigator.clipboard.writeText(data.url);
    alert('הקישור הועתק!');
  }
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-cream border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/builder">
            <img src="/logo.svg" alt="לוגו" className="h-10 w-10" />
          </Link>
          <Link href="/" className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold text-primary tracking-wide">חותם בעולם</span>
            <span className="text-xs text-primary font-medium">ערד ישי</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-text-muted hover:text-primary font-medium transition-colors text-sm">
              {l.label}
            </Link>
          ))}
          <button onClick={handleShare} className="text-primary hover:opacity-70 transition-opacity" title="שתף">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>
          <Link href="#contact" className="bg-primary text-white px-5 py-2 rounded-full font-normal text-sm hover:opacity-90 transition-all">
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
          <button onClick={() => { handleShare(); setOpen(false); }} className="flex items-center gap-2 text-primary font-medium py-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            שתף את האתר
          </button>
        </div>
      )}
    </header>
  );
}
