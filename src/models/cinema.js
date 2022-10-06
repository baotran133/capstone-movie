const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return cinema.init(sequelize, DataTypes);
}

class cinema extends Sequelize.Model {
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
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cineplexId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cineplex',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'cinema',
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
        name: "cinema_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "cineplexId" },
        ]
      },
    ]
  });
  }
}
