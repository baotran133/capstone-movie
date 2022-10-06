const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return ticket.init(sequelize, DataTypes);
}

class ticket extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'movie',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'ticket',
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
        name: "ticket_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "ticket_ibfk_2",
        using: "BTREE",
        fields: [
          { name: "movieId" },
        ]
      },
    ]
  });
  }
}
