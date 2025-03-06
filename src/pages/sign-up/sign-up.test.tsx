import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUpPage from './sign-up.page';
import userEvent from '@testing-library/user-event';

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
});
