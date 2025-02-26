import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Header from './header.component';

import UserContext from '../../contexts/user.context';
import CartProduct from '../../types/cart.types';
import CartContext from '../../contexts/cart.context';
import {
  createCartContextValue,
  createUserContextValue,
} from '../helpers/test.helper';

const productsTest: CartProduct[] = [
  {
    id: '1',
    name: 'Product 1',
    price: 10,
    quantity: 4,
    imageUrl: 'https://test.com/image.png',
  },
  {
    id: '2',
    name: 'Product 2',
    price: 20,
    quantity: 6,
    imageUrl: 'https://test.com/image.png',
  },
];

const HeaderWithContexts = ({
  isAuthenticated = false,
  products = [] as CartProduct[],
}) => {
  return (
    <BrowserRouter>
      <UserContext.Provider value={createUserContextValue(isAuthenticated)}>
        <CartContext.Provider value={createCartContextValue(products)}>
          <Header />
        </CartContext.Provider>
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

  it('should show correct cart products count', () => {
    render(<HeaderWithContexts products={productsTest} />);

    expect(screen.getByText('10')).toBeInTheDocument();
  });
});
