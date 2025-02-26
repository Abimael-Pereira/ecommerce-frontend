import { render } from '@testing-library/react';
import CategoryItem from './category-item.component';
import Category from '../../types/category.types';
import { BrowserRouter } from 'react-router-dom';

import { TextEncoder, TextDecoder } from 'util';
Object.assign(global, { TextDecoder, TextEncoder });

describe('CategoryItem', () => {
  it('should render caregory corectly', () => {
    const category: Category = {
      id: '1',
      displayName: 'Category 1',
      imageUrl: 'http://some-url.com',
      name: 'category-1',
      products: [],
    };

    const { getByText } = render(
      <BrowserRouter>
        <CategoryItem category={category} />
      </BrowserRouter>,
    );

    getByText('Category 1');
    getByText('Explorar');
  });
});
