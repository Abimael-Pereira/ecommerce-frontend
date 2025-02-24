import { BsCartCheck } from 'react-icons/bs';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import CartContext from '../../contexts/cart.context';

import CustomButton from '../custom-buttom/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import {
  CartContainer,
  CartContent,
  CartEscapeArea,
  CartTitle,
  CartTotal,
} from './cart.styles';

const CartComponent = () => {
  const { isVisible, products, productsTotalPrice, productsCount, toggleCart } =
    useContext(CartContext);

  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate('/checkout');
    toggleCart();
  };

  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={toggleCart} />
      <CartContent>
        <CartTitle>Seu Carrinho</CartTitle>

        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}

        {productsCount > 0 && (
          <>
            <CartTotal>Total: R${productsTotalPrice},00</CartTotal>
            <CustomButton startIcon={<BsCartCheck />} onClick={handleCheckout}>
              Ir para o Checkout
            </CustomButton>
          </>
        )}

        {productsCount === 0 && <CartTotal>Seu carrinho está vazio</CartTotal>}
      </CartContent>
    </CartContainer>
  );
};

export default CartComponent;
