const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/index");
const jwt_decode = require("jwt-decode");
const hashPass = (password) => bcrypt.hashSync(password, 10);
const comparePass = (password, hashPassword) =>
    bcrypt.compareSync(password, hashPassword);
const generateToken = (data) => {
    const payload = data;
    const key = config.secret_key;
    const algorithm = "HS256";
    const expiresIn = "3d";

    let token = jwt.sign(payload, key, { algorithm, expiresIn });
    return token;
};
const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.secret_key);
    } catch (err) {
        return false;
    }
};

const checkToken = (req, res, next) => {
    let { authentication } = req.headers;
    if (authentication) {
        if (verifyToken(authentication)) {
            next();
        } else {
            res.status(401).send("Token không hợp lệ!");
        }
    } else {
        res.status(401).send("Token không hợp lệ!"); //Unauthorized
    }
};
const checkRole = (req, res, next) => {
    const { authentication } = req.headers;
    const decode = jwt_decode(authentication);
    if (decode.role_id == 1) {
        next();
    } else {
        res.status(403).send("Không đủ quyền truy cập!"); //Don't have permission
    }
};
module.exports = {
    hashPass,
    comparePass,
    generateToken,
    verifyToken,
    checkToken,
    checkRole
};
