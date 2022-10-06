const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { successCode, errorCode, failCode } = require("../ulti/response");
const authController = require("../controllers/authController");
const jwt_decode = require("jwt-decode");

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
    // console.log(items);
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
const convertDate = (date) => {
    return date.split("/").reverse().join("-");
};
//Banner - Poster
const getAllPoster = async (req, res) => {
    const res_data = await prisma.movie.findMany({
        select: {
            id: true,
            name: true,
            poster: true
        }
    });
    successCode(res, res_data);
};
const getMovie = async (req, res) => {
    const { tenPhim } = req.query;

    if (tenPhim) {
        const res_data = await prisma.movie.findMany({
            where: {
                name: {
                    contains: tenPhim
                }
            }
        });
        successCode(res, res_data);
    } else {
        const res_data = await prisma.movie.findMany();
        successCode(res, res_data);
    }
};
const getMoviePagination = async (req, res) => {
    const { maNhom, tenPhim, soTrang, soPhanTuTrenTrang } = req.query;
    if (tenPhim) {
        let items = await prisma.movie.findMany({
            where: {
                name: {
                    contains: tenPhim
                }
            }
        });
        const res_data = await pagination(soTrang, soPhanTuTrenTrang, items);

        successCode(res, res_data);
    } else {
        //show all nếu không có tên film
        let items = await prisma.movie.findMany();
        const res_data = await pagination(soTrang, soPhanTuTrenTrang, items);

        successCode(res, res_data);
    }
};
const getMovieByDate = async (req, res) => {
    const { maNhom, tenPhim, soTrang, soPhanTuTrenTrang, tuNgay, denNgay } =
        req.query;
    if (tuNgay && denNgay) {
        const tuNgayCv = new Date(convertDate(tuNgay));
        const denNgayCv = new Date(convertDate(denNgay));
        const items = await prisma.movie.findMany({
            where: {
                name: {
                    contains: tenPhim
                },
                startDate: {
                    gte: tuNgayCv, //greater than or equal >= tuNgay
                    lte: denNgayCv // <= denNgay
                }
            }
        });
        const res_data = await pagination(soTrang, soPhanTuTrenTrang, items);
        successCode(res, res_data);
    } else {
        //show rỗng ( không dùng api nếu không nhập tuNgay,denNgay => su dung api phan trang binh thuong)
        successCode(res, []);
    }
};
//Chi upload hình cho phim có sẵn
const addMovieUploadImg = async (req, res) => {
    const { filename } = req.file;
    const { maPhim } = req.body;

    let getData = await prisma.movie.findFirst({
        where: {
            id: Number(maPhim)
        }
    });
    if (filename) {
        let data = { ...getData, poster: `/public/poster/${filename}` };
        try {
            const res_data = await prisma.movie.update({
                where: {
                    id: Number(maPhim)
                },
                data
            });

            successCode(res, res_data);
        } catch {
            failCode(res);
        }
    } else {
        errorCode(res, "Upload không thành công!");
    }
};
// Update phim dựa trên formData:
// maPhim - id ,
// tenPhim - name ,
// ngayKhoiChieu - startDate,
// thoiLuong-time, danhGia - evaluate,
//  hinhAnh - image,
//  trailer
const updateMovie = async (req, res) => {
    const { trailer, hinhAnh } = req.files;

    const { maPhim, tenPhim, ngayKhoiChieu, thoiLuong, danhGia } = req.body;
    try {
        let getData = await prisma.movie.findFirst({
            where: {
                id: Number(maPhim)
            }
        });
        // if (hinhAnh) {
        //     getData.poster = `/public/poster/${hinhAnh[0].filename}`;
        // }
        // if (trailer) {
        //     getData.trailer = `/public/trailer/${trailer[0].filename}`;
        // }

        /*Prisma Client differentiates between null and undefined:
            null is a value
            undefined means do nothing.(1)
            Nếu các fields name, time,... không có trong form-data -> dưới phép gán dưới đây có value là undefined(2)
            (1),(2)=> update thành công các fields được thêm trong form-data, các fields khác giữ nguyên như trong db
        */
        if (getData) {
            let data = {
                ...getData,
                name: tenPhim && tenPhim, //ES6 x:a&&b x=b nếu a truthy, x=a nếu a falsy (undefined,0,NaN,null)
                startDate: ngayKhoiChieu && new Date(ngayKhoiChieu),
                time: thoiLuong && Number(thoiLuong),
                evaluate: danhGia && Number(danhGia), //danhGia="0" khác với danhGia=0
                poster: hinhAnh && `/public/poster/${hinhAnh[0].filename}`,
                trailer: trailer && `/public/trailer/${trailer[0].filename}`
            };
            console.log(data);
            const res_data = await prisma.movie.update({
                where: {
                    id: Number(maPhim)
                },
                data
            });
            successCode(res, res_data);
        } else {
            errorCode(res, "Mã phim không tồn tại");
        }
    } catch {
        failCode(res);
    }
};
//Thêm phim theo swagger (Trường hợp thêm đầy đủ bằng form-data thì tương tự updateMovie ở trên thay lệnh prisma = create)
const addMovie = async (req, res) => {
    const { filename } = req.file;
    const { tenPhim } = req.query;
    let data = {
        name: tenPhim && tenPhim, //ES6 x:a&&b x=b nếu a truthy, x=a nếu a falsy (undefined,0,NaN,null)
        trailer: req.file && `/public/trailer/${filename}`
    };
    try {
        const res_data = await prisma.movie.create({
            data
        });
        if (res_data) {
            successCode(res, res_data);
        } else {
            errorCode(res, res_data);
        }
    } catch {
        failCode(res);
    }
};
//deleteMovie
const deleteMovie = async (req, res) => {
    const { maPhim } = req.query;
    if (maPhim) {
        const isExist = await prisma.movie.findFirst({
            where: {
                id: Number(maPhim)
            }
        });
        if (isExist) {
            try {
                const res_data = await prisma.movie.delete({
                    where: {
                        id: Number(maPhim)
                    }
                });
                successCode(res, res_data);
            } catch {
                failCode(res);
            }
        } else {
            errorCode(res, "Mã phim không tồn tại");
        }
    } else {
        res.status(500).send("Mã phim không hợp lệ");
    }
};

const getMovieById = async (req, res) => {
    const { maPhim } = req.query;
    if (maPhim) {
        const res_data = await prisma.movie.findFirst({
            where: {
                id: Number(maPhim)
            }
        });
        if (res_data) {
            successCode(res, res_data);
        } else {
            errorCode(res, "Mã phim không tồn tại");
        }
    } else {
        res.status(500).send("Mã phim không hợp lệ");
    }
};

module.exports = {
    getAllPoster,
    getMovie,
    getMoviePagination,
    getMovieByDate,
    addMovieUploadImg,
    updateMovie,
    addMovie,
    deleteMovie,
    getMovieById
};
