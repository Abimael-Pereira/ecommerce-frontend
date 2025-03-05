import * as firestore from 'firebase/firestore';
import Category from '../../types/category.types';
import { render, screen } from '@testing-library/react';
import CategoriesOverview from './categories-overview.component';

jest.mock('firebase/firestore');

describe('CategoriesOverview', () => {
  it('should fetch and show categories', async () => {
    const mockedFirestore = firestore as any;

    mockedFirestore.getDocs.mockImplementation(async () => [
      {
        data(): Category {
          return {
            id: '1',
            displayName: 'Category 1',
            imageUrl: 'https://example.com/image.jpg',
            name: 'category-1',
            products: [
              {
                id: '1',
                name: 'Product 1',
                price: 100,
                imageUrl: 'https://example.com/product.jpg',
              },
            ],
          };
        },
      },
    ]);

    mockedFirestore.collection.mockImplementation(() => ({
      withConverter: () => {},
    }));

    render(<CategoriesOverview />);

    await expect(screen.findByText(/product 1/i)).toBeTruthy();
    await expect(screen.findByText(/category 1/i)).toBeTruthy();
    await expect(screen.findByText('R$100')).toBeTruthy();
  });
});
