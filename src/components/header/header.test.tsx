import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Header from './header.component';

import UserContext from '../../contexts/user.context';
import User from '../../types/user.types';

const userTest: User = {
  id: '1',
  firstName: 'Test',
  lastName: 'User',
  email: 'test.user@gmail',
  provider: 'firebase',
};

const createUserContextValue = (isAuthenticated = false) => ({
  isAuthenticated,
  currentUser: isAuthenticated ? userTest : null,
  loginUser: jest.fn(),
  logoutUser: jest.fn(),
});

const HeaderWithContexts = ({ isAuthenticated = false }) => {
  return (
    <BrowserRouter>
      <UserContext.Provider value={createUserContextValue(isAuthenticated)}>
        <Header />
      </UserContext.Provider>
    </BrowserRouter>
  );
};

describe('Header', () => {
  it('should show sign out button when user is authenticated', () => {
    render(<HeaderWithContexts isAuthenticated={true} />);

    expect(screen.getByText('Sair')).toBeInTheDocument();
  });

  it('should show sign in and sign up buttons if user is not authenticated', () => {
    render(<HeaderWithContexts isAuthenticated={false} />);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Criar conta')).toBeInTheDocument();
  });
});
