const express = require("express");
const ticketRouter = express.Router();
const ticketController = require("../../controllers/ticketController");
const authController = require("../../controllers/authController");
ticketRouter.post("/DatVe", authController.checkToken, ticketController.datVe);

ticketRouter.get("/LayDanhSachPhongVe", ticketController.layDanhSachPhongVe);

ticketRouter.post(
    "/TaoLichChieu",
    authController.checkToken,
    authController.checkRole,
    ticketController.taoLichChieu
);

module.exports = ticketRouter;
