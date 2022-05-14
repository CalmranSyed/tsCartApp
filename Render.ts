import { htmlPrefilter } from "jquery";
import APICall from "./APICall"

export default class Render {

    renderProducts() {
        var prodWrap = document.getElementById("products-wrapper");


        const call = new APICall();

        // call api and get products
        var products = call.getProducts();

        console.log(products);

        // produt markup for appending to html
        products.forEach(product => {
            var productTemplate = `
                <div class="col-md-3">
                    <div class="card product">
                        <img src="${product.imageURL}" class="card-img-top product-img" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card-title product-title">${product.title}</h5>
                            <p class="card-text product-description text-decoration-line-through">${product.originalPrice}</p>
                            <p class="card-text product-description">${product.discountPrice}</p>
                            <p class="card-text product-description">${product.description}</p>
                            <a href="#" class="btn btn-primary add-to-cart">Add To Cart</a>
                        </div>
                    </div>
                </div>`;

            prodWrap.insertAdjacentHTML('beforeend', productTemplate);
        });
    }

}