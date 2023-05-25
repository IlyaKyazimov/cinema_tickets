const { DataTypes } = require("sequelize");
const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Reciept = sequelize.define("reciepts", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        totalSum: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    
    return Reciept;
}