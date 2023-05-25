const config = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Add models
db.country    = require("./country.model")(sequelize, Sequelize);
db.cinema     = require("./cinema.model")(sequelize, Sequelize);
db.customer   = require("./customer.model")(sequelize, Sequelize);
db.movie      = require("./movie.model")(sequelize, Sequelize);
db.order      = require("./order.model")(sequelize, Sequelize);
db.place      = require("./place.model")(sequelize, Sequelize);
db.placesInfo = require("./placesInfo.model")(sequelize, Sequelize);
db.reciept    = require("./reciept.model")(sequelize, Sequelize);
db.sale       = require("./sale.model")(sequelize, Sequelize);
db.seance     = require("./seance.model")(sequelize, Sequelize);
db.ticket     = require("./ticket.model")(sequelize, Sequelize);

db.movie.hasOne(db.country, { onDelete: "cascade"});
db.order.hasOne(db.customer, { onDelete: "cascade"});
db.order.hasMany(db.sale, { onDelete: "cascade"});
db.order.hasOne(db.reciept, { onDelete: "cascade"});
db.placesInfo.hasMany(db.place, { onDelete: "cascade"});
db.sale.hasOne(db.ticket, { onDelete: "cascade"});
db.seance.hasOne(db.cinema, { onDelete: "cascade"});
db.seance.hasOne(db.placesInfo, { onDelete: "cascade"});
db.seance.hasOne(db.movie, { onDelete: "cascade"});
db.ticket.hasOne(db.seance, { onDelete: "cascade"});

module.exports = db;