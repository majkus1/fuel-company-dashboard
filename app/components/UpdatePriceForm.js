'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UpdatePriceForm() {
  const [price, setPrice] = useState('');
  const [datprice, setDatPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        if (!response.ok) router.push('/login');
      } catch {
        router.push('/login');
      }
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [priceRes, dateRes] = await Promise.all([
          fetch('/api/fuel-price'),
          fetch('/api/date-price'),
        ]);
        if (priceRes.ok) {
          const d = await priceRes.json();
          setPrice(d.price);
        }
        if (dateRes.ok) {
          const d = await dateRes.json();
          setDatPrice(d.datprice);
        }
      } catch (e) {
        console.error('Error fetching data', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSubmitting(true);
    try {
      const [priceRes, dateRes] = await Promise.all([
        fetch('/api/fuel-price', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ price }),
        }),
        fetch('/api/date-price', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ datprice }),
        }),
      ]);
      if (!priceRes.ok || !dateRes.ok) {
        const d = await priceRes.json();
        throw new Error(d.error || 'Failed to update');
      }
      setMessage('✅ Cena i data zostały zaktualizowane pomyślnie!');
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      setMessage(`❌ ${err.message || 'Nie udało się zaktualizować ceny i daty'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (e) {
      console.error('Logout error', e);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-slate px-4">
        <div className="rounded-2xl border border-white/10 bg-brand-card/80 px-8 py-12 text-center">
          <h1 className="text-2xl font-bold text-brand-green">AGMAR</h1>
          <p className="mt-4 text-gray-400">Ładowanie...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-slate px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-brand-card/80 p-8 shadow-2xl backdrop-blur-sm">
        <h1 className="text-center text-3xl font-bold text-brand-green">AGMAR</h1>
        <p className="mt-2 text-center text-sm text-gray-400">Aktualizacja ceny i daty</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {message && (
            <div
              className={`rounded-xl px-4 py-3 text-sm font-medium ${
                message.includes('✅')
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-red-500/20 text-red-400'
              }`}
            >
              {message}
            </div>
          )}
          <div>
            <label htmlFor="price" className="mb-1.5 block text-sm font-medium text-gray-300">
              Nowa cena
            </label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={isSubmitting}
              className="input-field"
              placeholder="Nowa cena"
              required
            />
          </div>
          <div>
            <label htmlFor="datprice" className="mb-1.5 block text-sm font-medium text-gray-300">
              Data nowej ceny
            </label>
            <input
              type="text"
              id="datprice"
              value={datprice}
              onChange={(e) => setDatPrice(e.target.value)}
              disabled={isSubmitting}
              className="input-field"
              placeholder="Data nowej ceny"
              required
            />
          </div>
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
            {isSubmitting ? 'Aktualizacja...' : 'Zmień cenę i datę'}
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/10 pt-6">
          <Link href="/" className="text-sm text-gray-400 underline hover:text-brand-green">
            Strona główna
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm text-gray-400 underline hover:text-red-400"
          >
            Wyloguj
          </button>
        </div>
      </div>
    </div>
  );
}
