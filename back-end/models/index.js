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

db.country.hasMany(db.movie, { 
  foreignKey: 'countryId',
  targetKey: 'id',
  onDelete: "cascade"
});
db.customer.hasMany(db.order, { 
  foreignKey: 'customerId',
  targetKey: 'id',
  onDelete: "cascade"
});
db.order.hasMany(db.sale, { 
  foreignKey: 'orderId',
  targetKey: 'id',
  onDelete: "cascade"
});
db.reciept.hasOne(db.order, { 
  foreignKey: 'recieptId',
  targetKey: 'id',
  onDelete: "cascade"
});
db.placesInfo.hasMany(db.place, { 
  foreignKey: 'placesInfoId',
  targetKey: 'id',
  onDelete: "cascade"
});
db.ticket.hasOne(db.sale, { 
  foreignKey: 'ticketId',
  targetKey: 'id',
  onDelete: "cascade"
});
db.cinema.hasMany(db.seance, { 
  foreignKey: 'cinemaId',
  targetKey: 'id',
  onDelete: "cascade"
});
db.placesInfo.hasOne(db.seance, { 
  foreignKey: 'placesInfoId',
  targetKey: 'id',
  onDelete: "cascade"
});
db.movie.hasMany(db.seance, { 
  foreignKey: 'movieId',
  targetKey: 'id',
  onDelete: "cascade"
});
db.seance.hasMany(db.ticket, { 
  foreignKey: 'seanceId',
  targetKey: 'id',
  onDelete: "cascade"
});

module.exports = db;
