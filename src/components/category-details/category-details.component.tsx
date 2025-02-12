import { collection, getDocs, query, where } from 'firebase/firestore';
import { FunctionComponent, useEffect, useState } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import { db } from '../../config/firebase.config';
import { categoryConverter } from '../../converters/firestore.converters';
import Category from '../../types/category.types';

import LoadingComponent from '../loading/loading.component';
import ProductItem from '../product-item/product-item.component';

import {
  CategoryTitle,
  Container,
  IconContainer,
  ProductsContainer,
} from './category-details.styles';

interface CategoryDetailsProps {
  categoryId: string;
}

const CategoryDetails: FunctionComponent<CategoryDetailsProps> = ({
  categoryId,
}) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(
          query(
            collection(db, 'categories').withConverter(categoryConverter),
            where('id', '==', categoryId),
          ),
        );

        const category = querySnapshot.docs[0]?.data();

        setCategory(category);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [categoryId]);

  if (loading) {
    return <LoadingComponent />;
  }
  console.log(category);

  return (
    <Container>
      <CategoryTitle>
        <IconContainer onClick={handleBackClick}>
          <BiChevronLeft size={36} />
        </IconContainer>
        <p>Explorar {category?.displayName}</p>
      </CategoryTitle>

      <ProductsContainer>
        {category?.products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ProductsContainer>
    </Container>
  );
};

export default CategoryDetails;
