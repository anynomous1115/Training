const express = require('express');
const app = express();
const port = 3030;

app.get('/home', (req, res) => res.send("hello word"))
app.listen(port, () => console.log(`Example app listening on port ${port}`))
