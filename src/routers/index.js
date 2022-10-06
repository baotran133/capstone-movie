const express = require("express");
const rootRouter = express.Router();
const userRouter = require("../routers/v1/userRouter");
const cinemaRouter = require("./v1/cinemaRouter");
const movieRouter = require("./v1/movieRouter");
const ticketRouter = require("./v1/ticketRouter");

rootRouter.use("/QuanLyDatVe", ticketRouter);
rootRouter.use("/QuanLyNguoiDung", userRouter);
rootRouter.use("/QuanLyRap", cinemaRouter);
rootRouter.use("/QuanLyPhim", movieRouter);
module.exports = rootRouter;
