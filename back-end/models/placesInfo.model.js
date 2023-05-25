const { DataTypes } = require("sequelize");
const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const PlacesInfo = sequelize.define("placesInfo", {
        total: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        free: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        busy: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return PlacesInfo;
}
