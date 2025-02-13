import { createContext } from "react";
import CartProduct from "../types/cart.types";

interface ICartContext {
    isVisible: boolean;
    products: CartProduct[];
    toggleCart: () => void;
}

const CartContext = createContext<ICartContext>({
    isVisible: false,
    products: [],
    toggleCart: () => {},
});

export default CartContext;