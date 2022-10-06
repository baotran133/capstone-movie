const express = require("express");
const cinemaRouter = express.Router();
const cinemaController = require("../../controllers/cinemaController");

cinemaRouter.get("/LayThongTinHeThongRap", cinemaController.getCineplex);
cinemaRouter.get(
    "/LayThongTinCumRapTheoHeThong",
    cinemaController.getAllCinemaByCineplex
);
cinemaRouter.get(
    "/LayThongTinLichChieuHeThongRap",
    cinemaController.getShowtimeByCineplex
);
cinemaRouter.get(
    "/LayThongTinLichChieuPhim",
    cinemaController.getShowtimeByMovieId
);

module.exports = cinemaRouter;
