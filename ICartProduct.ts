import ProductStructure from "./IProductStructure";

export default interface CartProduct {
    product: ProductStructure;
    counter: number;
}