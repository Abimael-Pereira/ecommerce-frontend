import { render, screen } from '@testing-library/react';
import LoginPage from './login.page';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

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
});
