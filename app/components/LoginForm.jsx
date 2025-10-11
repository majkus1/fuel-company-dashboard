// app/components/LoginForm.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Invalid username or password');
        setIsSubmitting(false);
        return;
      }

      // Success - redirect to admin panel
      router.push('/admin/update-price');
    } catch (error) {
      console.error('Login error:', error);
      setError('Wystąpił błąd podczas logowania');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-to-panel">
      <h1>AGMAR</h1>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Login"
        required
        disabled={isSubmitting}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Hasło"
        required
        disabled={isSubmitting}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logowanie...' : 'Zaloguj'}
      </button>
    </form>
  );
}

