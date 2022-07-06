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

interface CartProductStructure {
    product: ProductStructure;
    counter: number;
}

interface CartActions {
    addToCart(cartProduct: CartProduct): void;
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

var products: ProductStructure[] = [];

var cHandler: CartHandler

// Main Function
document.addEventListener("DOMContentLoaded", () => {
    new NetworkCall().getProducts().then((response: any) => {
        // create an empty array to store products to store

        response.data.products.forEach((product: any) => {
            // add products from the response to the created array
            products.push(product);
        });


        const cartListener: CartListener = new ICartListener()
        const prodService = new ProductService();
        cHandler = new CartHandler(cartListener);
        const cModel = new CartModel();

        prodService.showProducts(products);
        prodService.showCount(products);

        // var prodInterval = setInterval(() => {
        //     var buttons = document.getElementsByClassName("add-to-cart") as HTMLCollection;

        //     if (buttons.length == products.length) {
        //         cModel.addListeners(buttons);
        //         clearInterval(prodInterval);
        //     }

        // }, 200);


    });
});


// Product Service (Used for rendering products and related data on)
class ProductService {

    // render product by taking data from the products array
    showProducts(products: ProductStructure[]) {

        var prodWrap = document.getElementById("products-wrapper");

        products.forEach((product) => {
            prodWrap.appendChild(createProducts(product))
        });
    }

    // Show total products count
    showCount(products: ProductStructure[]) {
        var prodCount = document.getElementById("total-products");
        prodCount.innerText = (products.length).toString();
    }

}

function createProducts(product: ProductStructure): HTMLDivElement {
    var root = document.createElement("div")
    root.setAttribute("class", "col-md-3 g-4 product")

    var outerCard = document.createElement("div")
    outerCard.setAttribute("class", "card h-100")

    var thumbnail = document.createElement("img")
    thumbnail.setAttribute("src", product.img_url)
    thumbnail.setAttribute("class", "card-img-top product-img p-3 border-bottom")

    var cardBody = document.createElement("div")
    cardBody.setAttribute("class", "card-body")

    var cardBodyTitle = document.createElement("h5")
    cardBodyTitle.setAttribute("class", "card-title product-title")
    cardBodyTitle.innerText = product.title

    var cardDesc = document.createElement("p")
    cardDesc.setAttribute("class", "card-text product-price")

    var price = document.createElement("span")
    price.innerText = "Price: "

    var origPrice = document.createElement("span")
    origPrice.setAttribute("class", "original-price text-decoration-line-through text-muted me-2")
    origPrice.innerText = product.orig_price.toString()

    var discPrice = document.createElement("span")
    discPrice.setAttribute("class", "discount-price fw-bold")
    discPrice.innerText = product.disc_price + " Rs."

    var prodDesc = document.createElement("p")
    prodDesc.setAttribute("class", "card-text product-description")
    prodDesc.innerText = product.desc

    var anchor = document.createElement("a")
    anchor.setAttribute("class", "btn btn-dark add-to-cart")
    anchor.innerText = "Add to Cart"
    anchor.addEventListener("click", () => {
        console.log(product.id)
        cHandler.onclickAddToCart(product);
        cHandler.checkEmpty();
    })

    cardDesc.appendChild(price)
    cardDesc.appendChild(origPrice)
    cardDesc.appendChild(discPrice)

    cardBody.appendChild(cardBodyTitle)
    cardBody.appendChild(cardDesc)
    cardBody.appendChild(prodDesc)
    cardBody.appendChild(anchor)

    outerCard.appendChild(thumbnail)
    outerCard.appendChild(cardBody)
    root.appendChild(outerCard)

    return root
}

// 
class CartModel {
    cart: CartProduct[] = []
}

class ICartListener implements CartListener {
    OnCartUpdate(cartProducts: CartProduct[]) {
        console.log(cartProducts)
        //  Render
    }
}

interface CartListener {
    OnCartUpdate(cartProducts: CartProduct[]): any
}

const cModel = new CartModel();
// CartHandler Class (Handles UI)
class CartHandler implements CartActions {

    private _listener: CartListener;
    public get listener(): CartListener {
        return this._listener;
    }

    constructor(listener: CartListener) {
        this._listener = listener
    }

    private cartItems: CartProduct[] = [];
    get items(): CartProduct[] {
        return this.cartItems;
    }

    onclickAddToCart(product: ProductStructure) {
        var cartProduct = new CartProduct(product.id, product.title, product.disc_price, 1)

        //  When cart is empty
        if (cModel.cart.length == 0) {
            cModel.cart.push(cartProduct)
            this.listener.OnCartUpdate(cModel.cart)
            return
        }

        for (var cp of cModel.cart) {
            if (cp.id == cartProduct.id) {
                cp.count++
                this.listener.OnCartUpdate(cModel.cart)
                return
            }
        }

        cModel.cart.push(cartProduct)
        this.listener.OnCartUpdate(cModel.cart)

        console.log("Cart count : ", cModel.cart)
    }

    addToCart(cartProduct: CartProduct): void {

        // check for repeated products
        // for (let i = 0; i < this.cartItems.length; i++) {

        // getter for added product
        var addedProduct = document.getElementsByClassName('cart-item');

        /* var cartItemTemplate = `
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
            `; */


        var cart = document.getElementById('cartBody');


        // cart.insertAdjacentHTML('beforeend', cartItemTemplate);

        // }



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

// Cart entity class (For conversion of added objects)
class CartProduct {
    id: string;
    title: string;
    price: number;
    count: number;

    constructor(id: string, title: string, price: number, count: number) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.count = count;
    }
}






