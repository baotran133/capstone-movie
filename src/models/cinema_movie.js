const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return cinema_movie.init(sequelize, DataTypes);
}

class cinema_movie extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cinemaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cinema',
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
    tableName: 'cinema_movie',
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
        name: "cinema_movie_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "cinemaId" },
        ]
      },
      {
        name: "cinema_movie_ibfk_2",
        using: "BTREE",
        fields: [
          { name: "movieId" },
        ]
      },
    ]
  });
  }
}
