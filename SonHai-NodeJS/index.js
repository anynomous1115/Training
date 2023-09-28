const express = require('express');
const app = express();
const port = 3030;
const path = require('path');
const router = require('./src/routes/route');
const { handleError } = require('./src/middlewares/handleError');


app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", router);
app.use(handleError)


// route 
app.get("/", async (req, res) =>
    res.sendFile(__dirname + "/public/index.html")
);
app.get("/login", async (req, res) =>
    res.sendFile(__dirname + "/public/login.html")
);
app.get("/register", async (req, res) =>
    res.sendFile(__dirname + "/public/register.html")
);


app.listen(port, () => console.log(`Example app listening on port ${port}`));
