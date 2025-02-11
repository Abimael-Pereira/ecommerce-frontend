import { useContext, useEffect } from 'react';

import { Container } from './categories-overview.styles';

import CategoryContext from '../../contexts/category.context';
import CategoryOverview from '../category-overview/category-overview.component';


const CategoriesOverview = () => {
  const { categories, fetchCategories } = useContext(CategoryContext);
  
  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories, fetchCategories]);

  return (
    <Container>
      {categories.map((category) => (
        <CategoryOverview key={category.id} category={category} />
      ))}
    </Container>
  );
};

export default CategoriesOverview;
