import "./css/style.css";
import ProductService from "./ProductService";
import APICall from "./APICall";
import ProductStructure from "./IProductStructure";
import Cart from "./Cart";


export let products: ProductStructure[] = [];

document.addEventListener("DOMContentLoaded", () => {
    new APICall().getProducts().then((response: any) => {
        // create an empty array to store products to store

        response.data.products.forEach((product: any) => {
            // add products from the response to the created array
            products.push(product);
        });

        const prodService = new ProductService();
        const c = new Cart();

        prodService.showProducts(products);
        prodService.showCount(products);

        var prodInterval = setInterval(() => {
            var buttons = document.getElementsByClassName("add-to-cart") as HTMLCollection;

            if (buttons.length == products.length) {
                c.addListeners(buttons);
                clearInterval(prodInterval);
            }

        }, 200);
    });
});

