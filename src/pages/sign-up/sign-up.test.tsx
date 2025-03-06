import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUpPage from './sign-up.page';
import userEvent from '@testing-library/user-event';
import * as firebaseAuth from 'firebase/auth';
import { AuthErrorCodes } from 'firebase/auth';

jest.mock('firebase/auth');

describe('Sign Up', () => {
  it('should show error when trying to submit whitout filling all required fields', async () => {
    render(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>,
    );

    const submitButton = screen.getByRole('button', { name: 'Criar conta' });
    await userEvent.click(submitButton);

    await screen.findByText('Nome é obrigatório');
    await screen.findByText('Sobrenome é obrigatório');
    await screen.findByText('E-mail é obrigatório');
    await screen.findByText('Senha é obrigatória');
    await screen.findByText('Confirmação de senha é obrigatória');
  });

  it('should show error when filling an invalid email', async () => {
    render(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>,
    );

    const emailInput = screen.getByPlaceholderText('Digite seu e-mail');
    await userEvent.type(emailInput, 'invalid-email');

    const submitButton = screen.getByRole('button', { name: 'Criar conta' });
    await userEvent.click(submitButton);

    await screen.findByText('Insira um e-mail válido');
  });

  it('should show error when password and password confirmation are different', async () => {
    render(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>,
    );

    const passwordInput = screen.getByPlaceholderText('Digite sua senha');
    const passwordConfirmInput = screen.getByPlaceholderText(
      'Digite novamente sua senha',
    );

    await userEvent.type(passwordInput, '123456');
    await userEvent.type(passwordConfirmInput, 'abcdef');

    const submitButton = screen.getByRole('button', { name: 'Criar conta' });
    await userEvent.click(submitButton);

    await screen.findByText('As senhas não são iguais');
  });

  it('should show error when password has less then 6 characters', async () => {
    render(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>,
    );

    const passwordInput = screen.getByPlaceholderText('Digite sua senha');
    await userEvent.type(passwordInput, '123');

    const submitButton = screen.getByRole('button', { name: 'Criar conta' });
    await userEvent.click(submitButton);

    await screen.findByText('Sua senha deve ter no mímino 6 caracteres');
  });

  it('should show error if email already exists', async () => {
    render(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>,
    );

    const mockFirebaseAuth = firebaseAuth as any;

    mockFirebaseAuth.createUserWithEmailAndPassword.mockImplementation(() =>
      Promise.reject({ code: AuthErrorCodes.EMAIL_EXISTS }),
    );

    const nomeInput = screen.getByPlaceholderText('Digite seu nome');
    const sobrenomeInput = screen.getByPlaceholderText('Digite seu Sobrenome');
    const emailInput = screen.getByPlaceholderText('Digite seu e-mail');
    const passwordInput = screen.getByPlaceholderText('Digite sua senha');
    const passwordConfirmInput = screen.getByPlaceholderText(
      'Digite novamente sua senha',
    );

    await userEvent.type(nomeInput, 'John');
    await userEvent.type(sobrenomeInput, 'Doe');
    await userEvent.type(emailInput, 'lorem@ipsum.com');
    await userEvent.type(passwordInput, '123456');
    await userEvent.type(passwordConfirmInput, '123456');

    const submitButton = screen.getByRole('button', { name: 'Criar conta' });
    await userEvent.click(submitButton);

    await screen.findByText('Esse e-mail já está sendo utilizado');
  });
});
