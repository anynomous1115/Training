const fs = require('fs').promises;

const readFileJson = (pathFile) => {
    return fs.readFile(pathFile, 'utf8', (err, contents) => {
        resolve(contents);
    })
}
const writeFileJson = (pathFile, data) => {
    return fs.writeFile(pathFile, data);
}

module.exports = {
    readFileJson,
    writeFileJson
}