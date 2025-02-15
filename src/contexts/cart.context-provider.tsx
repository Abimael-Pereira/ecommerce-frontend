import {
  FunctionComponent,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';

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

  useEffect(() => {
    const cartProducts = localStorage.getItem('cartProducts');

    if (cartProducts) {
      const parsedProducts = JSON.parse(cartProducts);
      setProducts(parsedProducts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(products));
  }, [products]);

  const productsTotalPrice = useMemo(() => {
    return products.reduce((acc, currentProduct) => {
      return acc + currentProduct.price * currentProduct.quantity;
    }, 0);
  }, [products]);

  const productsCount = useMemo(() => {
    return products.reduce((acc, currentProduct) => {
      return acc + currentProduct.quantity;
    }, 0);
  }, [products]);

  const toggleCart = () => {
    setIsVisible((prevState) => !prevState);
  };

  const addProductToCart = (product: Products) => {
    const productAlreadyInCart = products.some(
      (item) => item.id === product.id,
    );

    if (productAlreadyInCart) {
      setProducts((products) =>
        products.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setProducts((products) => [
        ...products,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const removeProductFromCart = (productId: string) => {
    setProducts((products) =>
      products.filter((product) => product.id !== productId),
    );
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((products) =>
      products.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product,
      ),
    );
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((products) =>
      products
        .map((product) =>
          product.id === productId
            ? { ...product, quantity: product.quantity - 1 }
            : product,
        )
        .filter((product) => product.quantity > 0),
    );
  };

  return (
    <CartContext.Provider
      value={{
        isVisible,
        products,
        productsTotalPrice,
        productsCount,
        toggleCart,
        addProductToCart,
        removeProductFromCart,
        increaseProductQuantity,
        decreaseProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
