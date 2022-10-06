const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { successCode, errorCode, failCode } = require("../ulti/response");

const datVe = async (req, res) => {
    const { userId, movieId } = req.body;
    const data = { userId, movieId };
    try {
        const res_data = await prisma.ticket.create({ data });
        if (res_data) {
            successCode(res, res_data);
        } else {
            errorCode(res, res_data);
        }
    } catch {
        failCode(res);
    }
};
/*Lấy data phòng vé(ghế) của table cinema_movie với MaLichChieu là primary key id của bảng cinema_movie
res data gôm thông tin phim(movie) và thông tin rạp - danh sách lịch chiếu(showtime) - danh sách ghế(seat) 
ứng với cặp field movie_cinema tìm được từ MaLichChieu(id)
*/
const layDanhSachPhongVe = async (req, res) => {
    const { MaLichChieu } = req.query;
    try {
        const res_data = await prisma.cinema_movie.findFirst({
            where: {
                id: Number(MaLichChieu)
            },
            include: {
                movie: true,
                cinema: {
                    include: {
                        showtime: {
                            include: {
                                seat: true
                            }
                        }
                    }
                }
            }
        });
        if (res_data) {
            successCode(res, res_data);
        } else {
            errorCode(res, "Mã lịch chiếu không tồn tại");
        }
    } catch {
        failCode(res);
    }
};

//showtime
const taoLichChieu = async (req, res) => {
    const { maPhim, ngayChieuGioChieu, maRap, giaVe } = req.body;
    const res_data = await prisma.showtime.create({
        data: {
            cinemaId: maRap,
            startTime: ngayChieuGioChieu
        }
    });
    successCode(res, res_data);
};

module.exports = {
    datVe,
    layDanhSachPhongVe,

    taoLichChieu
};
