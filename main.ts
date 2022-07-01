import "./css/style.css";

// interfaces
interface ProductStructure {
    id: string;
    title: string;
    desc: string;
    img_url: string;
    orig_price: number;
    disc_price: number;
    category: number;
}

interface CartProduct {
    product: ProductStructure;
    counter: number;
}

interface CartActions {
    addItem(product: ProductStructure): void;
    // removeItem(): string;
    // incrementItem(): string;
    // decrementItem(): string;
}

// Network Call
const apiURL = "http://localhost:3000/products";
const axios = require("axios").default;


class NetworkCall {
    getProducts(): Promise<ProductStructure[]> {
        return axios.get(apiURL)
    }
}

// Product Service

class ProductService {

    // render product by taking data from the products array
    showProducts(products: ProductStructure[]) {
        var prodWrap = document.getElementById("products-wrapper");

        products.forEach((product) => {
            // HTML layout for product card
            var productTemplate = `
      <div class="col-md-3 g-4 product">
        <div class="card h-100 ">
          <img src="${product.img_url}" class="card-img-top product-img p-3 border-bottom" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title product-title">${product.title}</h5>
          <p class="card-text product-price">
            <span>Price :</span>
            <span class="original-price text-decoration-line-through text-muted me-2">${product.orig_price} Rs</span>
            <span class="discount-price fw-bold">${product.disc_price} Rs</span>
          </p>
          <p class="card-text product-description">${product.desc}</p>
          <a href="#" class="btn btn-dark add-to-cart">Add To Cart</a>
        </div>
        </div>
      </div>
      `;

            prodWrap.insertAdjacentHTML("beforeend", productTemplate);
        });
    }

    // Show total products count
    showCount(products: ProductStructure[]) {
        var prodCount = document.getElementById("total-products");
        prodCount.innerText = (products.length).toString();
    }

}

// Cart Class (Handles logic and UI)
class Cart implements CartActions {
    cartItems: CartProduct[] = [];

    get items(): CartProduct[] {
        return this.cartItems;
    }

    addListeners(buttons: HTMLCollection) {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", (e: Event) => {
                e.preventDefault();
                this.addItem(products[i]);
                this.checkEmpty();
            });
        }

    }

    addItem(product: ProductStructure): void {
        this.cartItems.push({ product: product, counter: 1 });


        // check for repeated products
        for (let i = 0; i < this.cartItems.length; i++) {

            // getter for added product
            var addedProduct = document.getElementsByClassName('cart-item');

            var cartItemTemplate = `
            <div class="product cart-item card mb-3">
                <div class="row g-0 align-items-center">
                    <div class="col-md-4">
                        <img src="${this.cartItems[i].product.img_url}" class="img-fluid rounded-start" alt="${this.cartItems[i].product.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body p-3">
                            <h5 class="card-title">${this.cartItems[i].product.title}</h5>
                            <p class="card-text product-price">
                                <span>Price :</span>
                                <span class="original-price text-decoration-line-through text-muted me-2">${this.cartItems[i].product.orig_price} Rs</span>
                                <span class="discount-price fw-bold">${this.cartItems[i].product.disc_price} Rs</span>
                            </p>
                            <p class="item-quantity-wrap">
                                <span>Quantity :</span>
                                <span id="item-quantity">${this.cartItems[i].counter}</span>
                            </p>
                            <div>
                                <button class="incrementItem me-2 btn btn-outline-dark"><i class="bi bi-plus-lg"></i></button>
                                <button class="decrementItem me-2 btn btn-outline-dark"><i class="bi bi-dash-lg"></i></button>
                                <button class="removeItem btn btn-outline-dark">Remove</button>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
                `;

            var cart = document.getElementById('cartBody');
            cart.insertAdjacentHTML('beforeend', cartItemTemplate);

        }

        var itemQuantity = document.getElementById('item-quantity');

        console.log(this.cartItems);

        this.showCartQuantity();
    }

    // show number of items on cart button
    showCartQuantity() {
        var qunatityBadge = document.querySelector('.show-cart .cartQuantity') as HTMLElement;

        if (this.cartItems.length > 0) {
            qunatityBadge.style.display = "block";
            qunatityBadge.innerHTML = (this.cartItems.length).toString();
        }
    }

    // Shows empty message if cart is empty
    checkEmpty() {
        var emptyMessage = document.getElementById('emptyCartMessage') as HTMLElement;

        emptyMessage.style.display = 'block';

        if (this.cartItems.length != 0) {
            emptyMessage.style.display = 'none';
        }
    }

    itemQuantity() {

    }

}



// Cart entity class
// class CartProduct {
//     id: string;
//     title: string;
//     count: number;
// }

var products: ProductStructure[] = [];




document.addEventListener("DOMContentLoaded", () => {
    new NetworkCall().getProducts().then((response: any) => {
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


