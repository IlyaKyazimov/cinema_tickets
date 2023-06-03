const db = require("../models");
const Seance = db.seance;

exports.getSeances = (req, res) => {
    Seance.findAll({
        where: { date: new Date(req.params.seanceDate) },
        include: [{
            model: db.movie,
            where: { name: req.params.movieName },
            attributes: ["name", "description"]
        },
        {
            model: db.cinema,
            attributes: ["name", "address"]
        }],
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
