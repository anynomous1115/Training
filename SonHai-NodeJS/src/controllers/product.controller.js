const { getData } = require("../utils/getdata");

const getProducts = async (req, res,checkData) => {
        const data = await getData()
        res.status(200).json(data.products);

}

module.exports = {
    getProducts
}