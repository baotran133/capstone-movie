const { Sequelize } = require("sequelize");

const config = require("../config/index");

const sequelize = new Sequelize(
    config.db_name,
    config.db_user,
    config.db_password,
    {
        host: config.db_host,
        dialect: config.db_dialect,
        port: config.db_port
    }
);
try {
    sequelize.authenticate();
    console.log("Connected!!!");
} catch (error) {
    console.error("Error", error);
}
module.exports = sequelize;
