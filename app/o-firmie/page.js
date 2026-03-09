import Image from 'next/image';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const highlights = [
  {
    img: '/img/calendar.png',
    alt: 'znaczek kalendarza',
    title: '16 lat doświadczenia',
  },
  {
    img: '/img/team.png',
    alt: 'znaczek uściśniętych dłoni',
    title: 'Tysiące zrealizowanych zamówień',
  },
  {
    img: '/img/express-delivery.png',
    alt: 'znaczek samochodu z dostawą',
    title: 'Terminowa i szybka dostawa',
  },
  {
    img: '/img/communicate.png',
    alt: 'znaczek komunikacji mailem lub telefonem',
    title: 'Szybki i łatwy kontakt',
  },
];

export const metadata = {
  title: 'AGMAR paliwa b7 i b0 | O firmie',
  description: 'Dostawa paliwa śląsk i małopolska. Wyłącznie paliwo diesel b7 i b0. Posiadamy duże doświadczenie, zapraszamy.',
  keywords: 'paliwo, diesel, dostawa paliwa, sprzedaż paliw, diesel b7, diesel b0, b7, b0, paliwo śląsk, paliwo małopolska',
};

export default function About() {
  return (
    <>
      <Navigation activePage="about" />
      <main className="min-h-screen pt-20">
        <section className="container-narrow py-16 md:py-24">
          <h1 className="section-heading">O firmie</h1>
          <div className="section-heading-accent" />

          <div className="mt-12 space-y-6">
              <p className="leading-relaxed text-gray-300">
                Nasza firma oferuje głównie olej napędowy najwyższej jakości oraz transport paliwa na terenie
                województwa śląskiego oraz małopolskiego. Dostarczamy wyłącznie paliwo od największych polskich
                producentów.
              </p>
              <div className="relative aspect-[16/6] overflow-hidden rounded-2xl lg:aspect-[760/230]">
                <Image
                  src="/img/flota3.webp"
                  alt="pojazd firmy a w tle rafineria"
                  fill
                  className="object-cover lg:object-contain"
                  sizes="(max-width: 1024px) 100vw, 760px"
                />
              </div>
              <h2 className="text-xl font-semibold text-brand-green">Co nas wyróżnia?</h2>
              <p className="leading-relaxed text-gray-300">
                Wyróżnia nas duże doświadczenie w branży, gdyż zajmujemy się sprzedażą paliw od 2006 roku. Udało nam się
                zrealizować tysiące zamówień, czego wynikiem są zadowoleni klienci, którzy chętnie ponownie korzystają z
                naszych usług, dzięki możliwości łatwego i szybkiego kontaktu z nami.
              </p>
              <h2 className="text-xl font-semibold text-brand-green">Dla kogo jesteśmy?</h2>
              <p className="leading-relaxed text-gray-300">
                Obsługujemy indywidualnych odbiorców, bazy transportowe oraz stacje paliw. Dbamy o naszych klientów a
                każda dostawa posiada świadectwo jakości.
              </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
            {highlights.map(({ img, alt, title }) => (
              <div
                key={title}
                className="flex flex-col items-center rounded-2xl border border-white/10 bg-brand-card/50 p-6 text-center transition-colors hover:border-brand-green/30"
              >
                <img src={img} alt={alt} className="h-14 w-14 object-contain" />
                <p className="mt-4 font-medium text-white">{title}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
