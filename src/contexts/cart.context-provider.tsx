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
    setProducts((prevState) => [...prevState, { ...product, quantity: 1 }]);
  };

  return (
    <CartContext.Provider value={{ isVisible, products, toggleCart, addProductToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
