import { useContext, useState } from 'react';
import { BsBagCheck } from 'react-icons/bs';
import axios from 'axios';

import CartContext from '../../contexts/cart.context';

import {
  CheckoutContainer,
  CheckoutProducts,
  CheckoutTitle,
  CheckoutTotal,
} from './checkout.styles';

import CustomButton from '../custom-buttom/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import LoadingComponent from '../loading/loading.component';

const Checkout = () => {
  const { products, productsTotalPrice } = useContext(CartContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleFinishPurchaseClick = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/create-checkout-session`,
        {
          products,
        },
      );

      window.location.href = data.url;
    } catch (error) {
      console.error('Error while trying to finish purchase:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingComponent />}
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

            <CustomButton
              startIcon={<BsBagCheck />}
              onClick={handleFinishPurchaseClick}
            >
              Finalizar compra
            </CustomButton>
          </>
        ) : (
          <p>Seu carrinho está vazio!</p>
        )}
      </CheckoutContainer>
    </>
  );
};

export default Checkout;
