import { createContext } from 'react';
import Category from '../types/category.types';

interface ICategoryContext {
  categories: Category[];
  fetchCategories: () => Promise<void>;
}

const CategoryContext = createContext<ICategoryContext>({
  categories: [],
  fetchCategories: () => Promise.resolve(),
});

export default CategoryContext;
