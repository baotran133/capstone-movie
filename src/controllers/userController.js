const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { successCode, errorCode, failCode } = require("../ulti/response");
const authController = require("../controllers/authController");
const jwt_decode = require("jwt-decode");
// Exclude keys from user
const exclude = (user, ...keys) => {
    for (let key of keys) {
        delete user[key];
    }
    return user;
};
const pagination = async (soTrang, soPhanTuTrenTrang, items) => {
    const currentPage = Number(soTrang);
    const count =
        Number(soPhanTuTrenTrang) <= items.length
            ? Number(soPhanTuTrenTrang)
            : items.length;
    const totalCount = items.length;
    const totalPages = Math.ceil(totalCount / count);
    const startIndex = (Number(soTrang) - 1) * soPhanTuTrenTrang;
    const endIndex = startIndex + Number(soPhanTuTrenTrang);
    console.log(items);
    items = items.slice(startIndex, endIndex);
    const res_data = {
        currentPage,
        count,
        totalPages,
        totalCount,
        items
    };
    return res_data;
};

const getUserRole = async (req, res) => {
    const res_data = await prisma.user.findMany({
        select: {
            role_id: true
        },
        distinct: ["role_id"]
    });
    successCode(res, res_data);
};
const signup = async (req, res) => {
    const { taiKhoan, matKhau, email, soDt, maNhom, hoTen } = req.body;
    const isExist1 = await prisma.user.findFirst({
        where: {
            id: Number(taiKhoan)
        }
    });

    const isExist2 = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if (isExist1) {
        errorCode(res, "Tài khoản đã tồn tại!");
    } else if (isExist2) {
        errorCode(res, "Email đã tồn tại!");
    } else {
        const res_data = await prisma.user.create({
            data: {
                id: Number(taiKhoan),
                name: hoTen,
                email,
                phone: soDt,
                password: authController.hashPass(matKhau)
            }
        });

        if (res_data) {
            const res_data_without_pw = exclude(res_data, "password");
            successCode(res, res_data_without_pw);
        } else {
            errorCode(res, res_data);
        }
    }
};
const login = async (req, res) => {
    const { taiKhoan, matKhau } = req.body;
    const res_data = await prisma.user.findFirst({
        where: {
            id: Number(taiKhoan)
        }
    });
    if (!res_data) {
        errorCode(res, "Tài khoản hoặc mật khẩu không đúng");
    } else {
        const db_pass = res_data.password;
        const isAuth = authController.comparePass(matKhau, db_pass);
        //res khong hien password
        if (isAuth) {
            let obj = res_data;
            let token = authController.generateToken(obj);
            const res_data_without_pw = exclude(res_data, "password");
            res_data_without_pw.accessToken = token;
            successCode(res, res_data_without_pw);
        } else {
            errorCode(res, "Login không thành công");
        }
    }
};
//Lay danh sach nguoi dung
const getAllUser = async (req, res) => {
    const { tuKhoa } = req.query;

    if (tuKhoa) {
        const res_data = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: tuKhoa
                        }
                    },
                    {
                        phone: {
                            contains: tuKhoa
                        }
                    },
                    {
                        id: {
                            equals: isNaN(Number(tuKhoa))
                                ? undefined
                                : Number(tuKhoa)
                        }
                    }
                ]
            }
        });
        successCode(res, res_data);
    } else {
        const res_data = await prisma.user.findMany();
        successCode(res, res_data);
    }
};
//Lay danh sach nguoi dung phan trang
const getUserPagination = async (req, res) => {
    const { maNhom, tuKhoa, soTrang, soPhanTuTrenTrang } = req.query;
    if (tuKhoa) {
        let items = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: tuKhoa
                        }
                    },
                    {
                        phone: {
                            contains: tuKhoa
                        }
                    },
                    {
                        id: {
                            equals: isNaN(Number(tuKhoa))
                                ? undefined
                                : Number(tuKhoa)
                        }
                    }
                ]
            }
        });
        const res_data = await pagination(soTrang, soPhanTuTrenTrang, items);
        successCode(res, res_data);
    } else {
        let items = await prisma.user.findMany();
        const res_data = await pagination(soTrang, soPhanTuTrenTrang, items);
        successCode(res, res_data);
    }
};
const findUser = async (req, res) => {
    const { maNhom, tuKhoa } = req.query;
    if (tuKhoa) {
        const res_data = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: tuKhoa
                        }
                    },
                    {
                        phone: {
                            contains: tuKhoa
                        }
                    },
                    {
                        id: {
                            equals: isNaN(Number(tuKhoa))
                                ? undefined
                                : Number(tuKhoa)
                        }
                    }
                ]
            }
        });
        successCode(res, res_data);
    } else {
        const res_data = await prisma.user.findMany();
        successCode(res, res_data);
    }
};
// tuong tu lay danh sach nguoi dung phan trang
const findUserPagination = async (req, res) => {
    const { maNhom, tuKhoa, soTrang, soPhanTuTrenTrang } = req.query;
    if (tuKhoa) {
        let items = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: tuKhoa
                        }
                    },
                    {
                        phone: {
                            contains: tuKhoa
                        }
                    },
                    {
                        id: {
                            equals: isNaN(Number(tuKhoa))
                                ? undefined
                                : Number(tuKhoa)
                        }
                    }
                ]
            }
        });
        const res_data = await pagination(soTrang, soPhanTuTrenTrang, items);
        successCode(res, res_data);
    } else {
        let items = await prisma.user.findMany();
        const res_data = await pagination(soTrang, soPhanTuTrenTrang, items);
        successCode(res, res_data);
    }
};
//Lay thong tin dua tren token (duoc generate khi dang nhap thanh cong)
const getAccount = async (req, res) => {
    const { authentication } = req.headers;
    const res_data = jwt_decode(authentication);

    successCode(res, res_data);
};
//auth bang token duoc generate khi dang nhap thanh cong va co role_id == 1 (quyen admin), auth ở middleware, get data bang query taiKhoan
const getUser = async (req, res) => {
    const { taiKhoan } = req.query;
    if (taiKhoan) {
        const res_data = await prisma.user.findFirst({
            where: {
                id: Number(taiKhoan)
            }
        });
        if (res_data) {
            successCode(res, res_data);
        } else {
            errorCode(res, "Người dùng không tồn tại");
        }
    } else {
        res.status(500).send("Mã tài khoản không hợp lệ");
    }
};
//auth bang token duoc generate khi dang nhap thanh cong va co role_id == 1 (quyen admin), auth ở middleware, post data req.body
const createUser = async (req, res) => {
    const { taiKhoan, matKhau, email, soDt, maNhom, maLoaiNguoiDung, hoTen } =
        req.body;
    const isExist1 = await prisma.user.findFirst({
        where: {
            id: Number(taiKhoan)
        }
    });

    const isExist2 = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if (isExist1) {
        errorCode(res, "Tài khoản đã tồn tại!");
    } else if (isExist2) {
        errorCode(res, "Email đã tồn tại!");
    } else {
        try {
            const res_data = await prisma.user.create({
                data: {
                    id: taiKhoan,
                    name: hoTen,
                    email,
                    phone: soDt,
                    password: authController.hashPass(matKhau),
                    role_id: maLoaiNguoiDung
                }
            });
            if (res_data) {
                const res_data_without_pw = exclude(res_data, "password");
                successCode(res, res_data_without_pw);
            } else {
                errorCode(res, res_data);
            }
        } catch {
            failCode(res);
        }
    }
};
const updateUser = async (req, res) => {
    const { taiKhoan, matKhau, email, soDt, maNhom, maLoaiNguoiDung, hoTen } =
        req.body;
    const isExist = await prisma.user.findUnique({
        where: {
            id: Number(taiKhoan)
        }
    });
    if (isExist) {
        const data = {
            name: hoTen,
            email,
            phone: soDt,
            password: authController.hashPass(matKhau),
            role_id: maLoaiNguoiDung
        };
        try {
            const res_data = await prisma.user.update({
                where: {
                    id: Number(taiKhoan)
                },
                data
            });
            successCode(res, res_data);
        } catch {
            failCode(res);
        }
    } else {
        errorCode(res, "Người dùng không tồn tại"); //Người dùng không tồn tại
    }
};
const deleteUser = async (req, res) => {
    const { taiKhoan } = req.query;
    if (taiKhoan) {
        const isExist = await prisma.user.findUnique({
            where: {
                id: Number(taiKhoan)
            }
        });
        if (isExist) {
            try {
                const res_data = await prisma.user.delete({
                    where: {
                        id: Number(taiKhoan)
                    }
                });
                successCode(res, res_data);
            } catch {
                failCode(res);
            }
        } else {
            errorCode(res, "Người dùng không tồn tại"); //Người dùng không tồn tại
        }
    } else {
        res.status(500).send("Mã người dùng không hợp lệ");
    }
};

module.exports = {
    getUserRole,
    signup,
    login,
    getAllUser,
    getUserPagination,
    findUser,
    findUserPagination,
    getAccount,
    getUser,
    createUser,
    updateUser,
    deleteUser
};
