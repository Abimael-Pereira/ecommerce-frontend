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

    userEvent.click(submitButton);

    await screen.findByText('Nome é obrigatório');
    await screen.findByText('Sobrenome é obrigatório');
    await screen.findByText('E-mail é obrigatório');
    await screen.findByText('Senha é obrigatória');
    await screen.findByText('Confirmação de senha é obrigatória');
  });
});
