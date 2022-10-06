const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return showtime.init(sequelize, DataTypes);
}

class showtime extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cinemaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cinema',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'showtime',
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
        name: "showtime_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "cinemaId" },
        ]
      },
    ]
  });
  }
}
