const express = require('express');
const app = express();
const port = 3030;
const path = require('path')
const fs = require('fs')
const db = require('./db/db.json');

app.use(express.urlencoded())
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));

// route
app.get("/", (req, res) =>
    res.render(__dirname + "/public/index.html")
);

app.get("/data", (req, res) =>
    res.sendFile(__dirname + "/db/db.json")
);

app.post("/carts", (req, res) => {
    fs.readFile(__dirname + "/db/db.json", 'utf8', (err, data) => {
        data = JSON.parse(data);
        data.carts.push(req.body)
        res.end(fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(data)))
    })
})

app.delete("/carts/:id", (req, res) => {
    fs.readFile(__dirname + "/db/db.json", 'utf8', (err, data) => {
        data = JSON.parse(data);
        const index = data.carts.findIndex(i => i.id == req.params.id)
        data.carts.splice(index, 1)
        res.end(fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(data)))
    })
})

app.put("/carts/:id", (req, res) => {
    fs.readFile(__dirname + "/db/db.json", 'utf8', (err, data) => {
        data = JSON.parse(data);
        const index = data.carts.findIndex(i => i.id == req.params.id)
        data.carts[index].quantity = req.body.quantity
        res.end(fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(data)))
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}`));