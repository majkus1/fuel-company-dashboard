// app/admin/update-price/page.js
import UpdatePriceForm from '../../components/UpdatePriceForm';

export const metadata = {
  title: 'AGMAR | Update Price',
  description: 'Panel aktualizacji cen paliwa',
  robots: 'noindex, nofollow',
};

export default function UpdatePrice() {
  return <UpdatePriceForm />;
}

