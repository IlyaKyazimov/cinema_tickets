const db = require("../models");
const Movie = db.movie;
const Country = db.country;

exports.getMovies = (req, res) => {
    let movieConditions = {};
    req.query.genre ? movieConditions.genre = req.query.genre : null;
    req.query.ageRating ? movieConditions.ageRating = req.query.ageRating + '+' : null;

    let countryCondition = req.query.country ? { name: req.query.country } : null;

    db.sequelize.transaction((transaction) => {
        return Promise.all([
            Movie.findAll({
                where: movieConditions,
                include: [{
                    model: db.country,
                    where: countryCondition,
                    attributes: ["name"]
                }],
            }, { transaction }),
            Country.findAll({ attributes: ["name"] }, { transaction }),
            Movie.rawAttributes.genre.values
        ]);
    })
        .then(data => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving films."
            });
        });
};
