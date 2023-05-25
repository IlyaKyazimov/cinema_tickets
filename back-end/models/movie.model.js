const { DataTypes } = require("sequelize");
const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Movie = sequelize.define("movies", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        ageRating: {
            type: DataTypes.ENUM("0+", "1+", "2+", "3+", "4+", "5+", "6+", "7+",
             "8+", "9+", "10+", "11+", "12+", "13+", "14+", "15+", 
             "16+", "17+", "18+"),
            allowNull: false
        },
        genre: {
            type: DataTypes.ENUM("Cartoon", "Drama", "Comedy", "Thriller"),
            allowNull: false
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        finishDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });

    return Movie;
}
