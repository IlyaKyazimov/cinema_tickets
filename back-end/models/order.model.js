const { DataTypes } = require("sequelize");
const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("New", "Waiting_payment", "Canceled_payment", "Paid"),
            allowNull: false
        }
    });

    return Order;
}
