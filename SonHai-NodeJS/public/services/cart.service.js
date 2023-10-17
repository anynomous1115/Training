import { API_URL } from "../constants/api.js";
import { cartState, productsState } from "../ui-global-state/state.js";
import { showSuccessToastWithAutoHide } from "../utils/toast.js";

const getCarts = async () => {
  try {
    const cartsResponse = await fetch(`api/carts`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (cartsResponse.status === 200) {
      const cartItemsResponse = await fetch(`api/carts-item`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await cartItemsResponse.json();

      console.log(data);
      data.forEach((element) => {
        const findProduct = productsState.find((i) => i.id == element.id);
        if (findProduct !== undefined) {
          cartState.push(element);
        }
      });
    } else if (cartsResponse.status === 201) {
      const createCartResponse = await fetch(`api/carts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (createCartResponse.ok) {
        const createCartItemsResponse = await fetch(`api/carts-item`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (createCartItemsResponse.ok) {
          const cartItemsResponse = await fetch(`api/carts-item`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          const data = await cartItemsResponse.json();

          console.log(data);
          data.forEach((element) => {
            const findProduct = productsState.find((i) => i.id == element.id);
            if (findProduct !== undefined) {
              cartState.push(element);
            }
          });
        }
      }
    }
  } catch (error) {
    console.log("Something went wrong", error);
  }
};
// const getCarts = async () => {
//   await fetch(`api/carts`, {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   }).then((res) => {
//     console.log(res);
//     if (res.ok) {
//       fetch(`api/cart-item`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(data);
//           data.forEach((element) => {
//             const findProduct = productsState.find((i) => i.id == element.id);
//             if (findProduct !== undefined) {
//               cartState.push(element);
//             }
//           });
//         })
//         .catch((error) => {
//           console.log("Something went wrong");
//         });
//     } else if (res.status === 404) {
//       fetch(`api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }).then((res) => {
//         if (res.ok) {
//           fetch(`api/cart-item`, {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           })
//             .then((res) => res.json())
//             .then((data) => {
//               console.log(data);
//               data.forEach((element) => {
//                 const findProduct = productsState.find(
//                   (i) => i.id == element.id
//                 );
//                 if (findProduct !== undefined) {
//                   cartState.push(element);
//                 }
//               });
//             })
//             .catch((error) => {
//               console.log("Something went wrong");
//             });
//         }
//       });
//     }
//   });
// };

// const getCartsItem = async () => {
//   await fetch(`api/cart-item`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       data.forEach((element) => {
//         const findProduct = productsState.find((i) => i.id == element.id);
//         if (findProduct !== undefined) {
//           cartState.push(element);
//         }
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//       console.log("Something went wrong");
//     });
// };

const updateQuantityCartItem = async (id, num) => {
  const index = cartState.findIndex((i) => i.id == id);
  if (num == 1 || num == -1) {
    await fetch(`api/carts-item/${id}`, {
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
    await fetch(`api/carts-item/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        quantity: (cartState[index].quantity = parseInt(num)),
      }),
    }).catch((error) => {
      console.log("Something went wrong");
    });
  }
};

const deleteCartItem = async (id) => {
  const index = cartState.findIndex((i) => i.id == id);
  await fetch(`api/carts-item/${id}`, {
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
  const indexCartItem = cartState.findIndex((i) => i.id == id);
  if (indexCartItem !== -1) {
    cartState[indexCartItem].quantity += 1;
    await fetch(`api/carts-item/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        quantity: cartState[indexCartItem].quantity,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return true;
        } else if (res.status === 401) {
          return false;
        }
      })
      .then((data) => {
        if (!data) {
          const showCartItem = document.querySelector(".show-cart");
          showCartItem.style.display = "none";
          const overLay = document.querySelector(".cart__overlay");
          overLay.style.display = "none";

          showSuccessToastWithAutoHide("Bạn chưa đăng nhập!", "#db4444");
          setTimeout(() => {
            window.location.href = "/login";
          }, 1000);
        }
      })
      .catch((error) => {
        console.log("Something went wrong");
      });
  } else {
    // get /url/:id
    // post /url   body {username: "TTT"}
    // put /url/:id  body {username: "XXX"}
    // delete /url/:id
    await fetch(`api//carts-item/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        quantity: 1,
      }),
    })
      .then(
        cartState.push({
          id,
          quantity: 1,
        })
      )
      .then((res) => {
        if (res.ok) {
          return true;
        } else if (res.status === 401) {
          return false;
        }
      })
      .then((data) => {
        if (!data) {
          const showCartItem = document.querySelector(".show-cart");
          showCartItem.style.display = "none";
          const overLay = document.querySelector(".cart__overlay");
          overLay.style.display = "none";

          showSuccessToastWithAutoHide("Bạn chưa đăng nhập!", "#db4444");
          setTimeout(() => {
            window.location.href = "/login";
          }, 1000);
        }
      })
      .catch((error) => {
        console.log("Something went wrong");
      });
  }
};

const totalCartCalculator = () => {
  return cartState.reduce((previousValue, cartItem) => {
    const index = productsState.findIndex(
      (product) => product.id == cartItem.id
    );
    previousValue += cartItem.quantity * productsState[index].currentPrice;
    return previousValue;
  }, 0);
};

export {
  // getCartsItem,
  getCarts,
  addToCart,
  updateQuantityCartItem,
  deleteCartItem,
  totalCartCalculator,
};
