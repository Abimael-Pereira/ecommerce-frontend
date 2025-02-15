import { useContext } from 'react';
import { BsBagCheck } from 'react-icons/bs';
import CartContext from '../../contexts/cart.context';

import {
  CheckoutContainer,
  CheckoutProducts,
  CheckoutTitle,
  CheckoutTotal,
} from './checkout.styles';

import CustomButton from '../custom-buttom/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

const Checkout = () => {
  const { products, productsTotalPrice } = useContext(CartContext);
  return (
    <CheckoutContainer>
      <CheckoutTitle>Checkout</CheckoutTitle>

      {products.length > 0 ? (
        <>
          <CheckoutProducts>
            {products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </CheckoutProducts>

          <CheckoutTotal>R${productsTotalPrice}</CheckoutTotal>

          <CustomButton startIcon={<BsBagCheck />}>
            Finalizar compra
          </CustomButton>
        </>
      ) : (
        <p>Seu carrinho está vazio!</p>
      )}
    </CheckoutContainer>
  );
};

export default Checkout;
