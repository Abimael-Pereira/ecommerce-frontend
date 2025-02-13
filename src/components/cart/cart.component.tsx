import { BsCartCheck } from 'react-icons/bs';
import { useContext } from 'react';

import CartContext from '../../contexts/cart.context';

import CustomButton from '../custom-buttom/custom-button.component';

import {
  CartContainer,
  CartContent,
  CartEscapeArea,
  CartTitle,
  CartTotal,
} from './car.styles';

const CartComponent = () => {
  const { isVisible, toggleCart } = useContext(CartContext);

  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={toggleCart} />
      <CartContent>
        <CartTitle>Seu Carrinho</CartTitle>
        {/* Cart items */}

        <CartTotal>Total: R$ 0,00</CartTotal>

        <CustomButton startIcon={<BsCartCheck />}>
          Ir para o Checkout
        </CustomButton>
      </CartContent>
    </CartContainer>
  );
};

export default CartComponent;
