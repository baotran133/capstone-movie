const express = require("express");
const movieRouter = express.Router();
const movieController = require("../../controllers/movieController");
const { successCode, errorCode, failCode } = require("../../ulti/response");
const authController = require("../../controllers/authController");
const jwt_decode = require("jwt-decode");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname == "hinhAnh") {
            if (file.originalname.match(/\.(png|jpg|jpeg)$/)) {
                cb(null, process.cwd() + "/public/poster");
            } else {
                cb(new Error("Sai định dạng hinh ảnh"));
            }
        } else if (file.fieldname == "trailer") {
            if (file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
                cb(null, process.cwd() + "/public/trailer");
            } else {
                cb(new Error("Sai định dạng video"));
            }
        } else {
            cb(null, process.cwd() + "/public/");
        }
    },
    filename: (req, file, cb) => {
        //nên đặt tên file upload theo ngày tháng năm giờ phút giây để tên file không bị trùng lặp
        const fileNewName = Date.now() + "_" + file.originalname;
        cb(null, fileNewName);
    }
});

const upload = multer({ storage: storage });

movieRouter.get("/LayDanhSachBanner", movieController.getAllPoster);
movieRouter.get("/LayDanhSachPhim", movieController.getMovie);
movieRouter.get(
    "/LayDanhSachPhimPhanTrang",
    movieController.getMoviePagination
);
movieRouter.get("/LayDanhSachPhimTheoNgay", movieController.getMovieByDate);
movieRouter.post(
    "/ThemPhimUploadHinh",
    upload.single("hinhAnh"),
    movieController.addMovieUploadImg
);
movieRouter.post(
    "/CapNhatPhimUpload",
    authController.checkToken,
    authController.checkRole, //check role admin role_id=1
    upload.fields([
        { name: "trailer", maxCount: 1 },
        { name: "hinhAnh", maxCount: 1 }
    ]),
    movieController.updateMovie
);
movieRouter.post("/", upload.single("trailer"), movieController.addMovie);
movieRouter.delete(
    "/XoaPhim",
    authController.checkToken,
    authController.checkRole, //check role admin role_id=1
    movieController.deleteMovie
);
movieRouter.get("/LayThongTinPhim", movieController.getMovieById);

module.exports = movieRouter;
