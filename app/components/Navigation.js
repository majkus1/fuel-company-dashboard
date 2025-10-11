// app/components/Navigation.js
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navigation({ activePage }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="navdesktop-list">
        <div className="nav-item">
          <Link href="/">
            <img src="/img/oil.png" alt="znak logo krople paliwa" className="logo" />
            <p>AGMAR</p>
          </Link>
        </div>
        <Link href="/" className={activePage === 'home' ? 'active' : ''}>
          Strona główna
        </Link>
        <Link href="/o-firmie" className={activePage === 'about' ? 'active' : ''}>
          O firmie
        </Link>
        <Link href="/oferta" className={activePage === 'offer' ? 'active' : ''}>
          Nasza oferta
        </Link>
        <Link href="/kontakt" className={activePage === 'contact' ? 'active' : ''}>
          Kontakt
        </Link>
      </nav>

      <nav className="mobilenav">
        <li className="nav-item">
          <Link href="/">
            <img src="/img/oil.png" alt="znak logo krople paliwa" className="logo" />
            <p>AGMAR</p>
          </Link>
        </li>

        <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
          <p className="burger">{isOpen ? 'X' : '☰'}</p>
        </button>
        <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`nav-mob first ${activePage === 'home' ? 'active' : ''}`}
          >
            Strona Główna
          </Link>
          <Link
            href="/o-firmie"
            onClick={() => setIsOpen(false)}
            className={`nav-mob ${activePage === 'about' ? 'active' : ''}`}
          >
            O firmie
          </Link>
          <Link
            href="/oferta"
            onClick={() => setIsOpen(false)}
            className={`nav-mob ${activePage === 'offer' ? 'active' : ''}`}
          >
            Oferta
          </Link>
          <Link
            href="/kontakt"
            onClick={() => setIsOpen(false)}
            className={`nav-mob ${activePage === 'contact' ? 'active' : ''}`}
          >
            Kontakt
          </Link>
        </nav>
      </nav>
    </>
  );
}

