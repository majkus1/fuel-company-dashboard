// app/o-firmie/page.js
import Image from 'next/image';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export const metadata = {
  title: 'AGMAR paliwa b7 i b0 | O firmie',
  description: 'Dostawa paliwa śląsk i małopolska. Wyłącznie paliwo diesel b7 i b0. Posiadamy duże doświadczenie, zapraszamy.',
  keywords: 'paliwo, diesel, dostawa paliwa, sprzedaż paliw, diesel b7, diesel b0, b7, b0, paliwo śląsk, paliwo małopolska',
};

export default function About() {
  return (
    <>
      <header id="headernav">
        <Navigation activePage="about" />
      </header>

      <div className="section wrapper" id="o-firmie">
        <section className="aboutcompany">
          <div className="infoaboutcompany">
            <div className="abouttext">
              <h3>O firmie</h3>
              <div className="line line-left"></div>
              <div className="shortline shortline-left"></div>
              <p>
                Nasza firma oferuje głównie olej napędowy najwyższej jakości oraz transport paliwa na terenie
                województwa śląskiego oraz małopolskiego. Dostarczamy wyłącznie paliwo od największych polskich
                producentów.
              </p>
              <div className="imgaboutdesktop">
                <Image
                  src="/img/flota3.webp"
                  alt="pojazd firmy a w tle rafinferia"
                  className="imgaboutdesktop"
                  sizes="100vw"
                  width={760}
                  height={230}
                  loading="eager"
                />
              </div>
              <div className="imgabout">
                <Image
                  src="/img/flota3.webp"
                  alt="pojazd firmy a w tle rafinferia"
                  sizes="100vw"
                  style={{ width: '100%', height: '120' }}
                  width={0}
                  height={120}
                  loading="eager"
                />
              </div>
              <h2>Co nas wyróżnia?</h2>
              <p>
                Wyróżnia nas duże doświadczenie w branży, gdyż zajmujemy się sprzedażą paliw od 2006 roku. Udało nam się
                zrealizować tysiące zamówień, czego wynikiem są zadowoleni klienci, którzy chętnie ponownie korzystają z
                naszych usług, dzięki możliwości łatwego i szybkiego kontaktu z nami.
              </p>
              <h2>Dla kogo jesteśmy?</h2>
              <p>
                Obsługujemy indywidualnych odbiorców, bazy transportowe oraz stacje paliw. Dbamy o naszych klientów a
                każda dostawa posiada świadectwo jakości.
              </p>
            </div>
          </div>
          <div className="abouticon">
            <div className="iconsone">
              <div className="years">
                <img src="/img/calendar.png" alt="znaczek kalendarza" />
                <p>
                  16 lat <br /> doświadczenia
                </p>
              </div>
              <div className="clients">
                <img src="/img/team.png" alt="znaczek uściśniętych dłoni" />
                <p>
                  Tysiące zrealizowanych <br /> zamówień
                </p>
              </div>
            </div>
            <div className="iconstwo">
              <div className="fasttransport">
                <img src="/img/express-delivery.png" alt="znaczek samochodu z dostawą" />
                <p>
                  Terminowa i szybka <br /> dostawa
                </p>
              </div>
              <div className="contacts">
                <img src="/img/communicate.png" alt="znaczek komunkacji mailem lub telefonem" />
                <p>
                  Szybki i łatwy <br /> kontakt
                </p>
              </div>
            </div>
          </div>

          <div className="abouticondesktop">
            <div className="years">
              <img src="/img/calendar.png" alt="znaczek kalendarza" />
              <p>16 lat doświadczenia</p>
            </div>
            <div className="clients">
              <img src="/img/team.png" alt="znaczek uściśniętych dłoni" />
              <p>Tysiące zrealizowanych zamówień</p>
            </div>
            <div className="fasttransport">
              <img src="/img/express-delivery.png" alt="znaczek samochodu z dostawą" />
              <p>Terminowa i szybka dostawa</p>
            </div>
            <div className="contacts">
              <img src="/img/communicate.png" alt="znaczek komunkacji mailem lub telefonem" />
              <p>Szybki i łatwy kontakt</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

