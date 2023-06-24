const db = require("../models");
const Cinema = db.cinema;
const Movie = db.movie;

exports.getCinemas = (req, res) => {
    let cinemaCondition = req.query.cinemaName ? { name: req.query.cinemaName } : null;

    db.sequelize.transaction((transaction) => {
        return Promise.all([
            Cinema.findAll({
                where: cinemaCondition,
                include: [{
                    model: db.seance,
                    where: { date: new Date(req.params.seanceDate) },
                    attributes: ["date", "time", "price"],
                    include: [{
                        model: db.movie,
                        where: { name: req.params.movieName },
                        attributes: ["name", "description"]
                    }]
                }]
            }, { transaction }),
            Cinema.findAll({ attributes: ["name"] }, { transaction }),
            Movie.findOne({
                where: { name: req.params.movieName },
                attributes: ["name", "description"]
            }, { transaction })
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
