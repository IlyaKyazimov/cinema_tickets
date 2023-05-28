const db = require("../models");
const Movie = db.movie;

exports.findAll = (req, res) => {
    Movie.findAll()
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
