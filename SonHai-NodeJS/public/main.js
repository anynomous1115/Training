import {
  showProduct,
  colorsEvent,
  sizesEvent,
  menuEventLoggedIn,
  menuEventNotLoggedIn,
} from "./ui-controllers/product.Controllers.js";
import { getAllProducts } from "./services/products.service.js";
import { cartEvent } from "./ui-controllers/cart.controller.js";
import { getCarts } from "./services/cart.service.js";
import { logoutEvent } from "./ui-controllers/logout.controller.js";
import { checkUserLogIn } from "./services/users.service.js";

window.addEventListener("load", () => {
  async function main() {
    await getAllProducts();
    await checkUserLogIn();
    await getCarts();
    showProduct();
    cartEvent();
    colorsEvent();
    sizesEvent();
    menuEventLoggedIn();
    logoutEvent();
    menuEventNotLoggedIn();
  }

  main();
});
