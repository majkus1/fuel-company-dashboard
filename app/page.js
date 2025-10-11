// app/page.js
import Link from 'next/link';
import PriceDisplay from './components/PriceDisplay.jsx';

export const metadata = {
  title: 'AGMAR | Dostawa paliw B7 i B0 śląsk i małopolska od 16 lat',
  description: 'Dostawa paliwa śląsk i małopolska. Wyłącznie paliwo diesel b7 i b0. Posiadamy duże doświadczenie, zapraszamy.',
  keywords: 'paliwo, diesel, dostawa paliwa, sprzedaż paliw, diesel b7, diesel b0, b7, b0, paliwo śląsk, paliwo małopolska, paliwo ogrodzieniec, paliwo zawiercie, paliwo katowice, paliwo kraków, paliwo sosnowiec, paliwo dąbrowa górnicza, dostawa paliwa ogrodzieniec, dostawa paliwa zawiercie, dostawa paliwa dąbrowa górnicza, dostawa paliwa śląsk, dostawa paliwa małopolska, dostawa paliwa pilica',
};

export default function Home() {
  return (
    <>
      <header id="strona-glowna">
        <nav className="navdesktop-list" style={{ maxWidth: '100%' }}>
          <div className="nav-item">
            <Link href="/">
              <img src="/img/oil.png" alt="znak logo krople paliwa" className="logo" />
              <p>AGMAR</p>
            </Link>
          </div>
        </nav>

        <nav className="mobilenav">
          <div>
            <Link href="/" className="nav-item">
              <img src="/img/oil.png" alt="znak logo krople paliwa" className="logo" />
              <p>AGMAR</p>
            </Link>
          </div>
        </nav>

        <img
          src="/img/main-new-pht-desktop.jpg"
          alt="tło głównej strony a na nim 4 pojazdy firmowe na trasie z tyłu znajduje się pole"
          className="hero-img"
          loading="eager"
        />
        <img
          src="/img/new-main-pht.jpg"
          alt="tło głównej strony a na nim 4 pojazdy firmowe na trasie z tyłu znajduje się pole"
          className="hero-imgmobile"
          loading="eager"
        />
        <img
          src="/img/new-main-pht.jpg"
          alt="tło głównej strony a na nim 4 pojazdy firmowe na trasie z tyłu znajduje się pole"
          className="hero-imgmedium"
          loading="eager"
        />
        <div className="hero-shadow section">
          <div className="hero-text">
            <h1>Sprzedaż olejów napędowych</h1>
            <p>z dostawą na terenach województwa śląskiego oraz małopolskiego.</p>
            <div className="buttonslinks">
              <Link href="/o-firmie" className="btns">
                O firmie
              </Link>
              <Link href="/oferta" className="btns">
                Oferta
              </Link>
              <Link href="/kontakt" className="btns">
                Kontakt
              </Link>
            </div>
          </div>
          <div className="hero-textmobile">
            <h1>Sprzedaż olejów napędowych</h1>
            <p>z dostawą na terenach województwa śląskiego oraz małopolskiego.</p>
            <div className="buttonsoflinksmobile">
              <Link href="/o-firmie">O firmie</Link>
              <Link href="/oferta">Oferta</Link>
              <Link href="/kontakt">Kontakt</Link>
            </div>
          </div>
        </div>
      </header>
      <PriceDisplay />
    </>
  );
}

