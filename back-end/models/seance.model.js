const { DataTypes } = require("sequelize");
const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Seance = sequelize.define("seances", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Seance;
}