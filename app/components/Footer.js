import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0f14197a]">
      <div className="container-narrow py-6 sm:py-12">
        <div className="flex flex-row flex-wrap items-center justify-between gap-4 sm:gap-8">
          <div className="flex flex-row items-center gap-3 sm:gap-6">
            <div
              className="relative h-9 w-9 shrink-0 sm:h-12 sm:w-12"
            >
              <Image
                src="/img/oils.png"
                alt="AGMAR"
                fill
                className="object-contain"
              />
            </div>
            <div className="min-w-0 text-xs sm:text-sm">
              <p className="font-bold text-brand-green sm:text-lg">| AGMAR |</p>
              <p className="text-gray-400">Sprzedaż i dostawa paliw</p>
              <p className="text-gray-400">Śląsk i małopolska</p>
              <p className="text-gray-400">16 lat doświadczenia</p>
            </div>
          </div>
          <div className="shrink-0 text-right text-xs sm:text-sm">
            <a
              href="tel:+48501060285"
              className="font-semibold text-white hover:text-brand-green sm:text-lg"
            >
              +48 501 060 285
            </a>
            <p className="mt-1 text-gray-400">
              42-440 Ogrodzieniec
              <br />
              ul. Słowackiego 13a
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
