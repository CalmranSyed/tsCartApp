import "./css/style.css";
import Render from "./Render";
import APICall from "./APICall";
import ProductStructure from "./IProductStructure";

document.addEventListener("DOMContentLoaded", () => {
  new APICall().getProducts().then((response: any) => {
    let products: ProductStructure[] = [];
    response.data.products.forEach((product: any) => {
      products.push(product);
    });

    const r = new Render();
    r.renderProducts(products);
  });
});
