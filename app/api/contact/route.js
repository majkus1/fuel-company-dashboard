// app/api/contact/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { contactFormSchema, sanitizeInput } from '@/lib/validation';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

/**
 * POST /api/contact
 * Send contact form email
 */
export async function POST(request) {
  try {
    // Rate limiting - max 3 emails per 10 minutes per IP
    const ip = getClientIp(request);
    const rateLimitResult = checkRateLimit(`contact-${ip}`, 3, 600000);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many emails sent. Please try again later.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          }
        }
      );
    }

    const body = await request.json();
    
    // Sanitize inputs
    const sanitizedBody = {
      email: sanitizeInput(body.email),
      phone: sanitizeInput(body.phone),
      message: sanitizeInput(body.message),
    };

    // Validate input
    const validationResult = contactFormSchema.safeParse(sanitizedBody);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { email, phone, message } = validationResult.data;

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'michalipka1@gmail.com',
      replyTo: email,
      subject: 'Nowa wiadomość z formularza kontaktowego - AGMAR Paliwa',
      text: `
Od: ${email}
Telefon: ${phone}

Wiadomość:
${message}
      `,
      html: `
        <h2>Nowa wiadomość z formularza kontaktowego</h2>
        <p><strong>Od:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <h3>Wiadomość:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Wiadomość wysłana pomyślnie' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas wysyłania wiadomości' },
      { status: 500 }
    );
  }
}

