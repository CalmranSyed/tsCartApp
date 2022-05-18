import ProductStructure from "./IProductStructure";

export default interface CartActions {
    addItem(product: ProductStructure): void;
    // removeItem(): string;
    // incrementItem(): string;
    // decrementItem(): string;
}