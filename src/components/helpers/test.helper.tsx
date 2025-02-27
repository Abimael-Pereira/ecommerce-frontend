import { useState } from 'react';
import CartProduct from '../../types/cart.types';
import User from '../../types/user.types';

const userTest: User = {
  id: '1',
  firstName: 'Test',
  lastName: 'User',
  email: 'test.user@gmail',
  provider: 'firebase',
};

export const createUserContextValue = (isAuthenticated = false) => ({
  isAuthenticated,
  currentUser: isAuthenticated ? userTest : null,
  loginUser: jest.fn(),
  logoutUser: jest.fn(),
});

export const createCartContextValue = (initialProducts: CartProduct[] = []) => {
  const [products, setProducts] = useState<CartProduct[]>([...initialProducts]);

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

  const removeProductFromCart = (productId: string) => {
    setProducts((products) =>
      products.filter((product) => product.id !== productId),
    );
  };

  const toggleCart = jest.fn();
  return {
    isVisible: false,
    productsTotalPrice: products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0,
    ),
    productsCount: products.reduce((acc, product) => acc + product.quantity, 0),
    products: products,
    addProductToCart: jest.fn(),
    toggleCart: toggleCart,
    removeProductFromCart,
    increaseProductQuantity,
    decreaseProductQuantity,
    clearCart: jest.fn(),
  };
};
