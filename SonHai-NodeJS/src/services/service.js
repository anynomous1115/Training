const fs = require("fs").promises;
const path = require("path");
const { handleError } = require("../middlewares/handleError");

const pathFileJson = path.join(__dirname, "../db/db.json");

const readFileJson = (pathFile) => {
  return fs.readFile(pathFile, "utf8", (err, contents) => {
    resolve(contents);
  });
};
const writeFileJson = (pathFile, data) => {
  return fs.writeFile(pathFile, data);
};

const getData = async () => {
  try {
    const dataInJson = await readFileJson(pathFileJson);
    const dataParse = JSON.parse(dataInJson);
    // new Error('Lỗi xảy ra trong hàm')
    return dataParse;
  } catch (error) {
    throw error
  }

};

module.exports = {
  readFileJson,
  writeFileJson,
  getData,
};
