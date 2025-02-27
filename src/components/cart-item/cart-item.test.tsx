import { render, screen } from '@testing-library/react';
import CartProduct from '../../types/cart.types';
import CartItem from './cart-item.component';

describe('CartItem', () => {
  it('should show correct cart item', () => {
    const cartItem: CartProduct = {
      id: '1',
      name: 'Product 1',
      price: 100,
      imageUrl: 'image-url',
      quantity: 2,
    };

    render(<CartItem product={cartItem} />);

    expect(screen.getByText(/product 1/i)).toBeInTheDocument();
    expect(screen.getByText('R$100')).toBeInTheDocument();
    expect(
      screen.getByLabelText(/deacrease quantity of product 1/i),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/increase quantity of product 1/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/remove product 1/i)).toBeInTheDocument();
  });
});
