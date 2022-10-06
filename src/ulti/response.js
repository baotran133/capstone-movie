//200
const successCode = (res, data) => {
    let dSend = {
        statusCode: 200,
        message: "Xử lý thành công",
        content: data
    };
    res.status(200).send(dSend);
};
//400
const errorCode = (res, data) => {
    let dSend = {
        message: "Không tìm thấy tài nguyên",
        data: data
    };
    res.status(400).send(dSend);
};
//500
const failCode = (res, data) => {
    let dSend = {
        message: "Lỗi hệ thống",
        data: data
    };
    res.status(500).send(dSend);
};
module.exports = {
    successCode,
    errorCode,
    failCode
};
