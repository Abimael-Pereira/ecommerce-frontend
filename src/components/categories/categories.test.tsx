import { render, screen } from '@testing-library/react';
import * as firestore from 'firebase/firestore';
import Categories from './categories.components';
import { BrowserRouter } from 'react-router-dom';

jest.mock('firebase/firestore');

describe('Categories', () => {
  it('should fetch and show categories', async () => {
    const mockedFirestore = firestore as any;

    mockedFirestore.getDocs.mockImplementation(async () => [
      {
        data() {
          return {
            id: '1',
            displayName: 'Category 1',
          };
        },
      },
    ]);

    mockedFirestore.collection.mockImplementation(() => ({
      withConverter: () => {},
    }));

    render(
      <BrowserRouter>
        <Categories />
      </BrowserRouter>,
    );

    await expect(screen.findByText('Category 1')).toBeTruthy();
  });
});
