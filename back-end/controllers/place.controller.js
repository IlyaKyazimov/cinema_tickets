const db = require("../models");
const PlacesInfo = db.placesInfo;

exports.getPlaces = (req, res) => {
    PlacesInfo.findAll({
        include: [{
            model: db.place,
            as: 'places',
            attributes: ['line', 'number', 'status']
        },
        {
            model: db.seance,
            where: [{ date: req.params.seanceDate }, { time: req.params.seanceTime }],
            include: [{
                model: db.cinema,
                where: { name: req.params.seanceCinema}
            }]
        }],
        order: [['places', 'line', 'asc'], ['places', 'number', 'asc']]
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
