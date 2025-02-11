import { FunctionComponent } from 'react';

import {
  ProductContainer,
  ProductImage,
  ProductInfo,
} from './product-item.styles';

import Products from '../../types/products.type';

interface ProductItemProps {
  product: Products;
}

const ProductItem: FunctionComponent<ProductItemProps> = ({ product }) => {
  return (
    <ProductContainer>
      <ProductImage imageUrl={product.imageUrl} />
      <ProductInfo>
        <p>{product.name}</p>
        <p>R${product.price}</p>
      </ProductInfo>
    </ProductContainer>
  );
};

export default ProductItem;
