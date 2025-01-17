import Products from './products.type';

interface Category {
  id: string;
  name: string;
  displayName: string;
  imageUrl: string;
  products: Products[];
}

export default Category;
