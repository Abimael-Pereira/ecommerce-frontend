import { render, screen } from '@testing-library/react';
import CartComponent from './cart.component';
import { BrowserRouter } from 'react-router-dom';
import CartContext from '../../contexts/cart.context';
import { createCartContextValue } from '../helpers/test.helper';
import CartProduct from '../../types/cart.types';

const productsTest: CartProduct[] = [
  {
    id: '1',
    name: 'Boné',
    price: 50,
    quantity: 2,
    imageUrl: 'https://test.com/image.png',
  },
];

const CartWithContexts = ({ products = [] as CartProduct[] }) => {
  return (
    <BrowserRouter>
      <CartContext.Provider value={createCartContextValue(products)}>
        <CartComponent />
      </CartContext.Provider>
    </BrowserRouter>
  );
};

describe('Cart', () => {
  it('should show correct cart products ', () => {
    render(<CartWithContexts products={productsTest} />);

    expect(screen.getByText(/boné/i)).toBeInTheDocument();
    expect(screen.getByText('R$50')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText(/total.*r\$.*100/i)).toBeInTheDocument();
  });
});
