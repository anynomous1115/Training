const fs = require("fs").promises;
const path = require("path");

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
    const dataInJson = await readFileJson(pathFileJson);
    const dataParse = JSON.parse(dataInJson);
    return dataParse;
};

module.exports = {
  readFileJson,
  writeFileJson,
  getData,
};
