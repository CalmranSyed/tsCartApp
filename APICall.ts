import ProductStructure from "./IProductStructure";
import apiURL from "./AppConstants";

const axios = require('axios').default;

export default class APICall {

    getProducts(): ProductStructure[] {
        // create an empty array to store products to store
        var products: ProductStructure[] = [];

        axios.get(apiURL)
            .then((response: any) => {
                console.log(response);

                response.data.products.forEach((product: any) => {
                    // Store all products
                    products.push(product);

                });

            })

        return products;
    }
}