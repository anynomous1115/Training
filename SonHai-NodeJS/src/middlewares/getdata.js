const { readFileJson } = require("../services/service")
const path = require('path');

const pathFileJson = path.join(__dirname, "../db/db.json")

const getData = async (req, res, next) => {
    try {
        const dataInJson = await readFileJson(pathFileJson)
        const dataParse = JSON.parse(dataInJson)
        // if (dataParse == undefined) {
        //     res.status(400).json("cos looix xayr ra")
        //     return
        // } else {
            return dataParse
        // }
    } catch (error) {
        res.status(400).json("Something went wrong");
    }
}
module.exports = {
    getData
}