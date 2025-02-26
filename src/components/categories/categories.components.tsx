import { useContext, useEffect } from 'react';

import CategoryItem from '../category-item/category-item.component';

import { CategoriesContainer, CategoriesContent } from './categories.styles';
import CategoryContext from '../../contexts/category.context';

const Categories = () => {
  const { categories, fetchCategories } = useContext(CategoryContext);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <CategoriesContainer>
      <CategoriesContent>
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryItem category={category} />
          </div>
        ))}
      </CategoriesContent>
    </CategoriesContainer>
  );
};

export default Categories;
