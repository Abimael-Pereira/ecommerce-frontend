import { FunctionComponent, useContext } from 'react';
import { BsCartPlus } from 'react-icons/bs';

import CustomButton from '../custom-buttom/custom-button.component';

import Products from '../../types/products.type';
import CartContext from '../../contexts/cart.context';

import {
  ProductContainer,
  ProductImage,
  ProductInfo,
} from './product-item.styles';


interface ProductItemProps {
  product: Products;
}

const ProductItem: FunctionComponent<ProductItemProps> = ({ product }) => {
  const { addProductToCart } = useContext(CartContext);

  const handleAddProductToCart = () => {
    const cartProduct = { ...product, quantity: 1 };
    addProductToCart(cartProduct);
  };
  return (
    <ProductContainer>
      <ProductImage imageUrl={product.imageUrl}>
        <CustomButton
          startIcon={<BsCartPlus />}
          onClick={handleAddProductToCart}
        >
          Adicionar ao carrinho
        </CustomButton>
      </ProductImage>
      <ProductInfo>
        <p>{product.name}</p>
        <p>R${product.price}</p>
      </ProductInfo>
    </ProductContainer>
  );
};

export default ProductItem;
