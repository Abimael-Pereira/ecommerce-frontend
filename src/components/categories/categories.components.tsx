import { useContext, useEffect } from 'react';

import CategoryItem from './category-item/category-item.component';

import { CategoriesContainer, CategoriesContent } from './categories.styles';
import { CategoryContext } from '../../contexts/categorie.context';

const Categories = () => {
  const { categories, fetchCategories } = useContext(CategoryContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContainer>
      <CategoriesContent>
        {categories.map((category) => (
          <div>
            <CategoryItem key={category.id} category={category} />
          </div>
        ))}
      </CategoriesContent>
    </CategoriesContainer>
  );
};

export default Categories;
