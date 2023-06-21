const db = require("../models");
const PlacesInfo = db.placesInfo;

exports.getPlaces = (req, res) => {

    PlacesInfo.findAll({
        include: [{
            model: db.place,
            as: 'places',
            attributes: ['id', 'line', 'number', 'status']
        },
        {
            model: db.seance,
            where: [{ date: req.params.seanceDate }, { time: req.params.seanceTime }],
            include: [{
                model: db.cinema,
                where: { name: req.params.seanceCinema }
            },
            {
                model: db.movie
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

const Place = db.place;

exports.updatePlace = (req, res) => {

    db.sequelize.transaction((transaction) => {
        return Promise.all([
            PlacesInfo.update({ free: req.body.placesInfoFree, busy: req.body.placesInfoBusy }, {
                where: { id: req.body.placesInfoId }
            }, { transaction }),
            Place.update({ status: req.body.seatStatus }, {
                where: { id: req.body.seatId }
            }, { transaction })
        ]);
    })
        .then(() => {
            res.status(200).send({
                message: "PlacesInfo and Place were updated successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error updating PlacesInfo and Place"
            })
        });
};

const Order = db.order;

exports.cancelOrder = (req, res) => {

    db.sequelize.transaction((transaction) => {
        return Promise.all([
            Order.destroy({
                where: { seanceId: req.body.seanceId }
            }, { transaction }),
            PlacesInfo.update({ free: req.body.placesInfoFree, busy: req.body.placesInfoBusy }, {
                where: { id: req.body.placesInfoId }
            }, { transaction }),
            Place.update({ status: 'Free' }, {
                where: { status: 'Reserved' }
            }, { transaction })
        ]);
    })
        .then(() => {
            res.status(200).send({
                message: "Order was canceled successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error canceling order"
            })
        });
};
