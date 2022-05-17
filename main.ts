import "./css/style.css";
import ProductService from "./ProductService";
import APICall from "./APICall";
import ProductStructure from "./IProductStructure";
import Cart from "./Cart";

document.addEventListener("DOMContentLoaded", () => {
    new APICall().getProducts().then((response: any) => {
        let products: ProductStructure[] = [];

        response.data.products.forEach((product: any) => {
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


        var counterInterval = setInterval(() => {
        }, 200)



    });
});
