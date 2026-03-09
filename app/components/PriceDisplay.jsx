import connectDB from '@/lib/mongodb';
import FuelPrice from '@/lib/models/FuelPrice';
import DatePrice from '@/lib/models/DatePrice';

async function getPriceData() {
  try {
    await connectDB();

    const [fuelPrice, datePrice] = await Promise.all([
      FuelPrice.findOne().sort({ updatedAt: -1 }).lean(),
      DatePrice.findOne().sort({ updatedAt: -1 }).lean()
    ]);

    return {
      price: fuelPrice?.price || 'N/A',
      datprice: datePrice?.datprice || 'N/A'
    };
  } catch (error) {
    console.error('Error fetching price data:', error);
    return { price: 'N/A', datprice: 'N/A' };
  }
}

export default async function PriceDisplay() {
  const { price, datprice } = await getPriceData();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 flex flex-col border-t border-brand-green/30 bg-brand-slate/95 shadow-2xl backdrop-blur-xl sm:bottom-6 sm:left-1/2 sm:right-auto sm:w-full sm:max-w-2xl sm:-translate-x-1/2 sm:rounded-2xl sm:border sm:border-brand-green/30">
      {/* Mobile: pasek telefonu na górze, pod spodem pasek ceny (data, ON, kwota). Desktop: jedna linia – cena z lewej, telefon z prawej */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-4">
        <div className="order-last flex items-center justify-between gap-4 px-4 py-3 sm:order-first sm:flex-1 sm:justify-start sm:gap-4 sm:px-0 sm:py-0" style={{ justifyContent: 'center' }}>
          <div className="flex flex-row items-center gap-3">
            <div>
              <span className="text-xs text-gray-400">Cena z dnia </span>
              <span className="font-medium italic text-white">{datprice}</span>
            </div>
            <div className="rounded-lg bg-black px-3 py-1.5">
              <span className="text-sm font-bold text-white">ON</span>
            </div>
            <div className="text-right sm:text-left">
              <span className="text-lg font-bold text-brand-green">{price}</span>
              <span className="ml-1 text-sm text-gray-400">zł/m³</span>
            </div>
          </div>
        </div>
        <a
          href="tel:+48501060285"
          className="order-first flex items-center justify-center gap-2 border-b border-brand-green/20 bg-brand-card/80 py-3 transition-colors hover:bg-brand-muted/50 sm:order-last sm:border-b-0 sm:border-l sm:border-brand-green/20 sm:bg-transparent sm:py-0 sm:pl-6"
        >
          <img src="/img/phone-call.png" alt="" className="h-5 w-5" />
          <span className="font-semibold text-white">501-060-285</span>
        </a>
      </div>
    </div>
  );
}
