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

// route 
app.get("/", (req, res) =>
    res.render(__dirname + "/public/index.html")
);

app.get("/products", async (req, res) => {
    const dataInJson = await readFileJson(__dirname + "/db/db.json");
    const dataParse = JSON.parse(dataInJson)
    res.json(dataParse.products)
});

app.get("/carts", async (req, res) => {
    const dataInJson = await readFileJson(__dirname + "/db/db.json");
    const dataParse = JSON.parse(dataInJson)
    res.json(dataParse.carts)
});

app.post("/carts", async (req, res) => {
    const dataInJson = await readFileJson(__dirname + "/db/db.json");
    const dataParse = JSON.parse(dataInJson)
    const item = req.body
    dataParse.carts.push(item)
    writeFileJson(__dirname + "/db/db.json", JSON.stringify(dataParse))
    res.json(item)
})

app.delete("/carts/:id", async (req, res) => {
    const dataInJson = await readFileJson(__dirname + "/db/db.json");
    const dataParse = JSON.parse(dataInJson)
    const index = dataParse.carts.findIndex(i => i.id == req.params.id)
    const spliceCart = dataParse.carts.splice(index, 1)
    writeFileJson(__dirname + "/db/db.json", JSON.stringify(dataParse))
    res.json(spliceCart)
})

app.put("/carts/:id", async (req, res) => {
    const dataInJson = await readFileJson(__dirname + "/db/db.json");
    const dataParse = JSON.parse(dataInJson)
    const item = req.body
    const index = dataParse.carts.findIndex(i => i.id == item.id)
    dataParse.carts[index].quantity = item.quantity
    writeFileJson(__dirname + "/db/db.json", JSON.stringify(dataParse))
    res.json(item)

})

app.listen(port, () => console.log(`Example app listening on port ${port}`));