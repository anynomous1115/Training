import { API_URL } from "../constants/api.js";
import { cartState, productsState } from "../ui-global-state/state.js";


const getData = async () => {
    return await fetch(`${API_URL}/data`)
        .then(res => res.json())
        .then(data => {
            data.products.forEach(element => {
                productsState.push(element)
            });
            data.carts.forEach(element => {
                const findProduct = productsState.find(i => i.id == element.id)
                if (findProduct !== undefined) {
                    cartState.push(element)
                }
            })

        })
        .catch((error) => {
            console.log(error);
        })
}

export {
    getData
}