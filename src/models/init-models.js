const DataTypes = require("sequelize").DataTypes;
const _cinema = require("./cinema");
const _cinema_movie = require("./cinema_movie");
const _cineplex = require("./cineplex");
const _movie = require("./movie");
const _seat = require("./seat");
const _showtime = require("./showtime");
const _ticket = require("./ticket");
const _user = require("./user");

function initModels(sequelize) {
  const cinema = _cinema(sequelize, DataTypes);
  const cinema_movie = _cinema_movie(sequelize, DataTypes);
  const cineplex = _cineplex(sequelize, DataTypes);
  const movie = _movie(sequelize, DataTypes);
  const seat = _seat(sequelize, DataTypes);
  const showtime = _showtime(sequelize, DataTypes);
  const ticket = _ticket(sequelize, DataTypes);
  const user = _user(sequelize, DataTypes);

  cinema_movie.belongsTo(cinema, { as: "cinema", foreignKey: "cinemaId"});
  cinema.hasMany(cinema_movie, { as: "cinema_movies", foreignKey: "cinemaId"});
  showtime.belongsTo(cinema, { as: "cinema", foreignKey: "cinemaId"});
  cinema.hasMany(showtime, { as: "showtimes", foreignKey: "cinemaId"});
  cinema.belongsTo(cineplex, { as: "cineplex", foreignKey: "cineplexId"});
  cineplex.hasMany(cinema, { as: "cinemas", foreignKey: "cineplexId"});
  cinema_movie.belongsTo(movie, { as: "movie", foreignKey: "movieId"});
  movie.hasMany(cinema_movie, { as: "cinema_movies", foreignKey: "movieId"});
  ticket.belongsTo(movie, { as: "movie", foreignKey: "movieId"});
  movie.hasMany(ticket, { as: "tickets", foreignKey: "movieId"});
  seat.belongsTo(showtime, { as: "showtime", foreignKey: "showtimeId"});
  showtime.hasMany(seat, { as: "seats", foreignKey: "showtimeId"});
  ticket.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(ticket, { as: "tickets", foreignKey: "userId"});

  return {
    cinema,
    cinema_movie,
    cineplex,
    movie,
    seat,
    showtime,
    ticket,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
