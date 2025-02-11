import { useContext, useEffect } from 'react';

import { Container } from './categories-overview.styles';

import CategoryContext from '../../contexts/category.context';


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
        <div key={category.id}>
          <h1>{category.name}</h1>
        </div>
      ))}
    </Container>
  );
};

export default CategoriesOverview;
