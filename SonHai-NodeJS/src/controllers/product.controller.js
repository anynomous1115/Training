const { getData } = require("../middlewares/getdata");

const getProducts = async (req, res) => {
    try {
        const data = await getData(req, res)
        if (typeof data.products == 'string') {
            res.status(404).json({ message: "Something went wrong !" });
            return 
            // sua o day
        } else {
            res.status(200).json(data.products);
        }
    } catch (error) {
        res.status(400).json({ message: "Something went wrong !" })
    }
}

module.exports = {
    getProducts
}