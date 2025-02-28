import { render, screen } from '@testing-library/react';
import CategoryOverview from './category-overview.component';
import Category from '../../types/category.types';

const category: Category = {
  id: '1',
  name: 'test-category',
  imageUrl: 'test.jpg',
  displayName: 'Test Category',
  products: [
    {
      id: '1',
      name: 'Test Product 1',
      price: 100,
      imageUrl: 'test1.jpg',
    },
    {
      id: '2',
      name: 'Test Product 2',
      price: 200,
      imageUrl: 'test2.jpg',
    },
    {
      id: '3',
      name: 'Test Product 3',
      price: 300,
      imageUrl: 'test3.jpg',
    },
    {
      id: '4',
      name: 'Test Product 4',
      price: 400,
      imageUrl: 'test4.jpg',
    },
    {
      id: '5',
      name: 'Test Product 5',
      price: 500,
      imageUrl: 'test5.jpg',
    },
  ],
};

describe('CategoryOverview', () => {
  it('should show correct category and its products', () => {
    render(<CategoryOverview category={category} />);
    expect(screen.getByText('Test Category')).toBeInTheDocument();

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('R$100')).toBeInTheDocument();

    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    expect(screen.getByText('R$200')).toBeInTheDocument();

    expect(screen.getByText('Test Product 3')).toBeInTheDocument();
    expect(screen.getByText('R$300')).toBeInTheDocument();

    expect(screen.getByText('Test Product 4')).toBeInTheDocument();
    expect(screen.getByText('R$400')).toBeInTheDocument();

    expect(screen.queryByText('Test Product 5')).not.toBeInTheDocument;
  });
});
