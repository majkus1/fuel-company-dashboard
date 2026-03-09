import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export const metadata = {
  title: 'AGMAR paliwa b7 i b0 | Oferta',
  description: 'Dostawa paliwa śląsk i małopolska. Wyłącznie paliwo diesel b7 i b0. Posiadamy duże doświadczenie, zapraszamy.',
  keywords: 'paliwo, diesel, dostawa paliwa, sprzedaż paliw, diesel b7, diesel b0, b7, b0',
};

export default function Offer() {
  return (
    <>
      <Navigation activePage="offer" />
      <main className="min-h-screen pt-20">
        <section className="container-narrow py-16 md:py-24">
          <h1 className="section-heading">Nasza oferta</h1>
          <div className="section-heading-accent" />

          <div className="mt-12 space-y-10">
            <div>
              <h2 className="text-xl font-semibold text-brand-green sm:text-2xl">
                Sprzedaż i dostawa olejów napędowych B7 i B0 Diesel
              </h2>
              <p className="mt-4 leading-relaxed text-gray-300">
                Sprzedaż i dostawa olejów napędowych B7 i B0 Diesel najwyższej jakości w konkurencyjnej cenie. Oczywiście
                dostawa pod wskazany przez Ciebie adres. Bez stresu. Dla własnego komfortu. Czyli dokładnie tak, jak
                lubisz. Nie zwlekaj i już dziś zadbaj o dostęp do odpowiedniego paliwa dla swojego diesla.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white sm:text-xl">Diesel B7 czy B0?</h2>
              <p className="mt-3 leading-relaxed text-gray-300">
                ON B7 jest wysokiej jakości paliwem napędowym przeznaczonym do praktycznie wszystkich typów silników
                diesla. To doskonałe paliwo napędowe z maksymalną zawartość procentową biokomponentów, czyli bioestrów
                FAME, wynoszącą 7%. Oczywiście ON B7 paliwo jest zgodne z obowiązującymi normami dotyczącymi zawartości
                biokomponentów w oleju.
                <br />
                <br />
                Natomiast ON B0 to paliwo dedykowane najbardziej wymagającym silnikom diesla. Ponadto zapewnia nieco
                szybszy rozruch silnika. Oczywiście olej napędowy posiada odpowiednie biocydy, które skutecznie chronią
                go przed szkodliwym skażeniem mikrobiologicznym. Zatem kupując u nas ON B0, otrzymujesz czyste paliwo bez
                dodatków komponentów. Co oznacza, że Twój silnik otrzymuje to, co najlepsze.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-brand-card/50 p-6">
              <h2 className="text-lg font-semibold text-brand-green sm:text-xl">Dostawa i sprzedaż oleju napędowego B7</h2>
              <p className="mt-3 leading-relaxed text-gray-300">
                Dostawa i sprzedaż oleju napędowego B7 przez naszą firmę to gwarancja zakupu wysokiej jakości paliwa z
                dowozem pod wskazany adres. Przy czym ON B7 to doskonałe paliwo napędowe z maksymalną zawartość procentową
                biokomponentów, czyli bioestrów FAME, wynoszącą 7%. Oczywiście ON B7 paliwo jest zgodne z obowiązującymi
                normami dotyczącymi zawartości biokomponentów w oleju.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-brand-card/50 p-6">
              <h2 className="text-lg font-semibold text-brand-green sm:text-xl">
                Sprzedaż i dostawa oleju napędowego B0 Diesel
              </h2>
              <p className="mt-3 leading-relaxed text-gray-300">
                Sprzedaż i dostawa oleju napędowego B0 za naszym pośrednictwem zapewnia Ci nabycie wysokiej jakości
                czystego oleju napędowego z dowozem pod wskazany przez Ciebie adres. Oczywiście olej napędowy posiada
                odpowiednie biocydy, które skutecznie chronią go przed szkodliwym skażeniem mikrobiologicznym. Zatem
                kupując u nas ON B0, otrzymujesz czyste paliwo bez dodatków komponentów. Co oznacza, że Twój silnik
                otrzymuje to, co najlepsze.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white sm:text-xl">Diesel B7 czy B0? — podsumowanie</h2>
              <p className="mt-3 leading-relaxed text-gray-300">
                ON B7 jest wysokiej jakości paliwem napędowym przeznaczonym do praktycznie wszystkich typów silników
                diesla. Natomiast ON B0 to paliwo dedykowane najbardziej wymagającym silnikom diesla. Ponadto zapewnia
                nieco szybszy rozruch silnika. Nie zwlekaj i już dziś zadbaj o dostęp do odpowiedniego paliwa dla swojego
                diesla.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
