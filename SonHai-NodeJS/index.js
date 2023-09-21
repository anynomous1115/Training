const express = require('express');
const app = express();
const port = 3030;
const path = require('path')
const fs = require('fs').promises;
const db = require('./db/db.json');
const carts = require('./db/carts.json')

app.use(express.urlencoded())
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));


const readFileJson = (pathFile) => {
    return fs.readFile(pathFile, 'utf8', (err, contents) => {
        resolve(contents)
    })
}
const writeFileJson = (pathFile, data) => {
    return fs.writeFile(pathFile, data)
}
app.post("/test", async (req, res) => {
    const dataInJson = await readFileJson(__dirname + "/db/carts.json");
    const dataParse = JSON.parse(dataInJson)
    dataParse.carts.push({ "id": "10", "quantity": 1 })
    console.log(dataParse);
    res.end(fs.writeFile(__dirname + "/db/carts.json", JSON.stringify(dataParse)))
})
// route 
app.get("/", (req, res) =>
    res.render(__dirname + "/public/index.html")
);

app.get("/data", (req, res) =>
    res.sendFile(__dirname + "/db/db.json")
);

app.post("/carts", async (req, res) => {
    const dataInJson = await readFileJson(__dirname + "/db/db.json");
    const dataParse = JSON.parse(dataInJson)
    dataParse.carts.push(req.body)
    res.send(writeFileJson(__dirname + "/db/db.json", JSON.stringify(dataParse)))
})

app.delete("/carts/:id", async (req, res) => {
    const dataInJson = await readFileJson(__dirname + "/db/db.json");
    const dataParse = JSON.parse(dataInJson)
    const index = dataParse.carts.findIndex(i => i.id == req.params.id)
    dataParse.carts.splice(index, 1)
    res.send(writeFileJson(__dirname + "/db/db.json", JSON.stringify(dataParse)))
})

app.put("/carts/:id", async (req, res) => {
    const dataInJson = await readFileJson(__dirname + "/db/db.json");
    const dataParse = JSON.parse(dataInJson)
    const index = dataParse.carts.findIndex(i => i.id == req.params.id)
    dataParse.carts[index].quantity = req.body.quantity
    res.send(writeFileJson(__dirname + "/db/db.json", JSON.stringify(dataParse)))

})

app.listen(port, () => console.log(`Example app listening on port ${port}`));