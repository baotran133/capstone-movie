const express = require("express");
const ticketRouter = express.Router();
const ticketController = require("../../controllers/ticketController");
const authController = require("../../controllers/authController");
ticketRouter.post("/DatVe", authController.checkToken, ticketController.datVe);

ticketRouter.get("/LayDanhSachPhongVe", ticketController.layDanhSachPhongVe);

ticketRouter.post(
    "/TaoLichChieu",
    authController.checkToken, //check token nguoi dung
    authController.checkRole, //check role nguoi dung role_id=1
    ticketController.taoLichChieu
);

module.exports = ticketRouter;
