import { data } from "jquery";
import ProductStructure from "./IProductStructure";
import apiURL from "./AppConstants";

const axios = require('axios').default;

export default class APICall {

    getProducts() {
        // create an empty array to store products to store
        var products: ProductStructure[] = [];

        axios.get(apiURL)
            .then((response: any) => {
                response.data.products.forEach((product: ProductStructure) => {
                    // Store all products
                    products.push(product);
                });
            })


        return products;
    }
}