'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Strona główna', page: 'home' },
  { href: '/o-firmie', label: 'O firmie', page: 'about' },
  { href: '/oferta', label: 'Oferta', page: 'offer' },
  { href: '/kontakt', label: 'Kontakt', page: 'contact' },
];

export default function Navigation({ activePage }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-xl"
        style={{ backgroundColor: 'lab(21.8954% -.315487 -10.5652 / .8)' }}
      >
        <nav className="container-narrow flex h-16 items-center justify-between lg:h-18">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
            <Image
              src="/img/oils.png"
              alt="AGMAR"
              width={44}
              height={44}
              className="h-10 w-10 object-contain"
              style={{ filter: 'brightness(1.4) contrast(1.2)' }}
            />
            <span className="font-bold tracking-tight text-brand-green" style={{ fontSize: '25px' }}>AGMAR</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map(({ href, label, page }) => (
              <Link
                key={href}
                href={href}
                className={`text-[16px] font-medium transition-colors hover:text-brand-green ${
                  activePage === page ? 'text-brand-green' : 'text-gray-300'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 md:hidden"
            aria-label={mobileOpen ? 'Zamknij menu' : 'Otwórz menu'}
          >
            {mobileOpen ? (
              <Image src="/img/close.png" alt="" width={24} height={24} className="h-6 w-6 object-contain" />
            ) : (
              <Image src="/img/hamburger.png" alt="" width={24} height={24} className="h-6 w-6 object-contain" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 bg-brand-slate/95 backdrop-blur-xl transition-opacity duration-300 md:hidden ${
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 pt-20">
          {navLinks.map(({ href, label, page }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`text-2xl font-medium transition-colors hover:text-brand-green ${
                activePage === page ? 'text-brand-green' : 'text-white'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
