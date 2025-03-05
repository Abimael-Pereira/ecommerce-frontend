import * as firestore from 'firebase/firestore';
import Category from '../../types/category.types';
import { render, screen } from '@testing-library/react';
import CategoryDetails from './category-details.component';
import { BrowserRouter } from 'react-router-dom';

jest.mock('firebase/firestore');

describe('CategoryDetails', () => {
  it('should fetch and show categories and its products', async () => {
    const mockedFirestore = firestore as any;

    mockedFirestore.getDocs.mockImplementation(async () => {
      docs: [
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
      ];
    });

    mockedFirestore.collection.mockImplementation(() => ({
      withConverter: () => {},
    }));

    mockedFirestore.query.mockImplementation(() => {});
    mockedFirestore.where.mockImplementation(() => {});

    render(
      <BrowserRouter>
        <CategoryDetails categoryId="any-id" />
      </BrowserRouter>,
    );

    await expect(screen.findByText(/product 1/i)).toBeTruthy();
    await expect(screen.findByText(/category 1/i)).toBeTruthy();
    await expect(screen.findByText(/explorar category 1/i)).toBeTruthy();
  });
});
