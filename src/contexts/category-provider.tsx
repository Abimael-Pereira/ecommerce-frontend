import { ReactNode, useState } from 'react';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import { categoryConverter } from '../converters/firestore.converters';
import Category from '../types/category.types';
import CategoryContext from './category.context';

interface ChildrenProps {
  children: ReactNode;
}

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
