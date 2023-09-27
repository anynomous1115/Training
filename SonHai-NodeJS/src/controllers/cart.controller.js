const { getData } = require("../middlewares/getdata");
const { writeFileJson } = require("../services/service");
const path = require('path');

const pathFileJson = path.join(__dirname, "../db/db.json")

const getCart = async (req, res) => {
    try {
        const data = await getData(req, res)
        if (typeof data.carts == 'string') {
            res.status(404).json("Something went wrong");
        } else {
            res.status(200).json(data.carts);
        }
    } catch (error) {
        res.status(400).json("Something went wrong");
    }
}

const addToCart = async (req, res) => {
    try {
        const data = await getData(req, res)
        if (typeof data.carts == 'string') {
            res.status(404).json("Something went wrong");
            return
        } else {
            const checkReqBody = data.products.find(i => i.id == req.body.id);
            if (checkReqBody == undefined) {
                res.status(404).json("San pham khong ton tai trong kho");
                return
            } else {
                const itemCarts = {
                    id: checkReqBody.id,
                    quantity: req.body.quantity
                };
                data.carts.push(itemCarts);
                await writeFileJson(pathFileJson, JSON.stringify(data));
                const itemResponse = data.carts.find(i => i.id == itemCarts.id);
                res.status(201).json(itemResponse);
            }
        }
    } catch (error) {
        res.status(400).json("Something went wrong");
    }
}

const removeItem = async (req, res) => {
    try {
        const data = await getData(req, res)
        if (typeof data.carts == 'string') {
            res.status(404).json("Something went wrong");
            return
        } else {
            const index = data.carts.findIndex(i => i.id == req.params.id);
            if (index == -1) {
                res.status(404).json("San pham khong ton tai trong gio hang");
                return
            } else {
                const itemCarts = data.carts[index]
                data.carts.splice(index, 1);
                await writeFileJson(pathFileJson, JSON.stringify(data));
                res.status(200).json(itemCarts);
            }
        }
    } catch (error) {
        res.status(400).json("Something went wrong");
    }
}

const updateItem = async (req, res) => {
    try {
        const data = await getData(req, res)
        if (typeof data.carts == 'string') {
            res.status(404).json("Something went wrong");
            return
        } else {
            const index = data.carts.findIndex(i => i.id == req.body.id);
            if (index == -1) {
                res.status(404).json("San pham khong ton tai trong gio hang");
            } else {
                if (typeof req.body.quantity == 'number') {
                    data.carts[index].quantity = req.body.quantity;
                    await writeFileJson(pathFileJson, JSON.stringify(data));
                    res.status(200).json(data.carts[index]);
                } else {
                    res.status(400).json("so luong nhap vao khong hop le")
                    return
                }
            }
        }
    } catch (error) {
        res.status(400).json("Something went wrong");
    }
}

module.exports={
    getCart,
    addToCart,
    removeItem,
    updateItem
}