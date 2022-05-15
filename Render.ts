import { htmlPrefilter, type } from "jquery";
import APICall from "./APICall"

export default class Render {

    renderProducts() {
        var prodWrap = document.getElementById("products-wrapper");


        const call = new APICall();

        // call api and get products
        var products = call.getProducts();

        console.log(products);

        setTimeout(() => {



            products.forEach((product) => {
                console.log(products);


                var productTemplate = `
                <div class="col-md-3 g-4">
                    <div class="card h-100 product">
                        <img src="${product.img_url}" class="card-img-top product-img p-3 border-bottom" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card-title product-title">${product.title}</h5>
                            <p class="card-text product-price">
                                <span>Price :</span>
                                <span class="original-price text-decoration-line-through text-muted me-2">${product.orig_price} Rs</span>
                                <span class="discount-price fw-bold">${product.disc_price} Rs</span>
                            </p>
                            <p class="card-text product-description">${product.desc}</p>
                            <a href="#" class="btn btn-primary add-to-cart">Add To Cart</a>
                        </div>
                    </div>
                </div>`;

                prodWrap.insertAdjacentHTML('beforeend', productTemplate)
            })




        }, 100);




    }

}