import { createContext } from "react";
import CartProduct from "../types/cart.types";

interface ICartContext {
    isVisible: boolean;
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
    addProductToCart: () => {},
    toggleCart: () => {},
    removeProductFromCart: () => {},
    increaseProductQuantity: () => {},
    decreaseProductQuantity: () => {},
});

export default CartContext;