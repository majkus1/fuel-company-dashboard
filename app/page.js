import Link from 'next/link';
import Image from 'next/image';
import Navigation from './components/Navigation';
import PriceDisplay from './components/PriceDisplay.jsx';

export const metadata = {
  title: 'AGMAR | Dostawa paliw B7 i B0 śląsk i małopolska od 16 lat',
  description: 'Dostawa paliwa śląsk i małopolska. Wyłącznie paliwo diesel b7 i b0. Posiadamy duże doświadczenie, zapraszamy.',
  keywords: 'paliwo, diesel, dostawa paliwa, sprzedaż paliw, diesel b7, diesel b0, b7, b0, paliwo śląsk, paliwo małopolska, paliwo ogrodzieniec, paliwo zawiercie, paliwo katowice, paliwo kraków, paliwo sosnowiec, paliwo dąbrowa górnicza, dostawa paliwa ogrodzieniec, dostawa paliwa zawiercie, dostawa paliwa dąbrowa górnicza, dostawa paliwa śląsk, dostawa paliwa małopolska, dostawa paliwa pilica',
};

export default function Home() {
  return (
    <>
      <Navigation activePage="home" />
      <main className="relative min-h-screen">
        {/* Hero - full viewport, image + overlay */}
        <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
          <Image
            src="/img/main-new-pht-desktop.jpg"
            alt="tło głównej strony a na nim 4 pojazdy firmowe na trasie z tyłu znajduje się pole"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="container-narrow relative z-10 flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
              Sprzedaż olejów napędowych
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/90 sm:text-xl md:text-2xl">
              z dostawą na terenach województwa śląskiego oraz małopolskiego.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link href="/o-firmie" className="btn-primary">
                O firmie
              </Link>
              <Link href="/oferta" className="btn-outline">
                Oferta
              </Link>
              <Link href="/kontakt" className="btn-outline">
                Kontakt
              </Link>
            </div>
          </div>
        </section>

        <PriceDisplay />
      </main>
    </>
  );
}
