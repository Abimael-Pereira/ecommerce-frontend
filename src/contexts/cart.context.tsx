import { createContext } from "react";
import CartProduct from "../types/cart.types";

interface ICartContext {
    isVisible: boolean;
    products: CartProduct[];
    addProductToCart: (product: CartProduct) => void;
    toggleCart: () => void;
}

const CartContext = createContext<ICartContext>({
    isVisible: false,
    products: [],
    addProductToCart: () => {},
    toggleCart: () => {},
});

export default CartContext;