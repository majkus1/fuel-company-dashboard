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
    <div className="fixed bottom-0 left-0 right-0 z-30 flex flex-col border-t border-brand-green/30 bg-brand-slate/95 shadow-2xl backdrop-blur-xl sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md sm:rounded-2xl sm:border sm:border-brand-green/30">
      <a
        href="tel:+48501060285"
        className="flex items-center justify-center gap-2 border-b border-brand-green/20 bg-brand-card/80 py-3 transition-colors hover:bg-brand-muted/50 sm:rounded-t-2xl"
      >
        <img src="/img/phone-call.png" alt="" className="h-5 w-5" />
        <span className="font-semibold text-white">501-060-285</span>
      </a>
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Cena z dnia</span>
          <span className="font-medium italic text-white">{datprice}</span>
        </div>
        <div className="rounded-lg bg-black px-3 py-1.5">
          <span className="text-sm font-bold text-white">ON</span>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-brand-green">{price}</span>
          <span className="ml-1 text-sm text-gray-400">zł/m³</span>
        </div>
      </div>
    </div>
  );
}
