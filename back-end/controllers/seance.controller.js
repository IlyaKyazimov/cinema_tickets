const db = require("../models");
//const Seance = db.seance;
const Cinema = db.cinema;

exports.getCinemas = (req, res) => {
    Cinema.findAll({
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
