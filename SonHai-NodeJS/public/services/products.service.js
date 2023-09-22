import { API_URL } from "../constants/api.js"
import { productsState } from "../ui-global-state/state.js";

const getAllProducts = async () => {
    return await fetch(`${API_URL}/products`)
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                productsState.push(element)
            });
        })
        .catch((error) => {
            console.log("Something went wrong");
        })

} 
export{
    getAllProducts
}