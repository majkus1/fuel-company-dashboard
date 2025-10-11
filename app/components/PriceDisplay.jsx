// app/components/PriceDisplay.jsx

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
    <div className="callprice">
      <div className="callaction">
        <a href="tel:+48501060285">
          <img src="/img/phone-call.png" alt="telefon" />
          501-060-285
        </a>
      </div>
      <div className="priceoil">
        <p className="dayprice">
          Cena z dnia <span>{datprice}</span>
        </p>
        <p className="onoil">ON</p>
        <p className="amount">
          <span>{price}</span> zł/m3
        </p>
      </div>
    </div>
  );
}

