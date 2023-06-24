const config = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    port: config.PORT
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

db.movie.belongsTo(db.country, { foreignKey: "countryId", targetKey: 'id' });
db.country.hasMany(db.movie, { 
  foreignKey: 'countryId',
  targetKey: 'id',
  onDelete: "cascade"
});

db.order.belongsTo(db.customer, { foreignKey: "customerId", targetKey: 'id' });
db.customer.hasMany(db.order, { 
  foreignKey: 'customerId',
  targetKey: 'id',
  onDelete: "cascade"
});

db.order.belongsTo(db.seance, { foreignKey: "seanceId", targetKey: 'id' });
db.seance.hasMany(db.order, { 
  foreignKey: 'seanceId',
  targetKey: 'id',
  onDelete: "cascade"
});

db.sale.belongsTo(db.order, { foreignKey: "orderId", targetKey: 'id' });
db.order.hasMany(db.sale, { 
  as: 'sales',
  foreignKey: 'orderId',
  targetKey: 'id',
  onDelete: "cascade"
});

db.order.belongsTo(db.reciept, { foreignKey: "recieptId", targetKey: 'id' });
db.reciept.hasOne(db.order, { 
  foreignKey: 'recieptId',
  targetKey: 'id',
  onDelete: "cascade"
});

db.place.belongsTo(db.placesInfo, { foreignKey: "placesInfoId", targetKey: 'id' });
db.placesInfo.hasMany(db.place, { 
  foreignKey: 'placesInfoId',
  targetKey: 'id',
  onDelete: "cascade"
});

db.ticket.belongsTo(db.sale, { foreignKey: "saleId", targetKey: 'id' });
db.sale.hasOne(db.ticket, { 
  as: 'ticket',
  foreignKey: 'saleId',
  targetKey: 'id',
  onDelete: "cascade"
});

db.seance.belongsTo(db.cinema, { foreignKey: "cinemaId", targetKey: 'id' });
db.cinema.hasMany(db.seance, { 
  foreignKey: 'cinemaId',
  targetKey: 'id',
  onDelete: "cascade"
});

db.seance.belongsTo(db.placesInfo, { foreignKey: "placesInfoId", targetKey: 'id' });
db.placesInfo.hasOne(db.seance, { 
  foreignKey: 'placesInfoId',
  targetKey: 'id',
  onDelete: "cascade"
});

db.seance.belongsTo(db.movie, { foreignKey: "movieId", targetKey: 'id' });
db.movie.hasMany(db.seance, { 
  foreignKey: 'movieId',
  targetKey: 'id',
  onDelete: "cascade"
});

module.exports = db;
