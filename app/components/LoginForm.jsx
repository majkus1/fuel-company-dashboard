'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Invalid username or password');
        setIsSubmitting(false);
        return;
      }
      router.push('/admin/update-price');
    } catch (err) {
      setError('Wystąpił błąd podczas logowania');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-slate px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-brand-card/80 p-8 shadow-2xl backdrop-blur-sm">
        <h1 className="text-center text-3xl font-bold text-brand-green">AGMAR</h1>
        <p className="mt-2 text-center text-sm text-gray-400">Panel administracyjny</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <div className="rounded-xl bg-red-500/20 px-4 py-3 text-sm text-red-400">{error}</div>
          )}
          <div>
            <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-gray-300">
              Login
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isSubmitting}
              className="input-field"
              placeholder="Login"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-300">
              Hasło
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              className="input-field"
              placeholder="Hasło"
              required
            />
          </div>
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
            {isSubmitting ? 'Logowanie...' : 'Zaloguj'}
          </button>
        </form>
        <p className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-400 underline hover:text-brand-green">
            Powrót na stronę główną
          </Link>
        </p>
      </div>
    </div>
  );
}
