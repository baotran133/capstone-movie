const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    return user.init(sequelize, DataTypes);
};

class user extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                taiKhoan: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    field: "id"
                },
                hoTen: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                    field: "name"
                },
                email: {
                    type: DataTypes.STRING(255),
                    allowNull: true
                },
                soDT: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                    field: "phone"
                },
                matKhau: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                    field: "password"
                },
                maLoaiNguoiDung: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    field: "role_id"
                }
            },
            {
                sequelize,
                tableName: "user",
                timestamps: false,
                indexes: [
                    {
                        name: "PRIMARY",
                        unique: true,
                        using: "BTREE",
                        fields: [{ name: "id" }]
                    }
                ]
            }
        );
    }
}
