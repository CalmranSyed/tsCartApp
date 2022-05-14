import "./css/style.css"
import Render from "./Render";

class main {
    constructor() {
        const r = new Render();
        r.renderProducts();
    }
}

new main();