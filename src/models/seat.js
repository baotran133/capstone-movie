const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return seat.init(sequelize, DataTypes);
}

class seat extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    showtimeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'showtime',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'seat',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "seat_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "showtimeId" },
        ]
      },
    ]
  });
  }
}
