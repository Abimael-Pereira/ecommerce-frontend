import { createContext } from "react";
import CartProduct from "../types/cart.types";

interface ICartContext {
    isVisible: boolean;
    productsTotalPrice: number;
    products: CartProduct[];
    addProductToCart: (product: CartProduct) => void;
    toggleCart: () => void;
    removeProductFromCart: (productId: string) => void;
    increaseProductQuantity: (productId: string) => void;
    decreaseProductQuantity: (productId: string) => void;
}

const CartContext = createContext<ICartContext>({
    isVisible: false,
    products: [],
    productsTotalPrice: 0,
    addProductToCart: () => {},
    toggleCart: () => {},
    removeProductFromCart: () => {},
    increaseProductQuantity: () => {},
    decreaseProductQuantity: () => {},
});

export default CartContext;