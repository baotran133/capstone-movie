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
        //show all n???u kh??ng c?? t??n film
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
        //show r???ng ( kh??ng d??ng api n???u kh??ng nh???p tuNgay,denNgay => su dung api phan trang binh thuong)
        successCode(res, []);
    }
};
//Chi upload h??nh cho phim c?? s???n
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
        errorCode(res, "Upload kh??ng th??nh c??ng!");
    }
};
// Update phim d???a tr??n formData:
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
            N???u c??c fields name, time,... kh??ng c?? trong form-data -> d?????i ph??p g??n d?????i ????y c?? value l?? undefined(2)
            (1),(2)=> update th??nh c??ng c??c fields ???????c th??m trong form-data, c??c fields kh??c gi??? nguy??n nh?? trong db
        */
        if (getData) {
            let data = {
                ...getData,
                name: tenPhim && tenPhim, //ES6 x:a&&b x=b n???u a truthy, x=a n???u a falsy (undefined,0,NaN,null)
                startDate: ngayKhoiChieu && new Date(ngayKhoiChieu),
                time: thoiLuong && Number(thoiLuong),
                evaluate: danhGia && Number(danhGia), //danhGia="0" kh??c v???i danhGia=0
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
            errorCode(res, "M?? phim kh??ng t???n t???i");
        }
    } catch {
        failCode(res);
    }
};
//Th??m phim theo swagger (Tr?????ng h???p th??m ?????y ????? b???ng form-data th?? t????ng t??? updateMovie ??? tr??n thay l???nh prisma = create)
const addMovie = async (req, res) => {
    const { filename } = req.file;
    const { tenPhim } = req.query;
    let data = {
        name: tenPhim && tenPhim, //ES6 x:a&&b x=b n???u a truthy, x=a n???u a falsy (undefined,0,NaN,null)
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
            errorCode(res, "M?? phim kh??ng t???n t???i");
        }
    } else {
        res.status(500).send("M?? phim kh??ng h???p l???");
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
            errorCode(res, "M?? phim kh??ng t???n t???i");
        }
    } else {
        res.status(500).send("M?? phim kh??ng h???p l???");
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
