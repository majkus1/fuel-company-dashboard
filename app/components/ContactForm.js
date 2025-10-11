// app/components/ContactForm.js
'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({ email: '', phone: '', message: '' });
  const [statusMessage, setStatusMessage] = useState('');
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

    // Reset status
    setStatusMessage('');
    setIsSubmitting(true);

    // Validation
    let errors = { email: '', phone: '', message: '' };

    if (!validateEmail(email)) {
      errors.email = 'Niepoprawny format e-mail';
    }

    if (!validatePhone(phone)) {
      errors.phone = 'Niepoprawny format numeru telefonu (9 cyfr)';
    }

    if (!validateMessage(message)) {
      errors.message = 'Wiadomość musi mieć co najmniej 10 znaków';
    }

    setErrors(errors);

    if (errors.email === '' && errors.phone === '' && errors.message === '') {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, phone, message }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Błąd sieci!');
        }

        setStatusMessage(data.message);
        // Reset form
        setEmail('');
        setPhone('');
        setMessage('');
      } catch (error) {
        console.error('Błąd:', error);
        setStatusMessage(error.message || 'Wystąpił błąd podczas wysyłania wiadomości');
      }
    }

    setIsSubmitting(false);
  };

  return (
    <form className="contact contactform" name="myform" onSubmit={handleSubmit}>
      <p>Formularz kontaktowy:</p>
      <div>
        <label htmlFor="mail">E-mail:</label>
        <input
          type="email"
          name="Email"
          id="mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
        />
        <br />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="number">Telefon:</label>
        <input
          type="tel"
          name="Number"
          id="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={isSubmitting}
        />
        <br />
        {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
      </div>
      <div className="textarea">
        <label htmlFor="msg">Wiadomość:</label>
        <br />
        <textarea
          name="Message"
          id="msg"
          cols="30"
          rows="10"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isSubmitting}
        ></textarea>
      </div>
      {errors.message && <span style={{ color: 'red' }}>{errors.message}</span>}
      <div className="status-message" style={{ marginTop: '10px', fontWeight: 'bold' }}>
        {statusMessage}
      </div>
      <button type="submit" name="Login" value="submit" className="border" disabled={isSubmitting}>
        {isSubmitting ? 'Wysyłanie...' : 'Wyślij'}
      </button>
    </form>
  );
}

