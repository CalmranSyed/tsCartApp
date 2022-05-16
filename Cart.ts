import cartListener from "./IcartListener";
import ProductStructure from "./IProductStructure";

export default class Cart implements cartListener {
    cartItems: string[] = [];

    get items(): string[] {
        return this.cartItems;
    }

    addListeners(buttons: HTMLCollection) {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", (e: Event) => {
                e.preventDefault();
                this.addItem(buttons[i].getAttribute("data-id"));
            });
        }
    }

    addItem(id: string): void {
        this.cartItems.push(id);
        this.items;
    }

    showCartQuantity() {
        console.log(this.cartItems);

        if (this.cartItems.length > 0) {
            var qunatityBadge: HTMLElement = document.querySelector('.show-cart .cartQuantity');
            qunatityBadge.style.display = "block";
            qunatityBadge.innerHTML = (this.cartItems.length).toString();
        }
    }

}