import { API_URL } from "../constants/api.js";
import { cartState, productsState } from "../ui-global-state/state.js"

const getAllCartItem = async () => {
    await fetch(`${API_URL}/carts`)
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                const findProduct = productsState.find(i => i.id == element.id)
                if (findProduct !== undefined) {
                    cartState.push(element)
                }
            })
        })
        .catch((error) => {
            console.log("Something went wrong");
        })
}

const updateQuantityCartItem = async (id, num) => {
    const index = cartState.findIndex(i => i.id == id)
    if (num == 1 || num == -1) {
        await fetch(`${API_URL}/carts/${id}`, {
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
                console.log("Something went wrong");
            })

    } else {
        console.log(num);
        await fetch(`${API_URL}/carts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                quantity: cartState[index].quantity = num
            })
        })
            .catch((error) => {
                console.log("Something went wrong");
            })
    }
}

const deleteCartItem =async (id) => {
    const index = cartState.findIndex(i => i.id == id)
    await fetch(`${API_URL}/carts/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(
            cartState.splice(index, 1)
        )
        .catch((error) => {
            console.log("Something went wrong");
        })
}

const addToCart = async (id) => {
    const indexCartItem = cartState.findIndex(i => i.id == id)
    if (indexCartItem !== -1) {
        cartState[indexCartItem].quantity += 1
        await fetch(`${API_URL}/carts/${id}`, {
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
                console.log("Something went wrong");
            })
    } else {
        // get /url/:id
        // post /url   body {username: "TTT"}
        // put /url/:id  body {username: "XXX"}
        // delete /url/:id
        await fetch(`${API_URL}/carts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                quantity: 1
            })
        })
            .then(
                cartState.push({
                    id,
                    quantity: 1,
                })
            )
            .catch((error) => {
                console.log("Something went wrong");
            })
    }
}

const totalCartCalculator = () => {
    return cartState.reduce((previousValue, cartItem) => {
        const index = productsState.findIndex(product => product.id == cartItem.id)
        previousValue += cartItem.quantity * productsState[index].currentPrice
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