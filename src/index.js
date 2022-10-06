const express = require("express");

const cors = require("cors");

const mysql = require("mysql2");
const config = require("../src/config/index");

const rootRouter = require("../src/routers/index");

const app = express();

app.use(cors());

app.use(express.static("."));

app.use(express.json());

app.use("/api", rootRouter);
app.listen(8080);
