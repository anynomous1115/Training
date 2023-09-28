const { readFileJson } = require("../services/service");
const path = require("path");

const pathFileJson = path.join(__dirname, "../db/db.json");

const getData = async (req, res) => {
  try {
    const dataInJson = await readFileJson(pathFileJson);
    const dataParse = JSON.parse(dataInJson);
    return dataParse;
  } catch (error) {
    res.status(400).json({ message: "Something went wrong ! 1234" });
  }
};
module.exports = {
  getData,
};
