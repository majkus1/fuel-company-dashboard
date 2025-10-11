// app/kontakt/page.js
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import Image from 'next/image';

export const metadata = {
  title: 'AGMAR paliwa b7 i b0 | Kontakt',
  description: 'Dostawa paliwa śląsk i małopolska. Wyłącznie paliwo diesel b7 i b0. Posiadamy duże doświadczenie, zapraszamy.',
  keywords: 'paliwo, diesel, dostawa paliwa, kontakt, śląsk, małopolska',
};

export default function Contact() {
  return (
    <>
      <header id="headernav">
        <Navigation activePage="contact" />
      </header>

      <div className="section wrapper" id="kontakt">
        <section className="contact">
          <h3>Kontakt</h3>
          <div className="line line-left"></div>
          <div className="shortline shortline-left"></div>
          <div className="contactus">
            <p>
              <img src="/img/telephone.png" alt="znaczek słuchawki telefonu" />
              <strong>501 060 285</strong>
              <br />
              42-440 Ogrodzieniec <br /> ul. Słowackiego 13a <br />
              <Image
                src="/img/flotacontact.webp"
                alt="zdjęcie zrobione na trasie pojazdu przewożącego paliwo"
                className="flotacontact"
                width={230}
                height={200}
              />
            </p>
            <img
              src="/img/contactphoto.webp"
              alt="zdjęcie zrobione na trasie pojazdu przewożącego paliwo"
              className="contactfoto"
              loading="eager"
            />

            <ContactForm />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

