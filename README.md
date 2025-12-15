# AGMAR Paliwa

Website for a fuel delivery company. Built with Next.js 15, includes an admin dashboard for managing fuel prices.

**Live:** [agmar-paliwa.pl](https://agmar-paliwa.pl)

## Tech Stack

- Next.js 15 (App Router)
- React 19
- MongoDB with Mongoose
- JWT authentication
- SCSS for styling
- Vitest for testing

## Features

- Responsive design
- Admin dashboard with price management
- Contact form with email sending
- Real-time price display
- JWT-based authentication
- Rate limiting on API endpoints
- Input validation and XSS protection

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/agmar_paliwa
JWT_SECRET=your-secret-key-here
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-gmail-app-password
```

3. Initialize database:
```bash
node scripts/create-admin.js
```

4. Run development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
npm start
```

## Testing

```bash
npm test
npm run test:ui
npm run test:coverage
```

## Project Structure

```
app/
  ├── api/          # API routes
  ├── admin/        # Protected admin routes
  ├── components/   # React components
  └── ...
lib/
  ├── models/       # MongoDB models
  ├── auth.js       # JWT & password hashing
  ├── validation.js # Input validation
  └── ...
```

## API Routes

**Public:**
- `GET /api/fuel-price` - Get current fuel price
- `GET /api/date-price` - Get price date
- `POST /api/contact` - Send contact form

**Protected (requires auth):**
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `PUT /api/fuel-price` - Update fuel price
- `PUT /api/date-price` - Update price date

## Security

- JWT tokens in httpOnly cookies
- Rate limiting on all endpoints
- Input validation with Zod
- XSS protection with DOMPurify
- Security headers configured in Next.js

## License

Commercial project. All rights reserved.
