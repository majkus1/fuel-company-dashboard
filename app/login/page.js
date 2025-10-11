// app/login/page.js
import LoginForm from '../components/LoginForm.jsx';

export const metadata = {
  title: 'AGMAR | Login',
  description: 'Panel logowania administratora',
  robots: 'noindex, nofollow', // Don't index admin pages
};

export default function Login() {
  return <LoginForm />;
}

