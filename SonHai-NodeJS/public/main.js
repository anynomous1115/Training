
import { showProduct, colorsEvent, sizesEvent, menuEvent } from "./ui-controllers/product.Controllers.js";
import { getAllProducts } from "./services/products.service.js";
import { cartEvent } from "./ui-controllers/cart.controller.js";
import { getAllCartItem } from "./services/cart.service.js";
import { logoutEvent } from "./ui-controllers/logout.controller.js";
// import { showPassword } from "./ui-controllers/register.controller.js";
logoutEvent
window.addEventListener("load", () => {
    async function main() {
        await getAllProducts()
        await getAllCartItem()
        showProduct()
        cartEvent()
        colorsEvent()
        sizesEvent()
        menuEvent()
        logoutEvent()
        // showPassword()
    }
    
    main()
});
