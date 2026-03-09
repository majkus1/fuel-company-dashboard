'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({ email: '', phone: '', message: '' });
  const [statusMessage, setStatusMessage] = useState('');
  const [statusIsSuccess, setStatusIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9\b]+$/;
    return phoneRegex.test(phone) && phone.length === 9;
  };

  const validateMessage = (message) => {
    return message.length >= 10;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage('');
    setStatusIsSuccess(false);
    setIsSubmitting(true);

    const newErrors = { email: '', phone: '', message: '' };
    if (!validateEmail(email)) newErrors.email = 'Niepoprawny format e-mail';
    if (!validatePhone(phone)) newErrors.phone = 'Niepoprawny format numeru telefonu (9 cyfr)';
    if (!validateMessage(message)) newErrors.message = 'Wiadomość musi mieć co najmniej 10 znaków';
    setErrors(newErrors);

    if (Object.values(newErrors).every((e) => !e)) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, phone, message }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Błąd sieci!');
        setStatusIsSuccess(true);
        setStatusMessage(data.message);
        setEmail('');
        setPhone('');
        setMessage('');
      } catch (error) {
        setStatusIsSuccess(false);
        setStatusMessage(error.message || 'Wystąpił błąd podczas wysyłania wiadomości');
      }
    }
    setIsSubmitting(false);
  };

  return (
    <form
      name="myform"
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-brand-card/50 p-6 shadow-xl sm:p-8"
    >
      <h2 className="text-xl font-semibold text-brand-green">Formularz kontaktowy</h2>
      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="mail" className="mb-1.5 block text-sm font-medium text-gray-300">
            E-mail
          </label>
          <input
            type="email"
            name="Email"
            id="mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            className="input-field"
            placeholder="twoj@email.pl"
          />
          {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="number" className="mb-1.5 block text-sm font-medium text-gray-300">
            Telefon
          </label>
          <input
            type="tel"
            name="Number"
            id="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={isSubmitting}
            className="input-field"
            placeholder="123456789"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="msg" className="mb-1.5 block text-sm font-medium text-gray-300">
            Wiadomość
          </label>
          <textarea
            name="Message"
            id="msg"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSubmitting}
            className="input-field min-h-[120px] resize-y"
            placeholder="Treść wiadomości..."
          />
          {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
        </div>
        {statusMessage && (
          <p
            className={`rounded-lg px-3 py-2 text-sm font-medium ${
              statusIsSuccess ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
            }`}
          >
            {statusMessage}
          </p>
        )}
        <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto">
          {isSubmitting ? 'Wysyłanie...' : 'Wyślij'}
        </button>
      </div>
    </form>
  );
}
