import CartProduct from "../../types/cart.types";
import User from "../../types/user.types";

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

export const createCartContextValue = (products: CartProduct[] = []) => {
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
    removeProductFromCart: jest.fn(),
    increaseProductQuantity: jest.fn(),
    decreaseProductQuantity: jest.fn(),
    clearCart: jest.fn(),
  };
};
