const express = require('express');
const app = express();
const port = 3030;
const path = require('path');
const fs = require('fs').promises;
const db = require('./db/db.json');

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const pathFileJson = __dirname + "/db/db.json"

const readFileJson = (pathFile) => {
    return fs.readFile(pathFile, 'utf8', (err, contents) => {
        resolve(contents);
    })
}
const writeFileJson = (pathFile, data) => {
    return fs.writeFile(pathFile, data);
}

const dataProcessing = async (req, res) => {
    try {
        const dataInJson = await readFileJson(pathFileJson)
        const dataParse = JSON.parse(dataInJson)
        return dataParse
    } catch (error) {
        res.status(400).json("Something went wrong");
    }
}

// function check(data){
//         return /^[0-9]*$/.test(data);
//   }
  
// app.get("/test", async (req, res) => {
//     res.send(check(req.body.quantity))
// })



// route 
app.get("/", async (req, res) =>
    res.render(__dirname + "/public/index.html")
);

app.get("/products", async (req, res) => {
    try {
        const data = await dataProcessing(req, res)
        if (typeof data.products == 'string') {
            res.status(404).json("Something went wrong");
        } else {
            res.status(200).json(data.products);
        }
    } catch (error) {
        res.status(400).json("Something went wrong");
    }
});

app.get("/carts", async (req, res) => {
    try {
        const data = await dataProcessing(req, res)
        if (typeof data.carts == 'string') {
            res.status(404).json("Something went wrong");
        } else {
            res.status(200).json(data.carts);
        }
    } catch (error) {
        res.status(400).json("Something went wrong");
    }
});

app.post("/carts", async (req, res) => {
    try {
        const data = await dataProcessing(req, res)
        if (typeof data.carts == 'string') {
            res.status(404).json("Something went wrong");
        } else {
            const checkReqBody = data.products.find(i => i.id == req.body.id);
            console.log(checkReqBody);
            if (checkReqBody === undefined) {
                res.status(404).json("San pham khong ton tai trong kho");
            } else {
                const itemCarts = {
                    id: checkReqBody.id,
                    quantity: 1
                };
                data.carts.push(itemCarts);
                await writeFileJson(pathFileJson, JSON.stringify(data));
                const itemResponse = data.carts.find(i => i.id == itemCarts.id);
                res.status(201).json(itemResponse);
            }
        }
    } catch (error) {
        res.status(400).json("Something went wrong");
    }
})

app.delete("/carts/:id", async (req, res) => {
    try {
        const data = await dataProcessing(req, res)
        if (typeof data.carts == 'string') {
            res.status(404).json("Something went wrong");
        } else {
            const index = data.carts.findIndex(i => i.id == req.params.id);
            if (index == -1) {
                res.status(404).json("San pham khong ton tai trong gio hang");
            } else {
                const itemCarts = data.carts[index]
                data.carts.splice(index, 1);
                await writeFileJson(pathFileJson, JSON.stringify(data));
                res.status(200).json(itemCarts);
            }
        }
    } catch (error) {
        res.status(400).json("Something went wrong");
    }
})

app.put("/carts/:id", async (req, res) => {
    try {
        const data = await dataProcessing(req, res)
    if (typeof data.carts == 'string') {
        res.status(404).json("Something went wrong");
    } else {
        const index = data.carts.findIndex(i => i.id == req.body.id);
        if (index == -1) {
            res.status(404).json("San pham khong ton tai trong gio hang");
        } else {
            if (typeof req.body.quantity == 'number') {
                console.log(req.body.quantity);
                data.carts[index].quantity = req.body.quantity;
                await writeFileJson(pathFileJson, JSON.stringify(data));
                res.status(200).json(data.carts[index]);
            } else {
                res.status(400).json("so luong nhap vao khong hop le")
            }

        }
    }
    } catch (error) {
        res.status(400).json("Something went wrong");
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}`));
