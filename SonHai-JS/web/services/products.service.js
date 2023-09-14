import { API_URL } from "../constants/api.js"
import { productsState } from "../ui-global-state/state.js";

const getAllProducts = async () => {
    try {
        const response = await fetch(`${API_URL}/products`)
        const products = await response.json()
        products.forEach(element => {
            productsState.push(element)
        })
    } catch (error) {
        console.log(error);
    }

} 
export{
    getAllProducts
}