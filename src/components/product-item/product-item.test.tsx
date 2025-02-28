import { render, screen } from '@testing-library/react';
import ProductItem from './product-item.component';
import Products from '../../types/products.type';

const mockProduct: Products = {
  id: '1',
  name: 'Test Product',
  price: 100,
  imageUrl: 'test-image.jpg',
};

describe('ProductItem', () => {
  it('should show correct product', () => {
    render(<ProductItem product={mockProduct} />);
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`R$${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByText(/adicionar ao carrinho/i)).toBeInTheDocument();
  });
});
