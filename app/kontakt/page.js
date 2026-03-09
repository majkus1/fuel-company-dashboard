import Image from 'next/image';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

export const metadata = {
  title: 'AGMAR paliwa b7 i b0 | Kontakt',
  description: 'Dostawa paliwa śląsk i małopolska. Wyłącznie paliwo diesel b7 i b0. Posiadamy duże doświadczenie, zapraszamy.',
  keywords: 'paliwo, diesel, dostawa paliwa, kontakt, śląsk, małopolska',
};

export default function Contact() {
  return (
    <>
      <Navigation activePage="contact" />
      <main className="min-h-screen pt-20">
        <section className="container-narrow py-16 md:py-24">
          <h1 className="section-heading">Kontakt</h1>
          <div className="section-heading-accent" />

          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div className="flex flex-col gap-6 lg:gap-8">
              <div className="flex items-center gap-4">
                <img src="/img/telephone.png" alt="" className="h-8 w-8" />
                <div>
                  <a href="tel:+48501060285" className="text-xl font-semibold text-white hover:text-brand-green">
                    501 060 285
                  </a>
                  <p className="mt-1 text-gray-400">42-440 Ogrodzieniec, ul. Słowackiego 13a</p>
                </div>
              </div>

              <p className="text-gray-400 lg:max-w-sm">
                Zadzwoń lub skorzystaj z formularza – chętnie odpowiemy na pytania dotyczące dostawy paliwa w województwie śląskim i małopolskim.
              </p>

              <div className="relative hidden aspect-[4/3] min-h-[200px] overflow-hidden rounded-2xl lg:block">
                <Image
                  src="/img/new-main-pht.jpg"
                  alt="Pojazd AGMAR przewożący paliwo"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 0"
                />
                <div className="contact-image-overlay absolute inset-0 rounded-2xl" aria-hidden />
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
