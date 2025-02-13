import Products from "./products.type";

interface CartProduct extends Products {
    quantity: number;
}

export default CartProduct;