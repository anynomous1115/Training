const express = require("express");
const app = express();
const path = require("path");
const router = require("./src/routes/route");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const {connectDB} = require("./src/configs/database");

const port = process.env.PORT || 3030;

connectDB();

dotenv.config();

app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1", router);

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
