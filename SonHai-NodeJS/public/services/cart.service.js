import { API_URL } from "../constants/api.js";
import { cartState, productsState } from "../ui-global-state/state.js";
import { handleCartItemUpdate } from "../utils/handleCartItemUpdate.js";
import { showSuccessToastWithAutoHide } from "../utils/toast.js";

const getCarts = async () => {
  try {
    const cartsResponse = await fetch(`api/carts`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const cartData = await cartsResponse.json();
    if (cartData.cart) {
      await getCartProduct();
    }
    if (cartData.cart == null) {
      const createCart = await fetch(`api/carts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      await createCart.json();
    }
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

const getCartProduct = async () => {
  const getCartProductOfUser = await fetch(`api/carts-products`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await getCartProductOfUser.json();

  data.forEach((element) => {
    const findProduct = productsState.find((i) => i._id == element.productID);
    if (findProduct !== undefined) {
      cartState.push(element);
    }
  });
};

const updateQuantityCartItem = async (id, num) => {
  const index = cartState.findIndex((i) => i.productID == id);
  if (num == 1 || num == -1) {
    await fetch(`api/carts-products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        quantity: (cartState[index].quantity += parseInt(num)),
      }),
    }).catch((error) => {
      console.log("Something went wrong");
    });
  } else {
    await fetch(`api/carts-products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        quantity: (cartState[index].quantity = parseInt(num)),
      }),
    })
      .then((res) => {
        if (res.status === 400) {
          showSuccessToastWithAutoHide(
            "Vui lòng nhập lại số lượng ",
            "#db4444"
          );
        }
      })
      .catch((error) => {
        console.log("Something went wrong");
      });
  }
};

const deleteCartItem = async (id) => {
  const index = cartState.findIndex((i) => i.id == id);
  await fetch(`api/carts-products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(cartState.splice(index, 1))
    .catch((error) => {
      console.log("Something went wrong");
    });
};

const addToCart = async (id) => {
  const indexCartItem = cartState.findIndex((i) => i.productID == id);
  if (indexCartItem !== -1) {
    cartState[indexCartItem].quantity += 1;
    const updateWithAddToCart = await fetch(`api/carts-products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        quantity: cartState[indexCartItem].quantity,
      }),
    });
    if (updateWithAddToCart.ok) {
      return true;
    } else {
      return handleCartItemUpdate(false);
    }
  } else {
    // get /url/:id
    // post /url   body {username: "TTT"}
    // put /url/:id  body {username: "XXX"}
    // delete /url/:id

    const addToCartRes = await fetch(`api/carts-products/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        quantity: 1,
      }),
    });
    const response = await addToCartRes.json();
    if (addToCartRes.status === 401) {
      return handleCartItemUpdate(false);
    }
    cartState.push(response);
    return cartState;
  }
};

const totalCartCalculator = () => {
  return cartState.reduce((previousValue, cartItem) => {
    const index = productsState.findIndex(
      (product) => product._id == cartItem.productID
    );
    previousValue += cartItem.quantity * productsState[index].currentPrice;
    return previousValue;
  }, 0);
};

export {
  getCarts,
  addToCart,
  updateQuantityCartItem,
  deleteCartItem,
  totalCartCalculator,
};
