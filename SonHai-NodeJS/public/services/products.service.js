import { API_URL } from "../constants/api.js";
import { productsState } from "../ui-global-state/state.js";

const getAllProducts = async () => {
  return await fetch(`/api/v1/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      const {data} = result
      data.forEach((element) => {
        productsState.push(element);
      });
    })
    .catch((error) => {
      console.log("Something went wrong");
    });
};
export { getAllProducts };
