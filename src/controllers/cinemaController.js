const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { successCode, errorCode, failCode } = require("../ulti/response");

const getCineplex = async (req, res) => {
    const { maHeThongRap } = req.query;
    if (maHeThongRap) {
        const res_data = await prisma.cineplex.findFirst({
            where: {
                id: Number(maHeThongRap)
            }
        });
        if (res_data) {
            successCode(res, res_data);
        } else {
            errorCode(res, "Mã hệ thống rạp không tồn tại");
        }
    } else {
        const res_data = await prisma.cineplex.findMany();
        successCode(res, res_data);
    }
};
const getAllCinemaByCineplex = async (req, res) => {
    const { maHeThongRap } = req.query;
    if (maHeThongRap) {
        const res_data = await prisma.cineplex.findMany({
            where: {
                id: Number(maHeThongRap)
            },
            include: {
                cinema: true
            }
        });
        if (res_data.length > 0) {
            successCode(res, res_data);
        } else {
            errorCode(res, "Mã hệ thống rạp không tồn tại");
        }
    } else {
        errorCode(res, "Mã hệ thống rạp không tồn tại");
    }
};
const getShowtimeByCineplex = async (req, res) => {
    const { maHeThongRap } = req.query;
    if (maHeThongRap) {
        const res_data = await prisma.cineplex.findMany({
            where: {
                id: Number(maHeThongRap)
            },
            include: {
                cinema: {
                    include: {
                        showtime: true
                    }
                }
            }
        });
        if (res_data.length > 0) {
            successCode(res, res_data);
        } else {
            errorCode(res, "Mã hệ thống rạp không tồn tại");
        }
    } else {
        errorCode(res, "Mã hệ thống rạp không tồn tại");
    }
};
const getShowtimeByMovieId = async (req, res) => {
    const { maPhim } = req.query;
    if (maPhim) {
        const res_data = await prisma.movie.findMany({
            where: {
                id: Number(maPhim)
            },
            include: {
                cinema_movie: {
                    include: {
                        cinema: {
                            include: {
                                showtime: true
                            }
                        }
                    }
                }
            }
        });
        if (res_data.length > 0) {
            successCode(res, res_data);
        } else {
            errorCode(res, "Mã hệ thống rạp không tồn tại");
        }
    } else {
        errorCode(res, "Mã hệ thống rạp không tồn tại");
    }
};

module.exports = {
    getCineplex,
    getAllCinemaByCineplex,
    getShowtimeByCineplex,
    getShowtimeByMovieId
};
