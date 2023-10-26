import { productsState } from "../ui-global-state/state.js";

const getProductById = (id) => {
  const product = productsState.find((data) => data._id == id);
  return product;
};
export { getProductById };
