import { API_URL } from "../constants/api.js";
import { cartState, productsState } from "../ui-global-state/state.js"

const getAllCartItem = async () => {
    fetch(`${API_URL}/carts`)
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                cartState.push(element)
            })
        })
        .catch((error) => {
            console.log(error);
        })
}

const updateQuantityCartItem = (id, num) => {
    const index = cartState.findIndex(i => i.id == id)
    if (num == 1 || num == -1) {
        fetch(`${API_URL}/carts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                quantity: cartState[index].quantity += parseInt(num)
            })

        })
            .catch((error) => {
                console.log(error);
            })

    } else {
        fetch(`${API_URL}/carts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                quantity: cartState[index].quantity = parseInt(num)
            })
        })
            .catch((error) => {
                console.log(error);
            })
    }
}

const deleteCartItem = (id) => {
    const index = cartState.findIndex(i => i.id == id)
    fetch(`${API_URL}/carts/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(
            cartState.splice(index, 1)
        )
        .catch((error) => {
            console.log(error);
        })
}

const addToCart = (id) => {
    const indexCartItem = cartState.findIndex(i => i.id == id)
    if (indexCartItem !== -1) {
        cartState[indexCartItem].quantity += 1
        fetch(`${API_URL}/carts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                quantity: cartState[indexCartItem].quantity
            })
        })
            .catch((error) => {
                console.log(error);
            })
    } else {
        // get /url/:id
        // post /url   body {username: "TTT"}
        // put /url/:id  body {username: "XXX"}
        // delete /url/:id
        fetch(`${API_URL}/carts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                quantity: 1,
            })
        })
            .then(
                cartState.push({
                    id,
                    quantity: 1,
                })
            )
            .catch((error) => {
                console.log(error);
            })
    }
}

const totalCartCalculator = () => {
    return cartState.reduce((previousValue, cartItem) => {
        const index = productsState.findIndex(product => product.id == cartItem.id)
        if (index > -1) {
            previousValue += cartItem.quantity * productsState[index].currentPrice
        }
        return previousValue
    }, 0)
}

export {
    getAllCartItem,
    addToCart,
    updateQuantityCartItem,
    deleteCartItem,
    totalCartCalculator,
}