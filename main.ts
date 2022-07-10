import "./css/style.css";

// interfaces
interface Product {
    id: string;
    title: string;
    desc: string;
    img_url: string;
    orig_price: number;
    disc_price: number;
    category: number;
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
    getProducts(): Promise<Product[]> {
        return axios.get(apiURL)
    }
}

var products: Product[] = [];

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

        cHandler.showCartQuantity();
        cHandler.checkEmpty();

    });
});


// Product Service (Used for rendering products and related data on)
class ProductService {

    // render product by taking data from the products array
    showProducts(products: Product[]) {

        var prodWrap = document.getElementById("products-wrapper");

        products.forEach((product) => {
            prodWrap.appendChild(createProducts(product))
        });
    }

    // Show total products count
    showCount(products: Product[]) {
        var prodCount = document.getElementById("total-products");
        prodCount.innerText = (products.length).toString();
    }

}

function createProducts(product: Product): HTMLDivElement {
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

function createCartItems(cartItem: CartProduct) {

    var cartItemUI = document.getElementsByClassName("cart-item");

    var root = document.createElement("div");
    root.setAttribute("class", "product cart-item card p-4 mb-3");

    var cardTop = document.createElement("div");
    cardTop.setAttribute("class", "cart-item-top d-flex alig-items-center flex-wrap justify-content-between")

    var prodInfo = document.createElement("div");

    var title = document.createElement("h5");
    title.setAttribute("class", "card-title d-inline-block")
    title.innerText = cartItem.title;

    var price = document.createElement("p");
    price.setAttribute("class", "product-price");
    price.innerText = "Price : " + cartItem.price * cartItem.count;

    var count = document.createElement("p");
    count.setAttribute("class", "item-quantity");
    count.innerText = "Quantity : " + cartItem.count;

    var cardBottom = document.createElement("div");
    cardBottom.setAttribute("class", "cart-item-bottom d-flex alig-items-center flex-wrap justify-content-end gap-3")

    // buttons for incrementing, decrementing and removing the products

    var increment = document.createElement("button");
    increment.setAttribute("class", "incrementItem btn btn-outline-dark flex-fill");
    increment.innerText = "+";
    increment.addEventListener('click', () => {
        cartItem.count++;
        console.log(cartItem);
    })

    var decrement = document.createElement("button");
    decrement.setAttribute("class", "decrementItem btn btn-outline-dark flex-fill");
    decrement.innerText = "-";
    decrement.addEventListener('click', () => {
        cModel.cart.forEach(ci => {
        });
        if (cartItem.count > 1) {
            cartItem.count--;
        }
        console.log(cartItem);

        return cartItem.count;

    })

    var remove = document.createElement("button");
    remove.setAttribute("class", "removeItem btn btn-outline-dark flex-fill");
    remove.innerText = "Remove";
    remove.addEventListener('click', () => {
        for (let i = 0; i < cModel.cart.length; i++) {
            cartItemUI[i].remove();
        }


        console.log(cModel.cart)
    });

    prodInfo.appendChild(title);
    prodInfo.appendChild(price);

    cardTop.appendChild(prodInfo);
    cardTop.appendChild(count);

    cardBottom.appendChild(increment);
    cardBottom.appendChild(decrement);
    cardBottom.appendChild(remove);

    root.appendChild(cardTop);
    root.appendChild(cardBottom);

    return root;
}

// 
class CartModel {
    cart: CartProduct[] = []
}


// middleware class
class ICartListener implements CartListener {
    OnCartUpdate(cartProducts: CartProduct[]) {
        console.log(cartProducts);
        //  Render
        var cart = document.getElementById('cartBody');
        var cartItemUI = document.getElementsByClassName('cart-item');

        for (let index = 0; index < cModel.cart.length; index++) {
            if (!cartItemUI[index]) {
                cart.appendChild(createCartItems(cModel.cart[index]));
            }
            else {
                console.log("Item already exists");
            }

        }



        cModel.cart.forEach(item => {

        });
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


    onclickAddToCart(product: Product) {
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
    }

    // show number of items on cart button
    showCartQuantity() {
        var qunatityBadge = document.querySelector('.show-cart .cartQuantity') as HTMLElement;

        if (cModel.cart.length > 0) {
            console.log('Quantity greater than 0');

            qunatityBadge.style.display = "block";
            qunatityBadge.innerText = (cModel.cart.length).toString();
        }
    }

    // Shows empty message if cart is empty
    checkEmpty() {
        var emptyMessage = document.getElementById('emptyCartMessage') as HTMLElement;

        emptyMessage.style.display = 'block';

        if (cModel.cart.length != 0) {
            emptyMessage.style.display = 'none';
        }
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






