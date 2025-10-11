# 🛢️ AGMAR Paliwa - Modern Fuel Delivery Website

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb?logo=react)](https://react.dev/)
[![Tests](https://img.shields.io/badge/Tests-29%20passing-success)](https://vitest.dev/)
[![Security](https://img.shields.io/badge/Security-A+-green)]()
[![Live](https://img.shields.io/badge/Live-agmar--paliwa.pl-blue)](https://agmar-paliwa.pl)

A modern, secure business website for AGMAR Paliwa - a fuel delivery company operating in Silesia and Lesser Poland regions. Built with Next.js 15 and featuring a secure admin dashboard for real-time price management.

**🔗 Live Site:** [agmar-paliwa.pl](https://agmar-paliwa.pl)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Modern Architecture](#-modern-architecture)
- [Security](#-security)
- [Testing](#-testing)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Routes](#-api-routes)

---

## ✨ Features

### Public Website
- 📱 **Responsive Design** - Mobile-first approach with modern UI/UX
- 🎯 **SEO Optimized** - Meta tags, semantic HTML, performance optimized
- 💰 **Real-time Pricing** - Dynamic fuel price display from database
- 📧 **Contact Form** - Validated email form with rate limiting
- ⚡ **Fast Performance** - Next.js 15 optimizations, image optimization

### Admin Dashboard
- 🔐 **Secure Authentication** - JWT with httpOnly cookies (no localStorage!)
- 🛡️ **Protected Routes** - Middleware-based route protection
- 💵 **Price Management** - Simple interface for updating fuel prices and dates
- 🚫 **Rate Limiting** - Spam protection on all endpoints
- ✅ **Input Validation** - Zod schemas for all data

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - App Router with React Server Components
- **React 19** - Latest React features
- **SCSS** - Modern styling with Sass

### Backend (Integrated)
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - Database with Mongoose ODM
- **Jose** - Modern JWT library (Edge Runtime compatible)
- **Bcrypt** - Secure password hashing

### Testing
- **Vitest 3** - Fast, modern test runner
- **React Testing Library 16** - Component testing
- **29 Tests** - Unit, integration, and component tests
- **100% Pass Rate** - All tests passing

### Security & Validation
- **Zod** - Runtime type validation and sanitization
- **Rate Limiting** - In-memory rate limiter for all endpoints
- **Security Headers** - HSTS, CSP, X-Frame-Options, etc.
- **XSS Protection** - Input sanitization on all user inputs

---

## ⚡ Modern Architecture

This project leverages **Next.js 15 cutting-edge features**:

### Server Components (React Server Components)
- **Direct Database Access** - Server Components fetch data directly from MongoDB (no API routes needed for reads)
- **Zero Client JavaScript** - Price display requires 0 KB of client-side JS
- **SEO Optimized** - Search engines see actual prices in HTML (not client-rendered)
- **Instant Display** - No loading states, data rendered on server

### Data Flow
```
User Request → Next.js Server Component → MongoDB (direct) → HTML with data → Browser
```

**Example: `PriceDisplay` component**
```javascript
// Server Component - runs on server only
import FuelPrice from '@/lib/models/FuelPrice'

export default async function PriceDisplay() {
  // Direct MongoDB query (no HTTP fetch!)
  const fuelPrice = await FuelPrice.findOne()
  return <div>{fuelPrice.price}</div>
}
```

### Benefits
- ✅ **Faster** - No HTTP request overhead, direct DB query
- ✅ **SEO Friendly** - Prices indexed by search engines
- ✅ **Less Code** - No useState/useEffect boilerplate
- ✅ **Better UX** - No loading spinners for users
- ✅ **Smaller Bundle** - Less JavaScript shipped to client

### Connection Pooling
MongoDB connections are **cached** using global singleton pattern:
- First request → connects to MongoDB
- Subsequent requests → reuses existing connection
- Zero connection overhead on repeated calls

---

## 🔒 Security

This project implements **enterprise-grade security practices**:

### Authentication & Authorization
✅ **httpOnly Cookies** - JWT tokens stored securely (not accessible via JavaScript)  
✅ **Middleware Protection** - Automatic route protection for `/admin/*`  
✅ **Secure JWT** - Modern jose library with HS256 algorithm  
✅ **Password Hashing** - bcrypt with salt rounds

### Input Validation & Sanitization
✅ **Zod Schemas** - Runtime validation for all inputs  
✅ **XSS Protection** - HTML sanitization on user inputs  
✅ **Email Validation** - RFC-compliant email checking  
✅ **Phone Validation** - Polish phone number format (9 digits)

### Rate Limiting
- **Login:** 5 attempts per minute per IP
- **Contact Form:** 3 emails per 10 minutes per IP
- **API Reads:** 30 requests per minute per IP
- **Admin Updates:** 10 requests per minute per user

### Security Headers (Next.js Config)
```
Strict-Transport-Security: max-age=63072000
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

---

## 🧪 Testing

Professional test suite with **100% pass rate**:

```bash
npm test              # Run all tests
npm run test:ui       # Visual test interface
npm run test:coverage # Generate coverage report
```

### Test Coverage

| Category | Tests | Coverage |
|----------|-------|----------|
| **Validation** | 12 tests | Input validation, XSS sanitization |
| **Authentication** | 3 tests | Password hashing, bcrypt |
| **Rate Limiting** | 4 tests | Request throttling |
| **API Integration** | 4 tests | Endpoints with auth |
| **React Components** | 6 tests | LoginForm (Client Component) |
| **Total** | **29 tests** | **100% passing** ✅ |

**Note:** Server Components (like `PriceDisplay`) are tested through integration tests and E2E testing, not unit tests.

### Technologies Used
- **Vitest** - Modern, fast test runner (better than Jest for Next.js)
- **React Testing Library** - Best practices for component testing
- **Jest-DOM** - Extended matchers for DOM testing
- **User Event** - User interaction simulation

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or higher
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/agmar_paliwa.git
cd agmar_paliwa-main
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/agmar_paliwa
# Or MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/agmar_paliwa

# JWT Secret (use a long random string in production!)
JWT_SECRET=your-super-secret-jwt-key-min-32-characters

# Gmail for Contact Form
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-gmail-app-password

# Google Analytics (optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX
```

4. **Initialize Database**

Create your first admin user in MongoDB:

```javascript
// In MongoDB shell or Compass:
use agmar_paliwa

db.users.insertOne({
  username: "admin",
  password: "$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa", 
  // password: "admin123" (change after first login!)
  createdAt: new Date(),
  updatedAt: new Date()
})

// Initialize fuel price
db.fuelprices.insertOne({
  price: "5500",
  createdAt: new Date(),
  updatedAt: new Date()
})

// Initialize date price
db.dateprices.insertOne({
  datprice: "2025-01-11",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Or use the helper script:
```bash
node scripts/create-admin.js
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Production Build

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
agmar_paliwa-main/
├── app/                          # Next.js 15 App Router
│   ├── layout.js                # Root layout
│   ├── page.js                  # Home page
│   ├── login/                   # Login page
│   ├── admin/                   # Protected admin routes
│   │   └── update-price/        # Price management dashboard
│   ├── components/              # React components
│   │   ├── Navigation.jsx       # Site navigation
│   │   ├── Footer.jsx           # Site footer
│   │   ├── LoginForm.jsx        # Login form component
│   │   └── PriceDisplay.jsx     # Price display component
│   └── api/                     # API Routes
│       ├── auth/
│       │   ├── login/           # POST - User login
│       │   ├── logout/          # POST - User logout
│       │   └── check/           # GET - Session check
│       ├── fuel-price/          # GET/PUT - Fuel price
│       ├── date-price/          # GET/PUT - Price date
│       └── contact/             # POST - Contact form
├── lib/                         # Utility libraries
│   ├── mongodb.js              # Database connection
│   ├── auth.js                 # JWT & bcrypt functions
│   ├── validation.js           # Zod schemas & sanitization
│   ├── rate-limit.js           # Rate limiting logic
│   └── models/                 # MongoDB models
│       ├── User.js
│       ├── FuelPrice.js
│       └── DatePrice.js
├── middleware.js               # Next.js middleware (route protection)
├── tests/                      # Test suite
│   ├── unit/                   # Unit tests
│   ├── components/             # Component tests
│   └── integration/            # Integration tests
├── styles/                     # SCSS styles
├── public/                     # Static assets
└── next.config.js             # Next.js configuration
```

---

## 🔌 API Routes

### Public Endpoints

#### `GET /api/fuel-price`
Get current fuel price
- **Rate limit:** 30 req/min per IP
- **Response:** `{ price: "5500" }`

#### `GET /api/date-price`
Get current price date
- **Rate limit:** 30 req/min per IP
- **Response:** `{ datprice: "2025-01-11" }`

#### `POST /api/contact`
Send contact form email
- **Rate limit:** 3 emails per 10 min per IP
- **Body:** `{ email, phone, message }`
- **Validation:** Zod schema with sanitization

### Protected Endpoints (Require Authentication)

#### `POST /api/auth/login`
User login
- **Rate limit:** 5 attempts per min per IP
- **Body:** `{ username, password }`
- **Response:** Sets httpOnly cookie

#### `POST /api/auth/logout`
User logout
- **Response:** Clears httpOnly cookie

#### `GET /api/auth/check`
Check authentication status
- **Response:** `{ authenticated: true/false }`

#### `PUT /api/fuel-price`
Update fuel price (admin only)
- **Rate limit:** 10 req/min per user
- **Body:** `{ price: "5600" }`
- **Auth:** Required (JWT in httpOnly cookie)

#### `PUT /api/date-price`
Update price date (admin only)
- **Rate limit:** 10 req/min per user
- **Body:** `{ datprice: "2025-01-12" }`
- **Auth:** Required (JWT in httpOnly cookie)

---

## 🎯 Key Highlights for Recruiters

### Modern Architecture
- ✅ **Next.js 15 App Router** - Latest features, Server Components
- ✅ **Integrated Backend** - No separate Express server needed
- ✅ **Edge Runtime Compatible** - Optimized for serverless

### Security Best Practices
- ✅ **httpOnly Cookies** - No localStorage vulnerabilities
- ✅ **Rate Limiting** - DDoS and spam protection
- ✅ **Input Sanitization** - XSS attack prevention
- ✅ **Middleware Protection** - Automatic route guarding

### Code Quality
- ✅ **29 Tests, 100% Pass** - Professional test coverage
- ✅ **Zod Validation** - Type-safe runtime validation
- ✅ **Clean Architecture** - Separation of concerns
- ✅ **Modern ES6+** - Async/await, destructuring, modules

### Production Ready
- ✅ **0 Vulnerabilities** - All dependencies secure
- ✅ **Performance Optimized** - Image optimization, compression
- ✅ **SEO Friendly** - Proper meta tags, semantic HTML
- ✅ **Live in Production** - Running on VPS with SSL

---

## 📊 Performance Metrics

- ⚡ **Build Time:** ~15s
- 🧪 **Test Execution:** ~7s (29 tests)
- 🚀 **First Load:** Optimized with Next.js image optimization
- 🔒 **Security Score:** A+ (all headers configured)

---

## 📝 License

This is a commercial project for AGMAR Paliwa. All rights reserved.

---

## 👨‍💻 Developer

Built with modern web technologies and security best practices.

**Contact:** [Your contact information]

---

## 🔗 Links

- **Live Site:** [agmar-paliwa.pl](https://agmar-paliwa.pl)
- **Documentation:** See `/tests/README.md` for testing details
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)

---

**⭐ If you're a recruiter:** This project demonstrates advanced Next.js skills, security awareness, testing practices, and production deployment experience. Feel free to explore the codebase and run the tests locally!
