import { render, screen } from '@testing-library/react';
import CartComponent from './cart.component';
import { BrowserRouter } from 'react-router-dom';
import CartContext from '../../contexts/cart.context';
import { createCartContextValue } from '../helpers/test.helper';
import CartProduct from '../../types/cart.types';
import userEvent from '@testing-library/user-event';

const productsTest: CartProduct[] = [
  {
    id: '1',
    name: 'Boné',
    price: 50,
    quantity: 5,
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
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText(/total.*r\$.*250/i)).toBeInTheDocument();
    expect(screen.getByText(/ir para o checkout/i)).toBeInTheDocument();
  });

  it('should not show checkout button and should show empty cart message if cart is empty', () => {
    render(<CartWithContexts />);

    expect(screen.getByText(/seu carrinho está vazio/i)).toBeInTheDocument();
    expect(screen.queryByText(/ir para o checkout/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/total/i)).not.toBeInTheDocument();
  });

  it('should increase product quantity when clicking on plus button', async () => {
    render(<CartWithContexts products={productsTest} />);

    const increaseButton = screen.getByLabelText(/increase quantity of boné/i);
    await userEvent.click(increaseButton);

    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText(/total.*r\$.*300/i)).toBeInTheDocument();
  });

  it('should decrease product quantity when clicking on minus button', async () => {
    render(<CartWithContexts products={productsTest} />);

    const decreaseButton = screen.getByLabelText(/deacrease quantity of boné/i);
    await userEvent.click(decreaseButton);

    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText(/total.*r\$.*200/i)).toBeInTheDocument();
  });

  it('should remove product from cart when clicking on remove button', async () => {
    render(<CartWithContexts products={productsTest} />);

    const removeButton = screen.getByLabelText(/remove boné/i);
    await userEvent.click(removeButton);

    expect(screen.queryByText(/boné/i)).not.toBeInTheDocument();
    expect(screen.getByText(/seu carrinho está vazio/i)).toBeInTheDocument();
  });
});
