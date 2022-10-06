const express = require("express");
const userRouter = express.Router();
const userController = require("../../controllers/userController");
const authController = require("../../controllers/authController");
const jwt_decode = require("jwt-decode");
const { successCode, errorCode, failCode } = require("../../ulti/response");

userRouter.get("/LayDanhSachLoaiNguoiDung", userController.getUserRole);
userRouter.post("/DangNhap", userController.login);
userRouter.post("/DangKy", userController.signup);
userRouter.get("/LayDanhSachNguoiDung", userController.getAllUser);
userRouter.get(
    "/LayDanhSachNguoiDungPhanTrang",
    userController.getUserPagination
);
userRouter.get("/TimKiemNguoiDung", userController.findUser);
userRouter.get("/TimKiemNguoiDungPhanTrang", userController.findUserPagination);
userRouter.post(
    "/ThongTinTaiKhoan",
    authController.checkToken, // không cần check role vì bản thân người dùng có token theo secret key là được
    userController.getAccount
);
userRouter.post(
    "/LayThongTinNguoiDung",
    authController.checkToken,
    authController.checkRole, //check role admin role_id=1
    userController.getUser
);
userRouter.post(
    "/ThemNguoiDung",
    authController.checkToken,
    authController.checkRole, //check role admin role_id=1
    userController.createUser
);
userRouter.put(
    "/CapNhatThongTinNguoiDung",
    authController.checkToken,
    authController.checkRole, //check role admin role_id=1
    userController.updateUser
);
userRouter.post(
    "/CapNhatThongTinNguoiDung",
    authController.checkToken,
    authController.checkRole, //check role admin role_id=1
    userController.updateUser
);
userRouter.delete(
    "/XoaNguoiDung",
    authController.checkToken,
    authController.checkRole, //check role admin role_id=1
    userController.deleteUser
);

module.exports = userRouter;
