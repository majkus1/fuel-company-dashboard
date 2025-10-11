// app/components/UpdatePriceForm.jsx
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
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        if (!response.ok) {
          router.push('/login');
          return;
        }
      } catch (error) {
        router.push('/login');
        return;
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [priceResponse, datePriceResponse] = await Promise.all([
          fetch('/api/fuel-price'),
          fetch('/api/date-price'),
        ]);

        if (priceResponse.ok) {
          const priceData = await priceResponse.json();
          setPrice(priceData.price);
        }

        if (datePriceResponse.ok) {
          const dateData = await datePriceResponse.json();
          setDatPrice(dateData.datprice);
        }
      } catch (error) {
        console.error('Error fetching data', error);
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
      const [priceResponse, dateResponse] = await Promise.all([
        fetch('/api/fuel-price', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ price }),
        }),
        fetch('/api/date-price', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ datprice }),
        }),
      ]);

      if (!priceResponse.ok || !dateResponse.ok) {
        const priceData = await priceResponse.json();
        throw new Error(priceData.error || 'Failed to update');
      }

      setMessage('✅ Cena i data zostały zaktualizowane pomyślnie!');
      
      // Refresh the page data after 1 second
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Update error:', error);
      setMessage(`❌ ${error.message || 'Nie udało się zaktualizować ceny i daty'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="login-to-panel">
        <h1>AGMAR</h1>
        <p>Ładowanie...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="login-to-panel">
      <h1>AGMAR</h1>
      
      {message && (
        <div style={{ 
          margin: '10px 0', 
          padding: '10px', 
          backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da',
          color: message.includes('✅') ? '#155724' : '#721c24',
          borderRadius: '5px'
        }}>
          {message}
        </div>
      )}

      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Nowa cena"
        required
        disabled={isSubmitting}
      />
      <input
        type="text"
        value={datprice}
        onChange={(e) => setDatPrice(e.target.value)}
        placeholder="Data nowej ceny"
        required
        disabled={isSubmitting}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Aktualizacja...' : 'Zmień cenę i datę'}
      </button>

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center', flexDirection: 'column', gap: '50px' }}>
        <Link href="/" style={{ color: '#fff', textDecoration: 'underline', marginTop: '25px' }}>
          Strona główna
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: '#fff', 
            textDecoration: 'underline',
            cursor: 'pointer'
          }}
        >
          Wyloguj
        </button>
      </div>
    </form>
  );
}

