import CartActions from "./IcartActions";
import cartListener from "./IcartActions";
import ProductStructure from "./IProductStructure";
import { products } from "./main";
export default class Cart implements CartActions {
    cartItems: ProductStructure[] = [];

    get items(): ProductStructure[] {
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
        this.cartItems.push(product);
        this.showCartQuantity();

        var cartItemTemplate = `
        <div class="product card mb-3">
            <div class="row g-0 align-items-center">
                <div class="col-md-4">
                    <img src="${product.img_url}" class="img-fluid rounded-start" alt="${product.title}">
                </div>
                <div class="col-md-8">
                    <div class="card-body p-3">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text product-price">
                            <span>Price :</span>
                            <span class="original-price text-decoration-line-through text-muted me-2">${product.orig_price} Rs</span>
                            <span class="discount-price fw-bold">${product.disc_price} Rs</span>
                        </p>
                        <p class="item-quantity-wrap">
                            <span>Quantity :</span>
                            <span class="item-quantity"></span>
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

}