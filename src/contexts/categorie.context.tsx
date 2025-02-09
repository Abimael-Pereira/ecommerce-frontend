import { createContext, ReactNode, useState } from 'react';
import Category from '../types/category.types';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import { categoryConverter } from '../converters/firestore.converters';

interface ICategoryContext {
  categories: Category[];
  fetchCategories: () => Promise<void>;
}

interface ChildrenProps {
  children: ReactNode;
}

export const CategoryContext = createContext<ICategoryContext>({
  categories: [],
  fetchCategories: () => Promise.resolve(),
});

const CategoryContextProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const categoriesFromFirestore: Category[] = [];

      const querySnapshot = await getDocs(
        collection(db, 'categories').withConverter(categoryConverter),
      );

      querySnapshot.forEach((doc) => {
        categoriesFromFirestore.push(doc.data());
      });

      setCategories(categoriesFromFirestore);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CategoryContext.Provider value={{ categories, fetchCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
