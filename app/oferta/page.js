// app/oferta/page.js
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
      <header id="headernav">
        <Navigation activePage="offer" />
      </header>

      <div className="section wrapper" id="oferta">
        <section className="offer">
          <h3>Nasza oferta</h3>
          <div className="line line-left"></div>
          <div className="shortline shortline-left"></div>

          <div className="offertextmobile">
            <h1>Sprzedaż i dostawa olejów napędowych B7 i B0 Diesel</h1>
            <p>
              Sprzedaż i dostawa olejów napędowych B7 i B0 Diesel najwyższej jakości w konkurencyjnej cenie. Oczywiście
              dostawa pod wskazany przez Ciebie adres. Bez stresu. Dla własnego komfortu. Czyli dokładnie tak, jak
              lubisz. Nie zwlekaj i już dziś zadbaj o dostęp do odpowiedniego paliwa dla swojego diesla.
            </p>
            <h2>Diesel B7 czy B0?</h2>
            <p>
              ON B7 jest wysokiej jakości paliwem napędowym przeznaczonym do praktycznie wszystkich typów silników
              diesla. To doskonałe paliwo napędowe z maksymalną zawartość procentową biokomponentów, czyli bioestrów
              FAME, wynoszącą 7%. Oczywiście ON B7 paliwo jest zgodne z obowiązującymi normami dotyczącymi zawartości
              biokomponentów w oleju. <br />
              Natomiast ON B0 to paliwo dedykowane najbardziej wymagającym silnikom
              diesla. Ponadto zapewnia nieco szybszy rozruch silnika. Oczywiście olej napędowy posiada odpowiednie
              biocydy, które skutecznie chronią go przed szkodliwym skażeniem mikrobiologicznym. Zatem kupując u nas ON
              B0, otrzymujesz czyste paliwo bez dodatków komponentów. Co oznacza, że Twój silnik otrzymuje to, co
              najlepsze.
            </p>
          </div>
          <div className="offertextdesktop">
            <h1>Sprzedaż i dostawa olejów napędowych B7 i B0 Diesel</h1>
            <p>
              Sprzedaż i dostawa olejów napędowych B7 i B0 Diesel w województwie śląskim oraz małopolskim. Paliwo
              najwyższej jakości w konkurencyjnej cenie. Oczywiście dostawa pod wskazany przez Ciebie adres. Bez stresu.
              Dla własnego komfortu. Czyli dokładnie tak, jak lubisz.
            </p>
            <h2>Dostawa i sprzedaż oleju napędowego B7</h2>
            <p>
              Dostawa i sprzedaż oleju napędowego B7 przez naszą firmę to gwarancja zakupu wysokiej jakości paliwa z
              dowozem pod wskazany adres. Przy czym ON B7 to doskonałe paliwo napędowe z maksymalną zawartość procentową
              biokomponentów, czyli bioestrów FAME, wynoszącą 7%. Oczywiście ON B7 paliwo jest zgodne z obowiązującymi
              normami dotyczącymi zawartości biokomponentów w oleju.
            </p>
            <h2>Sprzedaż i dostawa oleju napędowego B0 Diesel</h2>
            <p>
              Sprzedaż i dostawa oleju napędowego B0 za naszym pośrednictwem zapewnia Ci nabycie wysokiej jakości
              czystego oleju napędowego z dowozem pod wskazany przez Ciebie adres. Oczywiście olej napędowy posiada
              odpowiednie biocydy, które skutecznie chronią go przed szkodliwym skażeniem mikrobiologicznym. Zatem
              kupując u nas ON B0, otrzymujesz czyste paliwo bez dodatków komponentów. Co oznacza, że Twój silnik
              otrzymuje to, co najlepsze.
            </p>
            <h2>Diesel B7 czy B0?</h2>
            <p>
              ON B7 jest wysokiej jakości paliwem napędowym przeznaczonym do praktycznie wszystkich typów silników
              diesla. Natomiast ON B0 to paliwo dedykowane najbardziej wymagającym silnikom diesla. Ponadto zapewnia
              nieco szybszy rozruch silnika. Nie zwlekaj i już dziś zadbaj o dostęp do odpowiedniego paliwa dla swojego
              diesla.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

