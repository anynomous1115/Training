const express = require('express');
const app = express();
const port = 3030;
const path = require('path');
const fs = require('fs').promises;
const db = require('./db/db.json');

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


const readFileJson = (pathFile) => {
    return fs.readFile(pathFile, 'utf8', (err, contents) => {
        resolve(contents);
    })
}
const writeFileJson = (pathFile, data) => {
    return fs.writeFile(pathFile, data);
}

// route 
app.get("/", async (req, res) =>
    res.render(__dirname + "/public/index.html")
);

app.get("/products", async (req, res) => {
    try {
        const dataInJson = await readFileJson(__dirname + "/db/db.json")
            .catch((error) => {
                res.status(400).json("Something went wrong");
            })
        const dataParse = JSON.parse(dataInJson)
        if (typeof dataParse.products == 'string') {
            res.status(404).json("Something went wrong");
        } else {
            res.status(200).json(dataParse.products);
        }
    } catch (error) {
        res.status(400).json("Something went wrong");
    }
});

app.get("/carts", async (req, res) => {
    try {
        const dataInJson = await readFileJson(__dirname + "/db/db.json")
            .catch((error) => {
                res.status(400).json("Something went wrong");
            })
        const dataParse = JSON.parse(dataInJson);
        if (typeof dataParse.carts == 'string') {
            res.status(404).json("Something went wrong");
        } else {
            res.status(200).json(dataParse.carts);
        }
    } catch (error) {
        res.status(400).json("Something went wrong");
    }
});

app.post("/carts", async (req, res) => {
    try {
        const dataInJson = await readFileJson(__dirname + "/db/db.json")
            .catch((error) => {
                res.status(400).json("Something went wrong");
            })
        const dataParse = JSON.parse(dataInJson);
        if (typeof dataParse.carts == 'string') {
            res.status(404).json("Something went wrong");
        } else {
            const checkReqBody = dataParse.products.find(i => i.id == req.body.id);
            console.log(checkReqBody);
            if (checkReqBody === undefined) {
                res.status(404).json("San pham khong ton tai trong kho");
            } else {
                const itemCarts = {
                    id: checkReqBody.id,
                    quantity: 1
                };
                dataParse.carts.push(itemCarts);
                await writeFileJson(__dirname + "/db/db.json", JSON.stringify(dataParse));
                const itemResponse = dataParse.carts.find(i => i.id == itemCarts.id);
                res.status(201).json(itemResponse);
            }
        }
    } catch (error) {
        res.status(400).json("Something went wrong");
    }
})

app.delete("/carts/:id", async (req, res) => {
    try {
        const dataInJson = await readFileJson(__dirname + "/db/db.json")
            .catch((error) => {
                res.status(400).json("Something went wrong");
            })
        const dataParse = JSON.parse(dataInJson);
        if (typeof dataParse.carts == 'string') {
            res.status(404).json("Something went wrong");
        } else {
            const index = dataParse.carts.findIndex(i => i.id == req.params.id);
            if (index == -1) {
                res.status(404).json("San pham khong ton tai trong gio hang");
            } else {
                const itemCarts = dataParse.carts[index]
                dataParse.carts.splice(index, 1);
                await writeFileJson(__dirname + "/db/db.json", JSON.stringify(dataParse));
                res.status(200).json(itemCarts);
            }
        }
    } catch (error) {
        res.status(400).json("Something went wrong");
    }
})

app.put("/carts/:id", async (req, res) => {
    const dataInJson = await readFileJson(__dirname + "/db/db.json")
        .catch((error) => {
            res.status(400).json("Something went wrong");
        })
    const dataParse = JSON.parse(dataInJson);
    if (typeof dataParse.carts == 'string') {
        res.status(404).json("Something went wrong");
    } else {
        const index = dataParse.carts.findIndex(i => i.id == req.body.id);
        if (index == -1) {
            res.status(404).json("San pham khong ton tai trong gio hang");
        } else {
            dataParse.carts[index].quantity = req.body.quantity;
            await writeFileJson(__dirname + "/db/db.json", JSON.stringify(dataParse));
            res.status(200).json(dataParse.carts[index]);
        }
    }
})

const main = () => {
    try {
        app.listen(port, () => console.log(`Example app listening on port ${port}`));
    } catch (error) {
        res.status(500).json("Something went wrong");
    }
}
main()