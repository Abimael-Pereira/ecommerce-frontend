import { render, screen } from '@testing-library/react';
import LoginPage from './login.page';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import * as firebaseAuth from 'firebase/auth';
import { AuthErrorCodes } from 'firebase/auth';

jest.mock('firebase/auth');

describe('Login', () => {
  it('should show errors when trying to submit an empty form', async () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );

    const loginButton = screen.getByTestId('login-submit');
    await userEvent.click(loginButton);

    expect(screen.getByText(/e-mail é obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/senha é obrigatória/i)).toBeInTheDocument();
  });

  it('should show error if email is invalid', async () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );

    const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i);
    userEvent.type(emailInput, 'invalid-email');

    const loginButton = screen.getByTestId('login-submit');
    await userEvent.click(loginButton);

    expect(screen.getByText(/insira um e-mail válido/i)).toBeInTheDocument();
  });

  it('should show an error if email is not found', async () => {
    const mockFirebaseAuth = firebaseAuth as any;

    mockFirebaseAuth.signInWithEmailAndPassword.mockImplementation(() =>
      Promise.reject({ code: AuthErrorCodes.INVALID_LOGIN_CREDENTIALS }),
    );

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );

    const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i);
    await userEvent.type(emailInput, 'lorem@ipsum.com');

    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    await userEvent.type(passwordInput, '123456');

    const loginButton = screen.getByTestId('login-submit');
    await userEvent.click(loginButton);

    expect(
      screen.getByText(/o e-mail ou a senha estão incorretos/i),
    ).toBeInTheDocument();
  });
});
