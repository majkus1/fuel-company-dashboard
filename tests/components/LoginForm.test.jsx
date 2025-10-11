// tests/components/LoginForm.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '@/app/components/LoginForm';

// Mock next/navigation
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock fetch
global.fetch = vi.fn();

describe('LoginForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render login form with all fields', () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText('Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Hasło')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /zaloguj/i })).toBeInTheDocument();
  });

  it('should handle successful login', async () => {
    const user = userEvent.setup();

    // Mock successful login response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Login successful' }),
    });

    render(<LoginForm />);

    // Fill in the form
    await user.type(screen.getByPlaceholderText('Login'), 'admin');
    await user.type(screen.getByPlaceholderText('Hasło'), 'password123');

    // Submit
    await user.click(screen.getByRole('button', { name: /zaloguj/i }));

    // Should redirect after successful login
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/admin/update-price');
    });
  });

  it('should show error message on failed login', async () => {
    const user = userEvent.setup();

    // Mock failed login response
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid username or password' }),
    });

    render(<LoginForm />);

    // Fill in the form
    await user.type(screen.getByPlaceholderText('Login'), 'wronguser');
    await user.type(screen.getByPlaceholderText('Hasło'), 'wrongpass');

    // Submit
    await user.click(screen.getByRole('button', { name: /zaloguj/i }));

    // Should show error message
    await waitFor(() => {
      expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
    });
  });

  it('should disable form during submission', async () => {
    const user = userEvent.setup();

    // Mock slow API response
    global.fetch.mockImplementation(() => new Promise(() => {}));

    render(<LoginForm />);

    await user.type(screen.getByPlaceholderText('Login'), 'admin');
    await user.type(screen.getByPlaceholderText('Hasło'), 'password123');
    await user.click(screen.getByRole('button', { name: /zaloguj/i }));

    // Form fields should be disabled
    expect(screen.getByPlaceholderText('Login')).toBeDisabled();
    expect(screen.getByPlaceholderText('Hasło')).toBeDisabled();
    expect(screen.getByRole('button', { name: /logowanie/i })).toBeDisabled();
  });

  it('should require both username and password', () => {
    render(<LoginForm />);

    const usernameInput = screen.getByPlaceholderText('Login');
    const passwordInput = screen.getByPlaceholderText('Hasło');

    expect(usernameInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });
});

