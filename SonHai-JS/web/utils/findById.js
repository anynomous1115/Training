import { productsState } from "../ui-global-state/state.js"

const getProductById = ( id) => {
   const product= productsState.find(data => data.id == id)
   return product
}
export {
    getProductById
}