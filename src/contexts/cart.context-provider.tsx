import { FunctionComponent, ReactNode, useState } from 'react';

import CartContext from './cart.context';
import Products from '../types/products.type';
import CartProduct from '../types/cart.types';

interface CartContextProviderProps {
  children: ReactNode;
}

const CartContextProvider: FunctionComponent<CartContextProviderProps> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState<CartProduct[]>([]);

  const toggleCart = () => {
    setIsVisible((prevState) => !prevState);
  };

  const addProductToCart = (product: Products) => {
    const productAlreadyInCart = products.some(
      (item) => item.id === product.id,
    );

    if (productAlreadyInCart) {
      return setProducts((products) =>
        products.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    }

    setProducts((products) => [
      ...products,
      {
        ...product,
        quantity: 1,
      },
    ]);
  };

  const removeProductFromCart = (productId: string) => {
    setProducts((products) =>
      products.filter((product) => product.id !== productId),
    );
  };

  return (
    <CartContext.Provider
      value={{
        isVisible,
        products,
        toggleCart,
        addProductToCart,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
